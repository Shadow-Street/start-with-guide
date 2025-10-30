import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useUserPresence(roomId, userId) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const channelRef = useRef(null);
  const presenceUpdateIntervalRef = useRef(null);

  // Update user's presence status
  const updatePresence = useCallback(async (status = 'online') => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_presence')
        .upsert({
          user_id: userId,
          chat_room_id: roomId,
          status,
          last_seen: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) console.error('Error updating presence:', error);
    } catch (error) {
      console.error('Error in updatePresence:', error);
    }
  }, [userId, roomId]);

  // Fetch online users
  const fetchOnlineUsers = useCallback(async () => {
    if (!roomId) return;

    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from('user_presence')
        .select('user_id, status, last_seen')
        .eq('chat_room_id', roomId)
        .or(`status.eq.online,and(status.eq.away,last_seen.gte.${fiveMinutesAgo})`);

      if (error) {
        console.error('Error fetching online users:', error);
        return;
      }

      setOnlineUsers(data || []);
    } catch (error) {
      console.error('Error in fetchOnlineUsers:', error);
    }
  }, [roomId]);

  useEffect(() => {
    if (!userId || !roomId) return;

    // Initial presence update
    updatePresence('online');
    fetchOnlineUsers();

    // Update presence every 30 seconds
    presenceUpdateIntervalRef.current = setInterval(() => {
      updatePresence('online');
    }, 30000);

    // Subscribe to presence changes
    channelRef.current = supabase
      .channel(`room-presence-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_presence',
          filter: `chat_room_id=eq.${roomId}`
        },
        () => {
          fetchOnlineUsers();
        }
      )
      .subscribe();

    // Handle page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updatePresence('away');
      } else {
        updatePresence('online');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      updatePresence('offline');
      
      if (presenceUpdateIntervalRef.current) {
        clearInterval(presenceUpdateIntervalRef.current);
      }
      
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }

      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userId, roomId, updatePresence, fetchOnlineUsers]);

  const isUserOnline = useCallback((checkUserId) => {
    return onlineUsers.some(u => u.user_id === checkUserId && u.status === 'online');
  }, [onlineUsers]);

  return { onlineUsers, isUserOnline, updatePresence };
}
