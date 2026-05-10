import { motion } from "motion/react";
import { Shield, Lock, Eye, CheckCircle } from "lucide-react";

export function TrustCenter() {
  return (
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
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7CA982 0%, #7A9E9F 100%)",
            borderRadius: "14px",
          }}
        >
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-foreground mb-1" style={{ fontSize: "17px", fontWeight: 600 }}>
            University Trust Center
          </h3>
          <p className="text-muted-foreground" style={{ fontSize: "13px", fontWeight: 400 }}>
            Your data is secure and private
          </p>
        </div>
      </div>

      {/* Security Features */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-accent/50" style={{ borderRadius: "12px" }}>
          <div
            className="w-9 h-9 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "#7CA98230",
              borderRadius: "10px",
            }}
          >
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
              End-to-End Encryption
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
        </div>

        <div className="flex items-center gap-3 p-3 bg-accent/50" style={{ borderRadius: "12px" }}>
          <div
            className="w-9 h-9 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "#7A9E9F30",
              borderRadius: "10px",
            }}
          >
            <Eye className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex-1">
            <div className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
              Privacy by Design
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
        </div>

        <div className="flex items-center gap-3 p-3 bg-accent/50" style={{ borderRadius: "12px" }}>
          <div
            className="w-9 h-9 flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "#7CA98230",
              borderRadius: "10px",
            }}
          >
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-foreground" style={{ fontSize: "14px", fontWeight: 500 }}>
              GDPR Compliant
            </div>
          </div>
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
        </div>
      </div>

      {/* University Badge */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center gap-3">
          <div className="text-muted-foreground text-center" style={{ fontSize: "12px", fontWeight: 400 }}>
            Verified and managed by
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <span className="text-foreground" style={{ fontSize: "13px", fontWeight: 600 }}>
            Studierendenwerk
          </span>
        </div>
      </div>
    </motion.div>
  );
}
