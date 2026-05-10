import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, BarChart3, Plus, User } from "lucide-react";
import { CampusCard } from "./components/CampusCard";
import { WeeklyCampusSpend } from "./components/WeeklyCampusSpend";
import { Analytics } from "./components/Analytics";
import { RecentActivities } from "./components/RecentActivities";
import { TopUpScreen } from "./components/TopUpScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import { ThemeProvider, useTheme } from "./ThemeContext";

type View = "home" | "analytics" | "topup" | "profile";

function AppContent() {
  const [currentView, setCurrentView] = useState<View>("home");
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navItems = [
    { key: "home" as const, icon: Home, label: t("home") },
    { key: "analytics" as const, icon: BarChart3, label: t("analytics") },
    { key: "topup" as const, icon: Plus, label: t("topup") },
    { key: "profile" as const, icon: User, label: t("profile") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="h-8" />

      <div className="px-5 pb-32 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div
              className="inline-flex items-center gap-3 px-4 py-3 bg-card border border-border"
              style={{
                borderRadius: "20px",
                boxShadow: theme === "dark" ? "0 10px 30px rgba(0, 0, 0, 0.24)" : "0 12px 36px rgba(16, 16, 16, 0.06)",
              }}
            >
              <div className="text-primary" style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.08em" }}>
                THA
              </div>
              <div className="text-foreground" style={{ fontSize: "11px", fontWeight: 700, lineHeight: 1.15 }}>
                <div>Technische</div>
                <div>Hochschule</div>
                <div>Augsburg</div>
              </div>
            </div>

            <div
              className="px-4 py-2.5 bg-card border border-border text-muted-foreground"
              style={{
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              2026
            </div>
          </div>

          <div>
            <h1 className="text-foreground mb-2" style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.04em" }}>
              {currentView === "home" && t("yourWallet")}
              {currentView === "analytics" && t("analytics")}
              {currentView === "topup" && t("topup")}
              {currentView === "profile" && t("profile")}
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: "15px", fontWeight: 500 }}>
              {currentView === "home" && t("manageFinances")}
              {currentView === "analytics" && t("trackSpending")}
              {currentView === "topup" && t("addFundsToCampusCard")}
              {currentView === "profile" && t("manageAccount")}
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <CampusCard />
              <WeeklyCampusSpend />
              <RecentActivities onViewAll={() => setCurrentView("analytics")} />
            </motion.div>
          )}

          {currentView === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Analytics />
            </motion.div>
          )}

          {currentView === "topup" && (
            <motion.div
              key="topup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TopUpScreen />
            </motion.div>
          )}

          {currentView === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring", damping: 25 }}
        className="fixed bottom-4 left-4 right-4 bg-card border border-border mx-auto max-w-2xl backdrop-blur-xl"
        style={{
          borderRadius: "28px",
          boxShadow: theme === "dark" ? "0 22px 50px rgba(0, 0, 0, 0.4)" : "0 22px 50px rgba(16, 16, 16, 0.1)",
        }}
      >
        <div className="px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => {
              const isActive = currentView === item.key;
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 transition-all duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  style={{
                    borderRadius: "18px",
                    backgroundColor: isActive ? (theme === "dark" ? "rgba(255, 41, 95, 0.14)" : "rgba(227, 0, 69, 0.08)") : "transparent",
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.7 : 2.2} />
                  <span style={{ fontSize: "11px", fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
