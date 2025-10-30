import React from 'react';
import { motion } from 'framer-motion';

export default function UserOnlineIndicator({ isOnline, size = 'sm' }) {
  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  if (!isOnline) return null;

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-green-500 border-2 border-white shadow-sm`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <motion.div
        className="w-full h-full rounded-full bg-green-400"
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
}
