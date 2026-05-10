import { motion } from "motion/react";
import { Coffee, Utensils, WashingMachine, Book, TrendingUp } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const transactions = [
  { id: 1, name: "Campus Mensa", category: "Mensa", amount: -8.5, date: "Apr 13, 12:30 PM", icon: Utensils, color: "#A8C6A5" },
  { id: 2, name: "Library Print", category: "Library", amount: -3.2, date: "Apr 13, 10:15 AM", icon: Book, color: "#7A9E9F" },
  { id: 3, name: "Coffee Lab", category: "Cafeteria", amount: -4.8, date: "Apr 13, 9:00 AM", icon: Coffee, color: "#D9C5B2" },
  { id: 4, name: "Top-up", category: "Income", amount: 50.0, date: "Apr 12", icon: TrendingUp, color: "#7CA982" },
  { id: 5, name: "Laundry Room", category: "Laundry", amount: -5.5, date: "Apr 12", icon: WashingMachine, color: "#B4C7C8" },
  { id: 6, name: "Campus Mensa", category: "Mensa", amount: -12.3, date: "Apr 11", icon: Utensils, color: "#A8C6A5" },
  { id: 7, name: "Cafeteria", category: "Cafeteria", amount: -6.8, date: "Apr 10", icon: Coffee, color: "#D9C5B2" },
  { id: 8, name: "Library Copy", category: "Library", amount: -4.5, date: "Apr 10", icon: Book, color: "#7A9E9F" },
];

interface RecentActivitiesProps {
  onViewAll: () => void;
}

export function RecentActivities({ onViewAll }: RecentActivitiesProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card p-6"
      style={{
        borderRadius: "24px",
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="mb-6">
        <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
          {t("recentActivity")}
        </h3>
        <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
          {t("automaticallyTracked")}
        </p>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
            className="flex items-center gap-4 p-4 bg-accent/50 hover:bg-accent transition-all duration-200 cursor-pointer group"
            style={{
              borderRadius: "16px",
            }}
          >
            {/* Icon */}
            <div
              className="w-11 h-11 flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: transaction.color + "30",
                borderRadius: "12px",
              }}
            >
              <transaction.icon className="w-5 h-5" style={{ color: transaction.color }} />
            </div>

            {/* Transaction Details */}
            <div className="flex-1 min-w-0">
              <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                {transaction.name}
              </div>
              <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                {transaction.category} · {transaction.date}
              </div>
            </div>

            {/* Amount */}
            <div
              className={transaction.amount > 0 ? "text-primary" : "text-foreground"}
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              {transaction.amount > 0 ? "+" : ""}€{Math.abs(transaction.amount).toFixed(2)}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onViewAll}
        className="w-full mt-6 bg-accent hover:bg-muted text-foreground py-3 transition-all duration-200"
        style={{
          borderRadius: "100px",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {t("seeAllTransactions")}
      </motion.button>
    </motion.div>
  );
}
