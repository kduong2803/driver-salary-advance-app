import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2,  Calendar, ArrowRight, QrCode } from "lucide-react";
import { MotorbikeIcon } from "../../components/MotorbikeIcon";

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

  const [walletSweep, setWalletSweep] = useState(false);
  const transactionId = "LOAN" + Date.now().toString().slice(-10);
  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0d9488", "#10b981", "#34d399"],
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-background">
      <div className="max-w-lg mx-auto px-6 py-12 space-y-6">

        {/* Success */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <CheckCircle2 className="w-16 h-16 text-teal-600" />
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-teal-200/50 rounded-full"
            />
          </div>
          <h1 className="text-3xl mb-2 text-teal-700">Phê duyệt thành công!</h1>
          <p className="text-muted-foreground">Đã xác nhận — đại lý nhận thanh toán ngay</p>
        </motion.div>

        {/* Vehicle + QR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white rounded-2xl p-6 shadow-xl text-center"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <MotorbikeIcon className="w-9 h-9 text-white" />
          </div>
          <p className="text-white/80 text-sm mb-1">{vehicleType}</p>
          <p className="text-2xl mb-1">{vehicleName}</p>
          <p className="text-white/70 text-sm">Đã thanh toán {formatCurrency(loanAmount)} cho đại lý</p>
          {downPayment > 0 && (
            <p className="text-white/60 text-xs mt-1">Trả trước: {formatCurrency(downPayment)} từ V-Smart Pay</p>
          )}

          <div className="mt-5 bg-white rounded-xl p-4 inline-block">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto">
              <QrCode className="w-12 h-12 text-teal-700" />
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
            <Calendar className="w-5 h-5 text-teal-600" />
            <h3>Lịch trả góp</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Góp mỗi ngày:</span>
              <span className="text-xl text-teal-700">{formatCurrency(dailyPayment)}</span>
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
              <span className="text-muted-foreground">Lãi suất:</span>
              <span>~0.8%/tháng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tổng lãi:</span>
              <span className="text-destructive">+{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tỷ lệ trích ước tính:</span>
              <span>~{Math.round((dailyPayment / 350000) * 100)}% doanh thu/ngày</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tổng phải trả:</span>
              <span className="text-teal-700">{formatCurrency(totalRepay)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Dư nợ sẽ được tự động khấu trừ từ doanh thu cuốc xe.
            </p>
            <div className="flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2.5 gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">Tự động quét ví V-SmartPay</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {walletSweep ? "Bật — số tiền còn thiếu trong ngày sẽ được tự động thanh toán vào 23h55" : "Bật ngay để trả tiền tự động còn thiếu trong ngày"}
                </p>
              </div>
              <button
                onClick={() => setWalletSweep(!walletSweep)}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${walletSweep ? "bg-teal-500" : "bg-muted-foreground/30"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${walletSweep ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
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
            className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
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
