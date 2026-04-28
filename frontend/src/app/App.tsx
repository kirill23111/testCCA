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

  return (
    <div className="min-h-screen bg-background">
      {/* Safe Area Top */}
      <div className="h-12" />

      {/* Main Content */}
      <div className="px-5 pb-28 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-foreground mb-1" style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {currentView === "home" && t("yourWallet")}
            {currentView === "analytics" && t("analytics")}
            {currentView === "topup" && t("topup")}
            {currentView === "profile" && t("profile")}
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: "15px", fontWeight: 400 }}>
            {currentView === "home" && t("manageFinances")}
            {currentView === "analytics" && t("trackSpending")}
            {currentView === "topup" && t("addFundsToCampusCard")}
            {currentView === "profile" && t("manageAccount")}
          </p>
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
              {/* Campus Card */}
              <CampusCard />

              {/* Weekly Spend Chart */}
              <WeeklyCampusSpend />

              {/* Recent Activities */}
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
              {/* Analytics with Charts, Categories, and Transactions */}
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
              {/* Top-Up Screen */}
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
              {/* Profile Screen */}
              <ProfileScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, type: "spring", damping: 25 }}
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border mx-auto max-w-2xl"
        style={{
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: theme === "dark" ? "0 -4px 24px rgba(0, 0, 0, 0.4)" : "0 -4px 24px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="px-8 py-4">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setCurrentView("home")}
              className={`flex flex-col items-center gap-1 py-2 px-6 transition-all duration-300 ${
                currentView === "home" ? "text-primary" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "16px",
                backgroundColor: currentView === "home" ? (theme === "dark" ? "#6B9B7620" : "#7CA98215") : "transparent",
              }}
            >
              <Home className="w-6 h-6" strokeWidth={currentView === "home" ? 2.5 : 2} />
              <span style={{ fontSize: "11px", fontWeight: currentView === "home" ? 600 : 400 }}>{t("home")}</span>
            </button>

            <button
              onClick={() => setCurrentView("analytics")}
              className={`flex flex-col items-center gap-1 py-2 px-6 transition-all duration-300 ${
                currentView === "analytics" ? "text-primary" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "16px",
                backgroundColor: currentView === "analytics" ? (theme === "dark" ? "#6B9B7620" : "#7CA98215") : "transparent",
              }}
            >
              <BarChart3 className="w-6 h-6" strokeWidth={currentView === "analytics" ? 2.5 : 2} />
              <span style={{ fontSize: "11px", fontWeight: currentView === "analytics" ? 600 : 400 }}>{t("analytics")}</span>
            </button>

            <button
              onClick={() => setCurrentView("topup")}
              className={`flex flex-col items-center gap-1 py-2 px-6 transition-all duration-300 ${
                currentView === "topup" ? "text-primary" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "16px",
                backgroundColor: currentView === "topup" ? (theme === "dark" ? "#6B9B7620" : "#7CA98215") : "transparent",
              }}
            >
              <Plus className="w-6 h-6" strokeWidth={currentView === "topup" ? 2.5 : 2} />
              <span style={{ fontSize: "11px", fontWeight: currentView === "topup" ? 600 : 400 }}>{t("topup")}</span>
            </button>

            <button
              onClick={() => setCurrentView("profile")}
              className={`flex flex-col items-center gap-1 py-2 px-6 transition-all duration-300 ${
                currentView === "profile" ? "text-primary" : "text-muted-foreground"
              }`}
              style={{
                borderRadius: "16px",
                backgroundColor: currentView === "profile" ? (theme === "dark" ? "#6B9B7620" : "#7CA98215") : "transparent",
              }}
            >
              <User className="w-6 h-6" strokeWidth={currentView === "profile" ? 2.5 : 2} />
              <span style={{ fontSize: "11px", fontWeight: currentView === "profile" ? 600 : 400 }}>{t("profile")}</span>
            </button>
          </div>
        </div>

        {/* Safe Area Bottom */}
        <div className="h-8 bg-card" style={{ borderRadius: "0 0 24px 24px" }} />
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
