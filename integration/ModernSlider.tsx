import { motion } from 'framer-motion';
import { useState } from 'react';

interface ModernSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  color?: 'emerald' | 'red' | 'blue';
}

export const ModernSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  color = 'emerald',
}: ModernSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const colorClasses = {
    emerald: 'from-emerald-500 to-teal-500',
    red: 'from-red-500 to-rose-500',
    blue: 'from-blue-500 to-indigo-500',
  };

  return (
    <div className="relative py-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
        style={{
          background: 'transparent',
        }}
      />
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <motion.div
        className={`absolute top-1/2 w-6 h-6 bg-gradient-to-r ${colorClasses[color]} rounded-full shadow-lg -mt-2 -ml-3 pointer-events-none`}
        style={{ left: `${percentage}%` }}
        animate={{
          scale: isDragging ? 1.3 : 1,
          boxShadow: isDragging
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 scale-50" />
      </motion.div>

      {/* Custom styles for the input */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: transparent;
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
