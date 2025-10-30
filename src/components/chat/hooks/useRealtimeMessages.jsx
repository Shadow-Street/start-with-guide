import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/api/entities';

export function useRealtimeMessages(roomId, initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);
  const channelRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    // Subscribe to real-time message changes
    channelRef.current = supabase
      .channel(`room-messages-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('New message received:', payload.new);
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some(m => m.id === payload.new.id)) {
              return prev;
            }
            return [...prev, payload.new];
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('Message updated:', payload.new);
          setMessages((prev) =>
            prev.map((msg) => (msg.id === payload.new.id ? payload.new : msg))
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${roomId}`
        },
        (payload) => {
          console.log('Message deleted:', payload.old);
          setMessages((prev) => prev.filter((msg) => msg.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [roomId]);

  return { messages, setMessages };
}
