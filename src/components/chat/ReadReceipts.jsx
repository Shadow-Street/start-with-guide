import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Eye } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ReadReceipts({ messageId, users = {} }) {
  const [readBy, setReadBy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!messageId) return;

    const fetchReadReceipts = async () => {
      try {
        const { data, error } = await supabase
          .from('message_read_receipts')
          .select('user_id, read_at')
          .eq('message_id', messageId)
          .order('read_at', { ascending: false });

        if (error) throw error;

        setReadBy(data || []);
      } catch (error) {
        console.error('Error fetching read receipts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadReceipts();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`read-receipts-${messageId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message_read_receipts',
          filter: `message_id=eq.${messageId}`
        },
        (payload) => {
          setReadBy((prev) => {
            if (prev.some(r => r.user_id === payload.new.user_id)) {
              return prev;
            }
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [messageId]);

  if (loading || readBy.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors">
          <Eye className="w-3 h-3" />
          <span>{readBy.length}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-slate-900">Read by {readBy.length} {readBy.length === 1 ? 'person' : 'people'}</h4>
          <ScrollArea className="max-h-48">
            <div className="space-y-2">
              {readBy.map((receipt) => {
                const user = users[receipt.user_id] || { display_name: 'Unknown User', profile_color: '#64748B' };
                return (
                  <div key={receipt.user_id} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback 
                        style={{ backgroundColor: user.profile_color, color: 'white', fontSize: '0.65rem' }}
                      >
                        {user.display_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{user.display_name}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(receipt.read_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
