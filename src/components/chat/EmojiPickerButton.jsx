import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function EmojiPickerButton({ onEmojiSelect, disabled = false }) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onEmojiSelect(emojiData.emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={disabled}
          className="flex-shrink-0 hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          <Smile className="h-4 w-4 text-slate-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 border-0 shadow-2xl" 
        align="start"
        sideOffset={5}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          width={350}
          height={400}
          previewConfig={{ showPreview: false }}
          searchPlaceHolder="Search emoji..."
          skinTonesDisabled
          theme="light"
        />
      </PopoverContent>
    </Popover>
  );
}
