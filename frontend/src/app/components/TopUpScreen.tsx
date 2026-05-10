import { useState } from "react";
import { motion } from "motion/react";
import * as Slider from "@radix-ui/react-slider";
import { Apple, CreditCard } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export function TopUpScreen() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(20);

  const handleConfirm = () => {
    console.log("Top-up confirmed:", amount);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card p-8"
        style={{
          borderRadius: "24px",
          border: "1px solid rgba(16, 16, 16, 0.06)",
          boxShadow: "0 14px 34px rgba(16, 16, 16, 0.05)",
        }}
      >
        <div className="text-center mb-12">
          <div className="text-muted-foreground mb-3" style={{ fontSize: "14px", fontWeight: 500 }}>
            {t("amountToAdd")}
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-primary" style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              EUR
            </span>
            <input
              type="number"
              min="5"
              max="200"
              step="0.01"
              value={amount}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 5 && value <= 200) {
                  setAmount(value);
                } else if (e.target.value === "") {
                  setAmount(5);
                }
              }}
              className="text-primary bg-transparent border-none outline-none text-center w-40"
              style={{
                fontSize: "56px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                appearance: "textfield",
              }}
            />
          </div>
          <style>{`
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          `}</style>
        </div>

        <div className="mb-12 px-4">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-8"
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            min={5}
            max={200}
            step={5}
          >
            <Slider.Track
              className="relative grow h-2"
              style={{
                backgroundColor: "#E5E5E8",
                borderRadius: "100px",
              }}
            >
              <Slider.Range
                className="absolute h-full"
                style={{
                  backgroundColor: "#E30045",
                  borderRadius: "100px",
                }}
              />
            </Slider.Track>
            <Slider.Thumb
              className="block w-7 h-7 bg-white shadow-lg outline-none cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
              style={{
                borderRadius: "100px",
                border: "3px solid #E30045",
                boxShadow: "0 2px 12px rgba(227, 0, 69, 0.24)",
              }}
              aria-label="Amount"
            />
          </Slider.Root>

          <div className="flex justify-between mt-3 px-1">
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
              EUR 5
            </span>
            <span className="text-muted-foreground" style={{ fontSize: "12px" }}>
              EUR 200
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-2 sm:grid-cols-4">
          {[10, 20, 50, 100].map((quickAmount) => (
            <motion.button
              key={quickAmount}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + quickAmount / 200, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAmount(quickAmount)}
              className={`py-3 transition-all duration-200 ${
                amount === quickAmount
                  ? "bg-primary text-white"
                  : "bg-accent text-foreground hover:bg-muted"
              }`}
              style={{
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              EUR {quickAmount}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card p-6"
        style={{
          borderRadius: "24px",
          border: "1px solid rgba(16, 16, 16, 0.06)",
          boxShadow: "0 14px 34px rgba(16, 16, 16, 0.05)",
        }}
      >
        <h3 className="text-foreground mb-4" style={{ fontSize: "17px", fontWeight: 600 }}>
          {t("paymentMethod")}
        </h3>

        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className="w-full bg-foreground text-white py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 hover:bg-opacity-90"
            style={{
              borderRadius: "18px",
              fontSize: "16px",
              fontWeight: 600,
              boxShadow: "0 12px 28px rgba(16, 16, 16, 0.18)",
            }}
          >
            <Apple className="w-5 h-5" />
            {t("payWithApplePay")}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className="w-full bg-white text-foreground py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 hover:bg-accent"
            style={{
              borderRadius: "18px",
              fontSize: "16px",
              fontWeight: 600,
              border: "1px solid rgba(16, 16, 16, 0.12)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0c-6.627 0-12.053 5.373-12.053 12s5.426 12 12.053 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.16-2.053H12.48z"
                fill="#4285F4"
              />
            </svg>
            {t("payWithGooglePay")}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm}
            className="w-full bg-white text-foreground py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 hover:bg-accent"
            style={{
              borderRadius: "18px",
              fontSize: "16px",
              fontWeight: 600,
              border: "1px solid rgba(16, 16, 16, 0.12)",
            }}
          >
            <CreditCard className="w-5 h-5" />
            {t("payWithCard")}
          </motion.button>
        </div>

        <p className="text-center text-muted-foreground mt-4" style={{ fontSize: "12px" }}>
          {t("paymentsSecure")}
        </p>
      </motion.div>
    </div>
  );
}
