import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScanFace, CheckCircle2, XCircle } from "lucide-react";

interface FaceAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
  amount: string;
}

export function FaceAuth({ onSuccess, onCancel, amount }: FaceAuthProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "failed">("idle");

  const handleFaceClick = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSuccess();
      }, 800);
    }, 1500);
  };

  const handleOutsideClick = () => {
    if (status === "idle") {
      setStatus("scanning");
      setTimeout(() => {
        setStatus("failed");
        setTimeout(() => {
          setStatus("idle");
        }, 1500);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
      onClick={handleOutsideClick}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-card w-full max-w-lg rounded-t-3xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />

        <div className="text-center mb-6">
          <h3 className="text-xl mb-2">Xác thực khuôn mặt</h3>
          <p className="text-muted-foreground">
            {status === "idle" && "Nhấn vào biểu tượng để xác thực"}
            {status === "scanning" && "Đang xác thực..."}
            {status === "success" && "Xác thực thành công!"}
            {status === "failed" && "Xác thực thất bại"}
          </p>
        </div>

        {/* Face Icon - Clickable */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleFaceClick}
            disabled={status !== "idle"}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <ScanFace className="w-20 h-20 text-primary" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  />
                </motion.div>
              )}

              {status === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <ScanFace className="w-20 h-20 text-primary" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full"
                  />
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-32 h-32 bg-success/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-20 h-20 text-success" />
                </motion.div>
              )}

              {status === "failed" && (
                <motion.div
                  key="failed"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 bg-destructive/10 rounded-full flex items-center justify-center"
                >
                  <XCircle className="w-20 h-20 text-destructive" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Transaction Details */}
        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1 text-center">Số tiền giao dịch</p>
          <p className="text-2xl text-center text-primary">{amount}</p>
        </div>

        {status === "idle" && (
          <button
            onClick={onCancel}
            className="w-full py-3 text-muted-foreground"
          >
            Hủy bỏ
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
