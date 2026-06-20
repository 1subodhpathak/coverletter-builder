import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-12 w-12 rounded-full bg-slate-200"
        />
        <div className="space-y-2 flex-1">
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="h-4 w-1/3 rounded bg-slate-200"
          />
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="h-3 w-1/2 rounded bg-slate-200"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className={`h-4 rounded bg-slate-200 ${i === 4 ? 'w-2/3' : 'w-full'}`}
          />
        ))}
      </div>

      <div className="pt-6 space-y-4">
        <div className="h-px bg-slate-100" />
        <div className="flex justify-between items-center">
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-24 rounded bg-slate-200"
          />
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="h-8 w-32 rounded bg-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
