import { motion } from "motion/react";
import { Wallet, Apple } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";

export function CampusCard() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const gradientLight = "linear-gradient(135deg, #121212 0%, #1d1d1f 48%, #e30045 100%)";
  const gradientDark = "linear-gradient(135deg, #050505 0%, #161616 52%, #ff295f 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{
        background: theme === "dark" ? gradientDark : gradientLight,
        borderRadius: "28px",
        padding: "28px",
        boxShadow: theme === "dark"
          ? "0 24px 48px rgba(0, 0, 0, 0.45), 0 1px 4px rgba(0, 0, 0, 0.2)"
          : "0 24px 48px rgba(16, 16, 16, 0.18), 0 1px 4px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          opacity: theme === "dark" ? 0.15 : 0.24,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/90 tracking-wide" style={{ fontSize: "13px", fontWeight: 600 }}>
                {t("campusCard")}
              </span>
            </div>

            <div className="flex items-end gap-3">
              <div className="text-white" style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.08em" }}>
                THA
              </div>
              <div className="text-white/70" style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.15 }}>
                <div>Technische Hochschule</div>
                <div>Augsburg</div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-white/70" style={{ fontSize: "12px", fontWeight: 500 }}>
              UniCard
            </div>
            <div className="text-white/90" style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.12em" }}>
              4891
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-white/72 mb-1" style={{ fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {t("currentBalance")}
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white"
            style={{ fontSize: "52px", fontWeight: 700, letterSpacing: "-0.04em" }}
          >
            EUR 127.50
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-4" style={{ borderRadius: "18px" }}>
            <div className="text-white/65 mb-1" style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {t("thisWeek")}
            </div>
            <div className="text-white" style={{ fontSize: "18px", fontWeight: 600 }}>
              EUR 42.30
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-4 py-4" style={{ borderRadius: "18px" }}>
            <div className="text-white/65 mb-1" style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {t("lastTopUp")}
            </div>
            <div className="text-white" style={{ fontSize: "18px", fontWeight: 600 }}>
              Apr 8
            </div>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full backdrop-blur-sm flex items-center justify-center gap-2 py-3.5 px-6 transition-all duration-300"
        style={{
          background: theme === "dark" ? "#fafafa" : "#ffffff",
          color: "#111111",
          borderRadius: "18px",
          fontSize: "15px",
          fontWeight: 700,
          boxShadow: theme === "dark" ? "0 10px 24px rgba(0, 0, 0, 0.3)" : "0 10px 24px rgba(0, 0, 0, 0.18)",
        }}
      >
        <Apple className="w-5 h-5" />
        {t("addToAppleWallet")}
      </motion.button>
    </motion.div>
  );
}
