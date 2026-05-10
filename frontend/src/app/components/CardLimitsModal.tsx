import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import { X, CreditCard } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface CardLimitsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dailyLimit: number;
  weeklyLimit: number;
  onSave: (daily: number, weekly: number) => void;
}

export function CardLimitsModal({
  open,
  onOpenChange,
  dailyLimit,
  weeklyLimit,
  onSave,
}: CardLimitsModalProps) {
  const { t, language } = useLanguage();
  const [daily, setDaily] = useState(dailyLimit);
  const [weekly, setWeekly] = useState(weeklyLimit);

  const handleSave = () => {
    onSave(daily, weekly);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setDaily(dailyLimit);
    setWeekly(weeklyLimit);
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
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <Dialog.Title asChild>
                          <h2 className="text-foreground" style={{ fontSize: "20px", fontWeight: 600 }}>
                            {t("campusCardLimits")}
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

                    {/* Daily Limit */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-foreground mb-1" style={{ fontSize: "15px", fontWeight: 600 }}>
                            {language === "en" ? "Daily Limit" : "Tageslimit"}
                          </div>
                          <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                            {language === "en" ? "Maximum spending per day" : "Maximale Ausgaben pro Tag"}
                          </div>
                        </div>
                        <div className="text-primary" style={{ fontSize: "24px", fontWeight: 700 }}>
                          €{daily}
                        </div>
                      </div>

                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-8"
                        value={[daily]}
                        onValueChange={(value) => setDaily(value[0])}
                        min={10}
                        max={200}
                        step={5}
                      >
                        <Slider.Track
                          className="relative grow h-2"
                          style={{
                            backgroundColor: "var(--accent)",
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
                          className="block w-7 h-7 bg-white shadow-lg outline-none cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                          style={{
                            borderRadius: "100px",
                            border: "3px solid var(--primary)",
                            boxShadow: "0 2px 12px rgba(124, 169, 130, 0.3)",
                          }}
                          aria-label="Daily Limit"
                        />
                      </Slider.Root>

                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                          €10
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                          €200
                        </span>
                      </div>
                    </div>

                    {/* Weekly Limit */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-foreground mb-1" style={{ fontSize: "15px", fontWeight: 600 }}>
                            {language === "en" ? "Weekly Limit" : "Wochenlimit"}
                          </div>
                          <div className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400 }}>
                            {language === "en" ? "Maximum spending per week" : "Maximale Ausgaben pro Woche"}
                          </div>
                        </div>
                        <div className="text-primary" style={{ fontSize: "24px", fontWeight: 700 }}>
                          €{weekly}
                        </div>
                      </div>

                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-8"
                        value={[weekly]}
                        onValueChange={(value) => setWeekly(value[0])}
                        min={20}
                        max={500}
                        step={10}
                      >
                        <Slider.Track
                          className="relative grow h-2"
                          style={{
                            backgroundColor: "var(--accent)",
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
                          className="block w-7 h-7 bg-white shadow-lg outline-none cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                          style={{
                            borderRadius: "100px",
                            border: "3px solid var(--primary)",
                            boxShadow: "0 2px 12px rgba(124, 169, 130, 0.3)",
                          }}
                          aria-label="Weekly Limit"
                        />
                      </Slider.Root>

                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                          €20
                        </span>
                        <span className="text-muted-foreground" style={{ fontSize: "11px" }}>
                          €500
                        </span>
                      </div>
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
