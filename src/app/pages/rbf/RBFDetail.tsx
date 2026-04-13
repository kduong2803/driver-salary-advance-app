import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Percent, TrendingUp, TrendingDown, History, AlertCircle, Building2, ChevronUp, ChevronDown } from "lucide-react";

const DAILY_RATE = 0.36 / 365;

export function RBFDetail() {
  const { id } = useParams();
  const [showPayEarly, setShowPayEarly] = useState(false);

  const advance = {
    id: id || "1",
    amount: 10000000,
    status: "active" as const,
    createdAt: "2026-04-11T14:30:00",
    revenueRate: 0.2,
    paidAmount: 5000000,
    remainingAmount: 5000000,
    progress: 50,
  };

  const [currentRate, setCurrentRate] = useState(advance.revenueRate);
  const [pendingRate, setPendingRate] = useState(advance.revenueRate);

  const avgDailyRevenue = 1000000;
  const daysSinceCreation = Math.ceil(
    (new Date("2026-04-13").getTime() - new Date(advance.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  const accruedFee = Math.round(advance.amount * DAILY_RATE * daysSinceCreation);
  const estimatedDaysRemaining = Math.ceil(advance.remainingAmount / (avgDailyRevenue * currentRate));

  const repaymentHistory = [
    { date: "2026-04-12T19:45:00", amount: 56000, tripRevenue: 185000, tripId: "T002145" },
    { date: "2026-04-12T16:20:00", amount: 63000, tripRevenue: 210000, tripId: "T002144" },
    { date: "2026-04-12T13:05:00", amount: 44000, tripRevenue: 145000, tripId: "T002143" },
    { date: "2026-04-11T20:10:00", amount: 69000, tripRevenue: 230000, tripId: "T002142" },
    { date: "2026-04-08T09:00:00", amount: 500000, type: "manual" as const, tripRevenue: null, tripId: null },
  ];

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const adjustPendingRate = (delta: number) => {
    const newRate = Math.round((pendingRate + delta) * 100) / 100;
    if (newRate >= advance.revenueRate && newRate <= 0.5) setPendingRate(newRate);
  };

  const confirmRateChange = () => {
    setCurrentRate(pendingRate);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Chi tiết ứng doanh thu</h1>
        <p className="text-white/80">Mã: #{advance.id}</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Còn phải hoàn trả</p>
              <p className="text-3xl">{formatCurrency(advance.remainingAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1">Đã trích</p>
              <p className="text-xl">{formatCurrency(advance.paidAmount)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${advance.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm text-white/80">
              <span>{advance.progress}% đã hoàn trả</span>
              <span>{100 - advance.progress}% còn lại</span>
            </div>
          </div>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h3>Thông tin khoản ứng</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ngày giải ngân:</span>
              <span>{formatDateTime(advance.createdAt)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền giải ngân:</span>
              <span>{formatCurrency(advance.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí phát sinh đến nay ({daysSinceCreation} ngày):</span>
              <span className="text-destructive">+{formatCurrency(accruedFee)}</span>
            </div>
            <div className="bg-muted/40 rounded-lg px-3 py-2 text-xs text-muted-foreground">
              Phí tính theo ngày thực tế (36%/năm).
            </div>
          </div>
        </motion.div>

        {/* Rate Adjustment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Percent className="w-5 h-5 text-primary" />
            <h3>Tỷ lệ trích doanh thu</h3>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Đang áp dụng: <span className="text-foreground font-medium">{Math.round(currentRate * 100)}%/chuyến</span></p>
              <p className="text-xs text-muted-foreground mt-0.5">Tối thiểu {Math.round(advance.revenueRate * 100)}% (mốc ban đầu) • Tối đa 50%</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => adjustPendingRate(-0.05)}
                disabled={pendingRate <= advance.minRate}
                className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center disabled:opacity-30 hover:border-primary transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className={`text-2xl font-semibold w-14 text-center ${pendingRate !== currentRate ? "text-amber-500" : "text-primary"}`}>
                {Math.round(pendingRate * 100)}%
              </span>
              <button
                onClick={() => adjustPendingRate(0.05)}
                disabled={pendingRate >= 0.8}
                className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center disabled:opacity-30 hover:border-primary transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-3 flex justify-between text-sm mb-3">
            <span className="text-muted-foreground">Ước tính hoàn tất:</span>
            <span className="text-primary font-medium">~{estimatedDaysRemaining} ngày nữa</span>
          </div>

          {pendingRate !== currentRate && (
            <button
              onClick={confirmRateChange}
              className="w-full bg-primary text-white py-2.5 rounded-xl text-sm hover:bg-primary/90 transition-colors"
            >
              Xác nhận thay đổi — áp dụng {Math.round(pendingRate * 100)}%
            </button>
          )}
        </motion.div>

        {/* Repayment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary" />
            <h3>Lịch sử trích hoàn trả</h3>
          </div>

          <div className="space-y-3">
            {repaymentHistory.map((item, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-sm">{item.type === "manual" ? "Thanh toán trước hạn" : "Trích tự động từ doanh thu"}</p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(item.date)}</p>
                    </div>
                    <p className="text-sm text-primary whitespace-nowrap">-{formatCurrency(item.amount)}</p>
                  </div>
                  {item.tripId && item.tripRevenue && (
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Mã chuyến: {item.tripId} • Doanh thu: {formatCurrency(item.tripRevenue)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowPayEarly(true)}
            className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Trả trước từ V-Smart Pay
          </button>
        </motion.div>
      </div>

      {/* Pay Early Modal */}
      {showPayEarly && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
          onClick={() => setShowPayEarly(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-card w-full max-w-lg rounded-t-3xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
            <h3 className="text-xl mb-4">Thanh toán trước</h3>

            <div className="bg-muted/50 rounded-xl p-4 mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số dư V-Smart Pay:</span>
                <span className="text-lg">{formatCurrency(12000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số tiền cần trả:</span>
                <span className="text-lg text-primary">{formatCurrency(advance.remainingAmount)}</span>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-4 mb-6 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Tất toán sớm giúp đóng khoản ứng ngay — không phát sinh thêm phí. Hạn mức của bạn sẽ được phục hồi sau khi hoàn tất.
              </p>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors mb-3">
              Xác nhận trả {formatCurrency(advance.remainingAmount)}
            </button>
            <button onClick={() => setShowPayEarly(false)} className="w-full py-3 text-muted-foreground">
              Hủy bỏ
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
