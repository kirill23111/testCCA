import { useState } from "react";
import { motion } from "motion/react";
import { Coffee, Utensils, WashingMachine, Book, ShoppingBag, TrendingDown, TrendingUp, Calendar, ChevronDown } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import * as Select from "@radix-ui/react-select";

const transactions = [
  { id: 1, name: "Campus Mensa", category: "Mensa", amount: -8.5, date: "Apr 13, 12:30 PM", month: "April 2026", icon: Utensils, color: "#A8C6A5" },
  { id: 2, name: "Library Print", category: "Library", amount: -3.2, date: "Apr 13, 10:15 AM", month: "April 2026", icon: Book, color: "#7A9E9F" },
  { id: 3, name: "Coffee Lab", category: "Cafeteria", amount: -4.8, date: "Apr 13, 9:00 AM", month: "April 2026", icon: Coffee, color: "#D9C5B2" },
  { id: 4, name: "Top-up", category: "Income", amount: 50.0, date: "Apr 12", month: "April 2026", icon: TrendingUp, color: "#7CA982" },
  { id: 5, name: "Laundry Room", category: "Laundry", amount: -5.5, date: "Apr 12", month: "April 2026", icon: WashingMachine, color: "#B4C7C8" },
  { id: 6, name: "Campus Mensa", category: "Mensa", amount: -12.3, date: "Apr 11", month: "April 2026", icon: Utensils, color: "#A8C6A5" },
  { id: 7, name: "Cafeteria", category: "Cafeteria", amount: -6.8, date: "Mar 28", month: "March 2026", icon: Coffee, color: "#D9C5B2" },
  { id: 8, name: "Library Copy", category: "Library", amount: -4.5, date: "Mar 25", month: "March 2026", icon: Book, color: "#7A9E9F" },
];

const weeklyData = [
  { day: "Mon", amount: 12.5 },
  { day: "Tue", amount: 8.3 },
  { day: "Wed", amount: 15.2 },
  { day: "Thu", amount: 6.8 },
  { day: "Fri", amount: 18.4 },
  { day: "Sat", amount: 4.5 },
  { day: "Sun", amount: 2.1 },
];

const monthlyData = [
  { month: "Jan", amount: 189.50 },
  { month: "Feb", amount: 195.80 },
  { month: "Mar", amount: 238.20 },
  { month: "Apr", amount: 142.50 },
];

const categoryDataByMonth: Record<string, any[]> = {
  "April 2026": [
    { name: "Mensa", amount: 52.30, icon: Utensils, color: "#A8C6A5", percentage: 37 },
    { name: "Cafeteria", amount: 34.80, icon: Coffee, color: "#D9C5B2", percentage: 24 },
    { name: "Library", amount: 16.20, icon: Book, color: "#7A9E9F", percentage: 11 },
    { name: "Laundry", amount: 12.50, icon: WashingMachine, color: "#B4C7C8", percentage: 9 },
    { name: "Other", amount: 26.70, icon: ShoppingBag, color: "#C8D4B8", percentage: 19 },
  ],
  "March 2026": [
    { name: "Mensa", amount: 89.20, icon: Utensils, color: "#A8C6A5", percentage: 37 },
    { name: "Cafeteria", amount: 58.40, icon: Coffee, color: "#D9C5B2", percentage: 25 },
    { name: "Library", amount: 28.60, icon: Book, color: "#7A9E9F", percentage: 12 },
    { name: "Laundry", amount: 19.50, icon: WashingMachine, color: "#B4C7C8", percentage: 8 },
    { name: "Other", amount: 42.50, icon: ShoppingBag, color: "#C8D4B8", percentage: 18 },
  ],
  "February 2026": [
    { name: "Mensa", amount: 74.50, icon: Utensils, color: "#A8C6A5", percentage: 38 },
    { name: "Cafeteria", amount: 45.90, icon: Coffee, color: "#D9C5B2", percentage: 23 },
    { name: "Library", amount: 23.40, icon: Book, color: "#7A9E9F", percentage: 12 },
    { name: "Laundry", amount: 17.80, icon: WashingMachine, color: "#B4C7C8", percentage: 9 },
    { name: "Other", amount: 34.20, icon: ShoppingBag, color: "#C8D4B8", percentage: 18 },
  ],
  "January 2026": [
    { name: "Mensa", amount: 71.80, icon: Utensils, color: "#A8C6A5", percentage: 38 },
    { name: "Cafeteria", amount: 43.20, icon: Coffee, color: "#D9C5B2", percentage: 23 },
    { name: "Library", amount: 21.50, icon: Book, color: "#7A9E9F", percentage: 11 },
    { name: "Laundry", amount: 16.40, icon: WashingMachine, color: "#B4C7C8", percentage: 9 },
    { name: "Other", amount: 36.60, icon: ShoppingBag, color: "#C8D4B8", percentage: 19 },
  ],
};

