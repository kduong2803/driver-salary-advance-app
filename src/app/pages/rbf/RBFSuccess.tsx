import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, Wallet, ArrowRight, TrendingDown } from "lucide-react";

export function RBFSuccess() {
  const location = useLocation();

  const {
    amount = 10000000,
    totalInterest = 900000,
    totalRepay = 10900000,
    deductionRate = 0.2,
    estimatedMonths = 3,
    monthlyRate = 0.030,
  } = (location.state as any) || {};

  const interestPct = (totalInterest / amount * 100).toFixed(1);
  const transactionId = "RBF" + Date.now().toString().slice(-10);

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00bcd4", "#06b6d4", "#22d3ee"],
      });
    });
  }, []);

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
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
          <p className="text-muted-foreground">Khoản ứng doanh thu đã được giải ngân thành công</p>
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
              <Wallet className="w-5 h-5" />
              <span className="text-white/80">Số tiền giải ngân</span>
            </div>
            <p className="text-5xl mb-1">{formatCurrency(amount)}</p>
            <p className="text-white/70 text-sm">Đã chuyển vào V-Smart Pay</p>
          </div>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-sm border border-border/50"
        >
          <h3 className="mb-4">Chi tiết khoản ứng doanh thu</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mã giao dịch:</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền giải ngân:</span>
              <span>{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tỷ lệ trích mỗi chuyến:</span>
              <span className="text-primary">{Math.round(deductionRate * 100)}% doanh thu</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lãi suất:</span>
              <span>{(monthlyRate * 100).toFixed(1)}%/tháng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tổng lãi ({interestPct}%):</span>
              <span className="text-destructive">+{formatCurrency(totalInterest)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tổng hoàn trả ước tính:</span>
              <span>{formatCurrency(totalRepay)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tài khoản nhận:</span>
              <span className="flex items-center gap-1"><Wallet className="w-3.5 h-3.5" /> V-Smart Pay</span>
            </div>
          </div>
        </motion.div>

        {/* Repayment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-primary">Kỳ hạn tương đương ~{estimatedMonths} tháng</h4>
              <p className="text-sm text-muted-foreground">
                Hệ thống tự động trích {Math.round(deductionRate * 100)}% từ doanh thu sau mỗi chuyến cho đến khi hoàn tất.
                Có thể điều chỉnh % trích hoặc trả trước để hoàn thành sớm hơn.
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
            <button className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
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
