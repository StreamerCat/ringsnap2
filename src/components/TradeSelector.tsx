import { motion } from 'framer-motion';

interface TradeConfig {
  value: number;
  calls: number;
  missedRate: number;
  label: string;
  icon: any;
  color: string;
  gradient: string;
}

interface TradeSelectorProps {
  trades: Record<string, TradeConfig>;
  selectedTrade: string;
  onSelect: (trade: string) => void;
}

export const TradeSelector = ({ trades, selectedTrade, onSelect }: TradeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(trades).map(([key, config]) => {
        const Icon = config.icon;
        const isSelected = selectedTrade === key;

        return (
          <motion.button
            key={key}
            onClick={() => onSelect(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative p-4 rounded-xl transition-all duration-200
              ${isSelected ? 'shadow-lg' : 'shadow-md hover:shadow-lg'}
              ${config.gradient}
              ${
                isSelected
                  ? 'ring-2 ring-emerald-500 ring-offset-2'
                  : 'ring-1 ring-gray-200 dark:ring-gray-700'
              }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  rotate: isSelected ? [0, -10, 10, -10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <Icon
                  className={`w-8 h-8 ${
                    isSelected
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
              </motion.div>
              <span
                className={`text-sm font-semibold ${
                  isSelected
                    ? 'text-emerald-900 dark:text-emerald-100'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {config.label}
              </span>
            </div>

            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
