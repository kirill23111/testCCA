import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import * as Slider from "@radix-ui/react-slider";
import { X, Bell, AlertCircle, TrendingDown } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lowBalanceEnabled: boolean;
  lowBalanceThreshold: number;
  limitWarningEnabled: boolean;
  limitWarningThreshold: number;
  onSave: (lowBalanceEnabled: boolean, lowBalanceThreshold: number, limitWarningEnabled: boolean, limitWarningThreshold: number) => void;
}

export function NotificationsModal({
  open,
  onOpenChange,
  lowBalanceEnabled,
  lowBalanceThreshold,
  limitWarningEnabled,
  limitWarningThreshold,
  onSave,
}: NotificationsModalProps) {
  const { t, language } = useLanguage();
  const [localLowBalanceEnabled, setLocalLowBalanceEnabled] = useState(lowBalanceEnabled);
  const [localLowBalanceThreshold, setLocalLowBalanceThreshold] = useState(lowBalanceThreshold);
  const [localLimitWarningEnabled, setLocalLimitWarningEnabled] = useState(limitWarningEnabled);
  const [localLimitWarningThreshold, setLocalLimitWarningThreshold] = useState(limitWarningThreshold);

  const handleSave = () => {
    onSave(localLowBalanceEnabled, localLowBalanceThreshold, localLimitWarningEnabled, localLimitWarningThreshold);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalLowBalanceEnabled(lowBalanceEnabled);
    setLocalLowBalanceThreshold(lowBalanceThreshold);
    setLocalLimitWarningEnabled(limitWarningEnabled);
    setLocalLimitWarningThreshold(limitWarningThreshold);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop with Flexbox Centering */}
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  style={{
                    background: "rgba(45, 49, 66, 0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Modal Content */}
                  <Dialog.Content asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="bg-card outline-none w-full max-w-md mx-4"
                      style={{
                        borderRadius: "24px",
                        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
                        maxHeight: "85vh",
                        overflowY: "auto",
                      }}
                    >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #7CA982 0%, #7A9E9F 100%)",
                            borderRadius: "14px",
                          }}
                        >
                          <Bell className="w-6 h-6 text-white" />
                        </div>
                        <Dialog.Title asChild>
                          <h2 className="text-foreground" style={{ fontSize: "20px", fontWeight: 600 }}>
                            {language === "en" ? "Notification Settings" : "Benachrichtigungseinstellungen"}
                          </h2>
                        </Dialog.Title>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          onClick={handleCancel}
                          className="w-10 h-10 rounded-full bg-accent hover:bg-muted transition-colors duration-200 flex items-center justify-center"
                          aria-label="Close"
                        >
                          <X className="w-5 h-5 text-foreground" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Low Balance Warning */}
                    <div className="mb-8 p-6 bg-accent/50" style={{ borderRadius: "20px" }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: "#7CA98230",
                              borderRadius: "12px",
                            }}
                          >
                            <AlertCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-foreground mb-1" style={{ fontSize: "16px", fontWeight: 600 }}>
                              {language === "en" ? "Low Balance Alert" : "Niedriger Kontostand"}
                            </div>
                            <div className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
                              {language === "en"
                                ? "Get notified when your balance is low"
                                : "Benachrichtigung bei niedrigem Kontostand"}
                            </div>
                          </div>
                        </div>
                        <Switch.Root
                          checked={localLowBalanceEnabled}
                          onCheckedChange={setLocalLowBalanceEnabled}
                          className="w-11 h-6 rounded-full transition-colors duration-200 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                        >
                          <Switch.Thumb
                            className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-5"
                            style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                          />
                        </Switch.Root>
                      </div>

                      {localLowBalanceEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="pt-4 border-t border-border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
                                {language === "en" ? "Alert when balance below" : "Warnen wenn Kontostand unter"}
                              </div>
                              <div className="text-primary" style={{ fontSize: "20px", fontWeight: 700 }}>
                                €{localLowBalanceThreshold}
                              </div>
                            </div>

                            <Slider.Root
                              className="relative flex items-center select-none touch-none w-full h-8"
                              value={[localLowBalanceThreshold]}
                              onValueChange={(value) => setLocalLowBalanceThreshold(value[0])}
                              min={5}
                              max={50}
                              step={5}
                            >
                              <Slider.Track
                                className="relative grow h-2"
                                style={{
                                  backgroundColor: "var(--muted)",
                                  borderRadius: "100px",
                                }}
                              >
                                <Slider.Range
                                  className="absolute h-full"
                                  style={{
                                    backgroundColor: "var(--primary)",
                                    borderRadius: "100px",
                                  }}
                                />
                              </Slider.Track>
                              <Slider.Thumb
                                className="block w-6 h-6 bg-white shadow-lg outline-none cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                                style={{
                                  borderRadius: "100px",
                                  border: "3px solid var(--primary)",
                                  boxShadow: "0 2px 12px rgba(124, 169, 130, 0.3)",
                                }}
                                aria-label="Low Balance Threshold"
                              />
                            </Slider.Root>

                            <div className="flex justify-between mt-2 px-1">
                              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                                €5
                              </span>
                              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                                €50
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Spending Limit Warning */}
                    <div className="mb-8 p-6 bg-accent/50" style={{ borderRadius: "20px" }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: "#7A9E9F30",
                              borderRadius: "12px",
                            }}
                          >
                            <TrendingDown className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <div className="text-foreground mb-1" style={{ fontSize: "16px", fontWeight: 600 }}>
                              {language === "en" ? "Limit Warning" : "Limit-Warnung"}
                            </div>
                            <div className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
                              {language === "en"
                                ? "Alert when approaching daily/weekly limits"
                                : "Warnen bei Annäherung an Tages-/Wochenlimits"}
                            </div>
                          </div>
                        </div>
                        <Switch.Root
                          checked={localLimitWarningEnabled}
                          onCheckedChange={setLocalLimitWarningEnabled}
                          className="w-11 h-6 rounded-full transition-colors duration-200 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
                        >
                          <Switch.Thumb
                            className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 data-[state=checked]:translate-x-5"
                            style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
                          />
                        </Switch.Root>
                      </div>

                      {localLimitWarningEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="pt-4 border-t border-border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
                                {language === "en" ? "Alert at" : "Warnen bei"}
                              </div>
                              <div className="text-primary" style={{ fontSize: "20px", fontWeight: 700 }}>
                                {localLimitWarningThreshold}%
                              </div>
                            </div>

                            <Slider.Root
                              className="relative flex items-center select-none touch-none w-full h-8"
                              value={[localLimitWarningThreshold]}
                              onValueChange={(value) => setLocalLimitWarningThreshold(value[0])}
                              min={50}
                              max={95}
                              step={5}
                            >
                              <Slider.Track
                                className="relative grow h-2"
                                style={{
                                  backgroundColor: "var(--muted)",
                                  borderRadius: "100px",
                                }}
                              >
                                <Slider.Range
                                  className="absolute h-full"
                                  style={{
                                    backgroundColor: "var(--primary)",
                                    borderRadius: "100px",
                                  }}
                                />
                              </Slider.Track>
                              <Slider.Thumb
                                className="block w-6 h-6 bg-white shadow-lg outline-none cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                                style={{
                                  borderRadius: "100px",
                                  border: "3px solid var(--primary)",
                                  boxShadow: "0 2px 12px rgba(124, 169, 130, 0.3)",
                                }}
                                aria-label="Limit Warning Threshold"
                              />
                            </Slider.Root>

                            <div className="flex justify-between mt-2 px-1">
                              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                                50%
                              </span>
                              <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                                95%
                              </span>
                            </div>

                            <div className="mt-3 p-3 bg-accent" style={{ borderRadius: "12px" }}>
                              <p className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                                {language === "en"
                                  ? `You'll be notified when you've spent ${localLimitWarningThreshold}% of your daily or weekly limit`
                                  : `Sie werden benachrichtigt, wenn Sie ${localLimitWarningThreshold}% Ihres Tages- oder Wochenlimits ausgegeben haben`}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCancel}
                        className="flex-1 bg-accent hover:bg-muted text-foreground py-3 transition-all duration-200"
                        style={{
                          borderRadius: "100px",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        {language === "en" ? "Cancel" : "Abbrechen"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="flex-1 bg-primary text-white py-3 transition-all duration-300 hover:bg-opacity-90"
                        style={{
                          borderRadius: "100px",
                          fontSize: "15px",
                          fontWeight: 600,
                          boxShadow: "0 2px 12px rgba(124, 169, 130, 0.25)",
                        }}
                      >
                        {language === "en" ? "Save Changes" : "Änderungen speichern"}
                      </motion.button>
                    </div>
                  </div>
                    </motion.div>
                  </Dialog.Content>
                </motion.div>
              </Dialog.Overlay>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
