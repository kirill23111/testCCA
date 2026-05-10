import { motion } from "motion/react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useLanguage } from "../LanguageContext";

const data = [
  { day: "Mon", amount: 12.5 },
  { day: "Tue", amount: 8.3 },
  { day: "Wed", amount: 15.2 },
  { day: "Thu", amount: 6.8 },
  { day: "Fri", amount: 18.4 },
  { day: "Sat", amount: 4.5 },
  { day: "Sun", amount: 2.1 },
];

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
        <p className="text-muted-foreground" style={{ fontSize: "12px" }}>
          {payload[0].payload.day}
        </p>
      </div>
    );
  }
  return null;
};

export function WeeklyCampusSpend() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card p-6"
      style={{
        borderRadius: "24px",
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div className="mb-6">
        <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
          {t("weeklyCampusSpend")}
        </h3>
        <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
          {t("total")}: €67.80
        </p>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7CA982" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7CA982" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#7CA982"
              strokeWidth={3}
              fill="url(#spendGradient)"
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-4 px-1">
        {data.map((item, index) => (
          <div key={item.day} className="text-center">
            <div className="text-muted-foreground" style={{ fontSize: "11px", fontWeight: 400 }}>
              {item.day}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
