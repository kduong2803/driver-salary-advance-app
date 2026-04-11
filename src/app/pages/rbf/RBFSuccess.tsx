import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, Percent, Building2, ArrowRight } from "lucide-react";

export function RBFSuccess() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00bcd4", "#06b6d4", "#22d3ee"],
      });
    });

    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const transactionDetails = {
    amount: 100000000,
    revenueRate: 0.1,
    account: "vsp" as const,
    estimatedDays: 60,
    transactionId: "RBF20260411001234",
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500/5 to-background">
      <div className="max-w-lg mx-auto px-6 py-12 space-y-8">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle2 className="w-16 h-16 text-primary" />
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary/20 rounded-full"
            />
          </div>
          <h1 className="text-3xl mb-2 text-primary">Thành công!</h1>
          <p className="text-muted-foreground">
            Khoản ứng doanh thu cho đối tác đã được giải ngân thành công
          </p>
        </motion.div>

        {/* Amount Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-8 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="w-5 h-5" />
              <span className="text-white/80">Số tiền giải ngân</span>
            </div>
            <p className="text-5xl mb-1">{formatCurrency(transactionDetails.amount)}</p>
            <p className="text-white/70 text-sm">
              Đã chuyển vào {transactionDetails.account === "vsp" ? "ví VSP" : "tài khoản ngân hàng"}
            </p>
          </div>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 space-y-4"
        >
          <h3 className="mb-4">Chi tiết khoản ứng doanh thu</h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mã giao dịch:</span>
              <span className="font-mono">{transactionDetails.transactionId}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Số tiền giải ngân:</span>
              <span className="text-lg">{formatCurrency(transactionDetails.amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tỷ lệ hoàn trả:</span>
              <span className="text-blue-600">{transactionDetails.revenueRate * 100}% mỗi chuyến</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tài khoản nhận:</span>
              <span>{transactionDetails.account === "vsp" ? "Ví VSP" : "Ngân hàng"}</span>
            </div>
          </div>
        </motion.div>

        {/* Repayment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Percent className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-primary">Tiến độ hoàn trả dự kiến</h4>
              <p className="text-lg mb-2">~{transactionDetails.estimatedDays} ngày</p>
              <p className="text-sm text-muted-foreground">
                Hệ thống sẽ tự động trích {transactionDetails.revenueRate * 100}% từ doanh thu phát sinh của fleet cho đến khi hoàn tất.
                Thời gian tất toán phụ thuộc trực tiếp vào hiệu suất vận hành thực tế của đối tác.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Link to="/manage">
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <span>Xem các khoản ứng</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <Link to="/">
            <button className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors">
              Về trang chủ
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
