import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Wrench,
  Snowflake,
  Zap,
  Home,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { EmailCaptureModal } from "./EmailCaptureModal";
import { AnimatedCounter } from "./AnimatedCounter";
import { ROIChart } from "./ROIChart";
import { CircularProgress } from "./CircularProgress";
import { ModernSlider } from "./ModernSlider";
import { TradeSelector } from "./TradeSelector";

type TradeType = "plumbing" | "hvac" | "electrical" | "roofing";

interface TradeConfig {
  value: number;
  calls: number;
  missedRate: number;
  label: string;
  icon: any;
  color: string;
  gradient: string;
}

const tradeDefaults: Record<TradeType, TradeConfig> = {
  plumbing: {
    value: 1200,
    calls: 60,
    missedRate: 38,
    label: "Plumber",
    icon: Wrench,
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
  },
  hvac: {
    value: 1500,
    calls: 55,
    missedRate: 42,
    label: "HVAC",
    icon: Snowflake,
    color: "from-indigo-500 to-blue-500",
    gradient: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
  },
  electrical: {
    value: 1100,
    calls: 50,
    missedRate: 35,
    label: "Electrician",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
  },
  roofing: {
    value: 2000,
    calls: 40,
    missedRate: 45,
    label: "Roofer",
    icon: Home,
    color: "from-red-500 to-rose-500",
    gradient: "bg-gradient-to-br from-red-500/10 to-rose-500/10",
  },
};

export const EmergencyCalculator = () => {
  const [trade, setTrade] = useState<TradeType>("plumbing");
  const [emergencyCalls, setEmergencyCalls] = useState(15);
  const [missedPercent, setMissedPercent] = useState(40);
  const [avgValue, setAvgValue] = useState(1200);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculations
  const monthlyEmergencyCalls = emergencyCalls * 4;
  const missedCalls = Math.round(monthlyEmergencyCalls * (missedPercent / 100));
  const lostRevenue = missedCalls * avgValue;
  const recoveredRevenue = Math.round(lostRevenue * 0.95);
  const aiCost = emergencyCalls <= 20 ? 297 : emergencyCalls <= 40 ? 797 : 1497;
  const netGain = recoveredRevenue - aiCost;
  const roi = Math.round((netGain / aiCost) * 100);
  const paybackDays = Math.round((aiCost / recoveredRevenue) * 30);

  // Show confetti for high ROI
  useEffect(() => {
    if (roi > 500) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [roi]);

  const handleTradeSelect = (selectedTrade: TradeType) => {
    setTrade(selectedTrade);
    const defaults = tradeDefaults[selectedTrade];
    setAvgValue(defaults.value);
    setEmergencyCalls(Math.round(defaults.calls / 4));
    setMissedPercent(defaults.missedRate);
  };

  const chartData = [
    {
      name: "Without AI",
      lost: lostRevenue,
      recovered: 0,
    },
    {
      name: "With AI",
      lost: Math.round(lostRevenue * 0.05),
      recovered: recoveredRevenue,
    },
  ];

  return (
    <>
      <section
        id="calculator"
        className="py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6"
            >
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-sm font-semibold">
                Every Missed Emergency Call = Lost Revenue
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              How Much Are You Losing Right Now?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              30-40% of calls go unanswered when you're under a sink, on a ladder, or your hands
              are dirty. Emergency calls are worth 3-5x more than regular jobs.
            </p>
          </motion.div>

          {/* Main Calculator - Split Screen Layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Panel - Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Trade Selector */}
              <div className="glass rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  Select Your Trade
                </h3>
                <TradeSelector
                  trades={tradeDefaults}
                  selectedTrade={trade}
                  onSelect={handleTradeSelect}
                />
              </div>

              {/* Input Controls */}
              <div className="glass rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-8">
                <h3 className="text-lg font-semibold mb-6">Your Current Metrics</h3>

                {/* Emergency Calls Per Week */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Emergency Calls Per Week
                    </label>
                    <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                        {emergencyCalls}
                      </span>
                    </div>
                  </div>
                  <ModernSlider
                    value={emergencyCalls}
                    onChange={setEmergencyCalls}
                    min={5}
                    max={50}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    ≈ {monthlyEmergencyCalls} emergency calls/month
                  </p>
                </div>

                {/* Missed Percentage */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Currently Missed (%)
                    </label>
                    <div className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
                      <span className="text-lg font-bold text-red-700 dark:text-red-400">
                        {missedPercent}%
                      </span>
                    </div>
                  </div>
                  <ModernSlider
                    value={missedPercent}
                    onChange={setMissedPercent}
                    min={20}
                    max={70}
                    step={5}
                    color="red"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Industry average: 35-40%</p>
                </div>

                {/* Average Job Value */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-muted-foreground">
                      Average Emergency Job Value
                    </label>
                    <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <span className="text-lg font-bold text-blue-700 dark:text-blue-400">
                        ${avgValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <ModernSlider
                    value={avgValue}
                    onChange={setAvgValue}
                    min={400}
                    max={3000}
                    step={100}
                    color="blue"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Emergency jobs typically worth 3-5x more
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Hero Metric */}
              <div className="glass rounded-2xl p-8 shadow-2xl border border-white/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 relative overflow-hidden">
                <AnimatePresence>
                  {showConfetti && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                          }}
                          animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.05,
                          }}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"][
                              i % 4
                            ],
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="text-center relative z-10">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Monthly Recovered Revenue
                  </p>
                  <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    $<AnimatedCounter value={recoveredRevenue} />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-lg font-semibold">
                      <AnimatedCounter value={roi} />% ROI
                    </span>
                  </div>
                </div>
              </div>

              {/* ROI Visual */}
              <div className="glass rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-center">ROI Breakdown</h3>
                <div className="flex justify-center mb-4">
                  <CircularProgress percentage={Math.min(roi / 10, 100)} size={180} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                    <p className="text-xs text-muted-foreground mb-1">Monthly Gain</p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${netGain.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                    <p className="text-xs text-muted-foreground mb-1">Monthly Cost</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${aiCost}</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-5 shadow-lg border border-white/20"
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Break Even</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    <AnimatedCounter value={Math.ceil(aiCost / avgValue)} />
                  </div>
                  <div className="text-xs text-muted-foreground">jobs (~{paybackDays} days)</div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-xl p-5 shadow-lg border border-white/20"
                >
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Captured</span>
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    <AnimatedCounter value={missedCalls} />
                  </div>
                  <div className="text-xs text-muted-foreground">calls per month</div>
                </motion.div>
              </div>

              {/* Comparison Chart */}
              <div className="glass rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-semibold mb-4">Revenue Comparison</h3>
                <ROIChart data={chartData} />
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEmailModal(true)}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-lg shadow-lg hover:shadow-emerald-500/50 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Get Your Personalized Recovery Plan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="glass rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                95%
              </div>
              <p className="text-sm text-muted-foreground">Capture Rate</p>
            </div>
            <div className="glass rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">AI Availability</p>
            </div>
            <div className="glass rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                &lt;30s
              </div>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
          </motion.div>
        </div>
      </section>

      <EmailCaptureModal
        open={showEmailModal}
        onOpenChange={setShowEmailModal}
        calculatorData={{
          trade,
          emergencyCalls,
          lostRevenue,
          recoveredRevenue,
          netGain,
          roi,
          paybackDays,
        }}
      />
    </>
  );
};
