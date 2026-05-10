import { motion } from "motion/react";
import { Plus } from "lucide-react";

const amounts = [10, 20, 50];

interface QuickTopUpProps {
  onTopUp: () => void;
}

export function QuickTopUp({ onTopUp }: QuickTopUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card p-6"
      style={{
        borderRadius: "24px",
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="mb-6">
        <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
          Quick Top-Up
        </h3>
        <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
          Add funds instantly
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {amounts.map((amount, index) => (
          <motion.button
            key={amount}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onTopUp}
            className="bg-accent hover:bg-primary text-foreground hover:text-white transition-all duration-300 py-4 flex flex-col items-center justify-center gap-1"
            style={{
              borderRadius: "20px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            <span>€{amount}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onTopUp}
        className="mt-4 w-full bg-primary text-white flex items-center justify-center gap-2 py-3.5 px-6 transition-all duration-300 hover:bg-opacity-90"
        style={{
          borderRadius: "100px",
          fontSize: "15px",
          fontWeight: 500,
          boxShadow: "0 2px 12px rgba(124, 169, 130, 0.25)",
        }}
      >
        <Plus className="w-5 h-5" />
        Custom Amount
      </motion.button>
    </motion.div>
  );
}
