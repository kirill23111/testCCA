import { motion } from "motion/react";
import { Wallet, Apple } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";

export function CampusCard() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const gradientLight = "linear-gradient(135deg, #A8C6A5 0%, #7CA982 50%, #7A9E9F 100%)";
  const gradientDark = "linear-gradient(135deg, #6B9B76 0%, #5A8567 50%, #6B8B8F 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{
        background: theme === "dark" ? gradientDark : gradientLight,
        borderRadius: "24px",
        padding: "32px",
        boxShadow: theme === "dark"
          ? "0 2px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.2)"
          : "0 2px 24px rgba(124, 169, 130, 0.12), 0 1px 4px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Matte texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: theme === "dark" ? 0.15 : 0.3,
        }}
      />

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/90 tracking-wide" style={{ fontSize: "13px", fontWeight: 500 }}>
              {t("campusCard")}
            </span>
          </div>
          <div className="text-white/70" style={{ fontSize: "12px", fontWeight: 400 }}>
            UniCard · 4891
          </div>
        </div>

        <div className="mb-8">
          <div className="text-white/80 mb-1" style={{ fontSize: "13px", fontWeight: 400 }}>
            {t("currentBalance")}
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white"
            style={{ fontSize: "48px", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            €127.50
          </motion.div>
        </div>

        <div className="flex items-center gap-6">
          <div>
            <div className="text-white/70 mb-1" style={{ fontSize: "11px", fontWeight: 400 }}>
              {t("thisWeek")}
            </div>
            <div className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              €42.30
            </div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <div className="text-white/70 mb-1" style={{ fontSize: "11px", fontWeight: 400 }}>
              {t("lastTopUp")}
            </div>
            <div className="text-white" style={{ fontSize: "16px", fontWeight: 500 }}>
              Apr 8
            </div>
          </div>
        </div>
      </div>

      {/* Add to Apple Wallet Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full backdrop-blur-sm flex items-center justify-center gap-2 py-3.5 px-6 transition-all duration-300"
        style={{
          background: theme === "dark" ? "rgba(42, 44, 53, 0.95)" : "rgba(255, 255, 255, 0.95)",
          color: theme === "dark" ? "#EAEAEA" : "#2D3142",
          borderRadius: "100px",
          fontSize: "15px",
          fontWeight: 500,
          boxShadow: theme === "dark" ? "0 2px 12px rgba(0, 0, 0, 0.3)" : "0 2px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Apple className="w-5 h-5" />
        {t("addToAppleWallet")}
      </motion.button>
    </motion.div>
  );
}
