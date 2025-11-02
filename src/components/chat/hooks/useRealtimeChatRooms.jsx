import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatRoom } from '@/api/entities';

export function useRealtimeChatRooms(initialRooms = [], orderBy = '-participant_count') {
  const [chatRooms, setChatRooms] = useState(initialRooms);
  const [isLoading, setIsLoading] = useState(true);
  const channelRef = useRef(null);

  // Fetch chat rooms
  const fetchChatRooms = useCallback(async () => {
    try {
      const rooms = await ChatRoom.list(orderBy);
      setChatRooms(rooms);
      return rooms;
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  // Initial load
  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  // Subscribe to real-time updates
  useEffect(() => {
    // Subscribe to chat_rooms table changes
    channelRef.current = supabase
      .channel('chat-rooms-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_rooms'
        },
        (payload) => {
          console.log('New chat room created:', payload.new);
          setChatRooms((prev) => {
            // Avoid duplicates
            if (prev.some(r => r.id === payload.new.id)) {
              return prev;
            }
            return [payload.new, ...prev];
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_rooms'
        },
        (payload) => {
          console.log('Chat room updated:', payload.new);
          setChatRooms((prev) =>
            prev.map((room) => (room.id === payload.new.id ? payload.new : room))
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'chat_rooms'
        },
        (payload) => {
          console.log('Chat room deleted:', payload.old);
          setChatRooms((prev) => prev.filter((room) => room.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  return { 
    chatRooms, 
    setChatRooms, 
    isLoading, 
    refreshChatRooms: fetchChatRooms 
  };
}
