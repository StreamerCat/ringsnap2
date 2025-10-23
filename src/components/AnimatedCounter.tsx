import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

export const AnimatedCounter = ({ value, duration = 0.5 }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  const spring = useSpring(value, {
    damping: 30,
    stiffness: 200,
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [spring]);

  return <span className="metric-number">{displayValue.toLocaleString()}</span>;
};
