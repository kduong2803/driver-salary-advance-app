import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, Car, Calendar, ArrowRight, QrCode } from "lucide-react";

export function LoanSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    vehicleName = "Selex Camel",
    vehicleType = "Xe máy điện",
    loanAmount = 24900000,
    downPayment = 0,
    termMonths = 24,
    dailyPayment = 41224,
    totalRepay = 29680800,
    totalInterest = 4780800,
  } = (location.state as any) || {};

  const transactionId = "LOAN" + Date.now().toString().slice(-10);
  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7c3aed", "#8b5cf6", "#a78bfa"],
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-background">
      <div className="max-w-lg mx-auto px-6 py-12 space-y-6">

        {/* Success */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle2 className="w-16 h-16 text-violet-600" />
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-violet-200/50 rounded-full"
            />
          </div>
          <h1 className="text-3xl mb-2 text-violet-700">Phê duyệt thành công!</h1>
          <p className="text-muted-foreground">Hợp đồng đã ký — VSP đã giải ngân cho đại lý</p>
        </motion.div>

        {/* Vehicle + QR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-violet-500 to-purple-700 text-white rounded-2xl p-6 shadow-xl text-center"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Car className="w-9 h-9" />
          </div>
          <p className="text-white/80 text-sm mb-1">{vehicleType}</p>
          <p className="text-2xl mb-1">{vehicleName}</p>
          <p className="text-white/70 text-sm">Đã giải ngân {formatCurrency(loanAmount)} cho đại lý</p>
          {downPayment > 0 && (
            <p className="text-white/60 text-xs mt-1">Trả trước: {formatCurrency(downPayment)} từ V-Smart Pay</p>
          )}

          <div className="mt-5 bg-white rounded-xl p-4 inline-block">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto">
              <QrCode className="w-12 h-12 text-violet-700" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Phiếu nhận xe</p>
            <p className="text-xs font-mono text-foreground">{transactionId}</p>
          </div>
        </motion.div>

        {/* Repayment info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-violet-600" />
            <h3>Lịch trả góp</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Góp mỗi ngày:</span>
              <span className="text-xl text-violet-700">{formatCurrency(dailyPayment)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thời hạn vay:</span>
              <span>{termMonths} tháng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền vay:</span>
              <span>{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tổng lãi:</span>
              <span className="text-destructive">+{formatCurrency(totalInterest)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tổng hoàn trả:</span>
              <span className="text-violet-700">{formatCurrency(totalRepay)}</span>
            </div>
          </div>

          <div className="mt-4 bg-violet-50 rounded-xl p-3 text-sm text-muted-foreground">
            Hệ thống tự động trừ{" "}
            <span className="text-violet-700">{formatCurrency(dailyPayment)}</span>{" "}
            từ ví V-Smart Pay vào 23h mỗi ngày. Đảm bảo ví đủ số dư để tránh phát sinh phí trễ hạn.
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate("/manage")}
            className="w-full bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Xem khoản vay</span>
            <ArrowRight className="w-5 h-5" />
          </button>
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