const availableMonths = ["April 2026", "March 2026", "February 2026", "January 2026"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white px-4 py-2"
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(124, 169, 130, 0.15)",
          border: "1px solid rgba(124, 169, 130, 0.1)",
        }}
      >
        <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>
          €{payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export function Analytics() {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const [selectedMonth, setSelectedMonth] = useState("April 2026");
  const [chartView, setChartView] = useState<"bars" | "pie">("bars");

  const categoryData = categoryDataByMonth[selectedMonth];

  return (
    <>
      {/* Spending Chart with Toggle */}
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
              Spending Overview
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
              {viewMode === "weekly" ? "Last 7 days" : "Last 4 months"}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-1 bg-accent p-1" style={{ borderRadius: "100px" }}>
            <button
              onClick={() => setViewMode("weekly")}
              className={`px-4 py-2 transition-all duration-300 ${
                viewMode === "weekly" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode("monthly")}
              className={`px-4 py-2 transition-all duration-300 ${
                viewMode === "monthly" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={viewMode === "weekly" ? weeklyData : monthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey={viewMode === "weekly" ? "day" : "month"}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B6E7C", fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B6E7C", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(124, 169, 130, 0.05)" }} />
              <Bar dataKey="amount" radius={[12, 12, 0, 0]} animationDuration={800}>
                {(viewMode === "weekly" ? weeklyData : monthlyData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#7CA982" opacity={0.8 + index * 0.05} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Breakdown */}
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-foreground mb-2" style={{ fontSize: "17px", fontWeight: 600 }}>
              Spending by Category
            </h3>

            {/* Month Selector */}
            <Select.Root value={selectedMonth} onValueChange={setSelectedMonth}>
              <Select.Trigger
                className="flex items-center gap-2 bg-accent hover:bg-muted px-4 py-2 transition-all duration-200 outline-none"
                style={{
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                <Calendar className="w-4 h-4 text-primary" />
                <Select.Value />
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="bg-white overflow-hidden"
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                    border: "1px solid rgba(45, 49, 66, 0.08)",
                  }}
                >
                  <Select.Viewport className="p-2">
                    {availableMonths.map((month) => (
                      <Select.Item
                        key={month}
                        value={month}
                        className="px-4 py-3 cursor-pointer hover:bg-accent transition-colors duration-200 outline-none"
                        style={{
                          borderRadius: "12px",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        <Select.ItemText>{month}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex items-center gap-1 bg-accent p-1" style={{ borderRadius: "100px" }}>
            <button
              onClick={() => setChartView("bars")}
              className={`px-3 py-1.5 transition-all duration-300 ${
                chartView === "bars" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Bars
            </button>
            <button
              onClick={() => setChartView("pie")}
              className={`px-3 py-1.5 transition-all duration-300 ${
                chartView === "pie" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "100px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Pie
            </button>
          </div>
        </div>

        {chartView === "pie" ? (
          /* Pie Chart View */
          <div className="mb-6">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    animationDuration={800}
                    animationBegin={0}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div
                            className="bg-white px-4 py-2"
                            style={{
                              borderRadius: "12px",
                              boxShadow: "0 4px 24px rgba(124, 169, 130, 0.15)",
                              border: "1px solid rgba(124, 169, 130, 0.1)",
                            }}
                          >
                            <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>
                              {payload[0].name}
                            </p>
                            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
                              €{payload[0].value.toFixed(2)} ({payload[0].payload.percentage}%)
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : null}

        {/* Category List */}
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: category.color + "30",
                      borderRadius: "10px",
                    }}
                  >
                    <category.icon className="w-4 h-4" style={{ color: category.color }} />
                  </div>
                  <div className="text-foreground" style={{ fontSize: "15px", fontWeight: 500 }}>
                    {category.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-foreground" style={{ fontSize: "15px", fontWeight: 600 }}>
                    €{category.amount.toFixed(2)}
                  </div>
                  <div className="text-muted-foreground" style={{ fontSize: "11px" }}>
                    {category.percentage}%
                  </div>
                </div>
              </div>
              {chartView === "bars" && (
                <div className="w-full h-2 bg-accent overflow-hidden" style={{ borderRadius: "100px" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                    style={{
                      backgroundColor: category.color,
                      borderRadius: "100px",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card p-6"
        style={{
          borderRadius: "24px",
          boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
              Recent Transactions
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
              Automatically tracked
            </p>
          </div>
          <div className="flex items-center gap-2 bg-accent px-4 py-2" style={{ borderRadius: "100px" }}>
            <TrendingDown className="w-4 h-4 text-primary" />
            <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 500 }}>
              This week
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
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
                  {transaction.month} · {transaction.date}
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
          transition={{ delay: 1.0, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-accent hover:bg-muted text-foreground py-3 transition-all duration-200"
          style={{
            borderRadius: "100px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          View All Transactions
        </motion.button>
      </motion.div>
    </>
  );
}
