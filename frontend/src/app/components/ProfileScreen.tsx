import { motion } from "motion/react";
import { Shield, Bell, Moon, CreditCard, Lock, Eye, CheckCircle, ChevronRight, Languages } from "lucide-react";
import * as Switch from "@radix-ui/react-switch";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
import { Language } from "../translations";
import { CardLimitsModal } from "./CardLimitsModal";
import { NotificationsModal } from "./NotificationsModal";

export function ProfileScreen() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [bankConnected, setBankConnected] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [weeklyLimit, setWeeklyLimit] = useState(200);
  const [limitsModalOpen, setLimitsModalOpen] = useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);

  // Notification settings
  const [lowBalanceEnabled, setLowBalanceEnabled] = useState(true);
  const [lowBalanceThreshold, setLowBalanceThreshold] = useState(20);
  const [limitWarningEnabled, setLimitWarningEnabled] = useState(true);
  const [limitWarningThreshold, setLimitWarningThreshold] = useState(80);

  const isDarkMode = theme === "dark";
  const anyNotificationEnabled = lowBalanceEnabled || limitWarningEnabled;

  const handleSaveLimits = (daily: number, weekly: number) => {
    setDailyLimit(daily);
    setWeeklyLimit(weekly);
  };

  const handleSaveNotifications = (
    lowBalance: boolean,
    lowBalanceThresh: number,
    limitWarning: boolean,
    limitWarningThresh: number
  ) => {
    setLowBalanceEnabled(lowBalance);
    setLowBalanceThreshold(lowBalanceThresh);
    setLimitWarningEnabled(limitWarning);
    setLimitWarningThreshold(limitWarningThresh);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card p-8 text-center"
        style={{
          borderRadius: "24px",
          boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)",
        }}
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-24 h-24 mx-auto mb-6 bg-accent flex items-center justify-center"
          style={{
            borderRadius: "100px",
            background: "linear-gradient(135deg, #A8C6A5 0%, #7CA982 100%)",
          }}
        >
          <span className="text-white" style={{ fontSize: "36px", fontWeight: 600 }}>
            SK
          </span>
        </motion.div>

        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-foreground mb-1" style={{ fontSize: "24px", fontWeight: 600 }}>
            Sarah Klein
          </h2>
          <p className="text-muted-foreground mb-1" style={{ fontSize: "15px", fontWeight: 400 }}>
            {t("universityOfAugsburg")}
          </p>
          <div className="flex items-center justify-center gap-3 text-muted-foreground" style={{ fontSize: "13px" }}>
            <span>{t("studentId")}: 03756821</span>
            <span>·</span>
            <span>4{language === "de" ? ". " : "th "}{t("semester")}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Official Verification Widget */}
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
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #7CA982 0%, #7A9E9F 100%)",
              borderRadius: "14px",
            }}
          >
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
              {t("verifiedStudentStatus")}
            </h3>
            <p className="text-muted-foreground mb-4" style={{ fontSize: "13px", fontWeight: 400 }}>
              {t("accountVerified")}
            </p>

            {/* Studierendenwerk Logo */}
            <div className="flex items-center gap-2 p-3 bg-accent/50" style={{ borderRadius: "12px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
                  stroke="#7CA982"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path d="M9 12L11 14L15 10" stroke="#7CA982" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-foreground" style={{ fontSize: "14px", fontWeight: 600 }}>
                {t("studierendenwerkAugsburg")}
              </span>
              <div className="ml-auto">
                <div className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 8px rgba(124, 169, 130, 0.6)" }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Privacy & Security */}
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
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{
              backgroundColor: "#7CA98230",
              borderRadius: "12px",
            }}
          >
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-foreground mb-0.5" style={{ fontSize: "17px", fontWeight: 600 }}>
              {t("privacySecurity")}
            </h3>
            <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
              {t("bankLevelEncryption")}
            </p>
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="space-y-4">
          {/* Bank Connection Toggle */}
          <div className="flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200" style={{ borderRadius: "16px" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7CA98230",
                  borderRadius: "10px",
                }}
              >
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("bankAccountConnected")}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                  {t("securePayment")}
                </div>
              </div>
            </div>
            <Switch.Root
              checked={bankConnected}
              onCheckedChange={setBankConnected}
              className="w-11 h-6 rounded-full transition-colors duration-200 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-5" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />
            </Switch.Root>
          </div>

          {/* Data Sharing Toggle */}
          <div className="flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200" style={{ borderRadius: "16px" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7A9E9F30",
                  borderRadius: "10px",
                }}
              >
                <Eye className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("analyticsDataSharing")}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                  {t("helpImprove")}
                </div>
              </div>
            </div>
            <Switch.Root
              checked={dataSharing}
              onCheckedChange={setDataSharing}
              className="w-11 h-6 rounded-full transition-colors duration-200 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-5" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />
            </Switch.Root>
          </div>

          {/* Privacy Policy Link */}
          <button className="w-full flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200" style={{ borderRadius: "16px" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7CA98230",
                  borderRadius: "10px",
                }}
              >
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-foreground" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("privacyPolicy")}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* General Preferences */}
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
        <h3 className="text-foreground mb-6" style={{ fontSize: "17px", fontWeight: 600 }}>
          {t("generalPreferences")}
        </h3>

        <div className="space-y-4">
          {/* Language Selector */}
          <div className="flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200" style={{ borderRadius: "16px" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7CA98230",
                  borderRadius: "10px",
                }}
              >
                <Languages className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("language")}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                  {language === "en" ? t("english") : t("german")}
                </div>
              </div>
            </div>
            <Select.Root value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <Select.Trigger
                className="flex items-center gap-2 bg-white px-4 py-2 transition-all duration-200 outline-none"
                style={{
                  borderRadius: "100px",
                  fontSize: "13px",
                  fontWeight: 500,
                  border: "2px solid rgba(124, 169, 130, 0.2)",
                }}
              >
                <Select.Value />
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
                    <Select.Item
                      value="en"
                      className="px-4 py-3 cursor-pointer hover:bg-accent transition-colors duration-200 outline-none"
                      style={{
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      <Select.ItemText>{t("english")}</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="de"
                      className="px-4 py-3 cursor-pointer hover:bg-accent transition-colors duration-200 outline-none"
                      style={{
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      <Select.ItemText>{t("german")}</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Notifications Settings */}
          <button
            onClick={() => setNotificationsModalOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7CA98230",
                  borderRadius: "10px",
                }}
              >
                <Bell className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("notifications")}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                  {anyNotificationEnabled
                    ? language === "en"
                      ? "Alerts enabled"
                      : "Benachrichtigungen aktiv"
                    : language === "en"
                    ? "No alerts"
                    : "Keine Benachrichtigungen"}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200" style={{ borderRadius: "16px" }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7A9E9F30",
                  borderRadius: "10px",
                }}
              >
                <Moon className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("appearance")}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                  {isDarkMode ? (language === "en" ? "Dark mode" : "Dunkler Modus") : (language === "en" ? "Light mode" : "Heller Modus")}
                </div>
              </div>
            </div>
            <Switch.Root
              checked={isDarkMode}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="w-11 h-6 rounded-full transition-colors duration-200 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-5" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />
            </Switch.Root>
          </div>

          {/* Spending Limits */}
          <button
            onClick={() => setLimitsModalOpen(true)}
            className="w-full flex items-center justify-between p-4 bg-accent/50 hover:bg-accent transition-all duration-200"
            style={{ borderRadius: "16px" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "#7CA98230",
                  borderRadius: "10px",
                }}
              >
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-foreground mb-0.5" style={{ fontSize: "15px", fontWeight: 500 }}>
                  {t("campusCardLimits")}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                  {t("daily")}: €{dailyLimit} · {language === "en" ? "Weekly" : "Wöchentlich"}: €{weeklyLimit}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Sign Out Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white text-destructive py-4 px-6 transition-all duration-200 hover:bg-accent"
        style={{
          borderRadius: "100px",
          fontSize: "15px",
          fontWeight: 600,
          border: "2px solid rgba(217, 121, 121, 0.2)",
        }}
      >
        {t("signOut")}
      </motion.button>

      {/* Card Limits Modal */}
      <CardLimitsModal
        open={limitsModalOpen}
        onOpenChange={setLimitsModalOpen}
        dailyLimit={dailyLimit}
        weeklyLimit={weeklyLimit}
        onSave={handleSaveLimits}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        open={notificationsModalOpen}
        onOpenChange={setNotificationsModalOpen}
        lowBalanceEnabled={lowBalanceEnabled}
        lowBalanceThreshold={lowBalanceThreshold}
        limitWarningEnabled={limitWarningEnabled}
        limitWarningThreshold={limitWarningThreshold}
        onSave={handleSaveNotifications}
      />
    </div>
  );
}
