import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Percent, TrendingUp, TrendingDown, History, AlertCircle, Building2 } from "lucide-react";

export function RBFDetail() {
  const { id } = useParams();
  const [showPayEarly, setShowPayEarly] = useState(false);

  // Mock data - in real app, fetch based on id
  const advance = {
    id: id || "1",
    amount: 90000000,
    status: "active" as const,
    createdAt: "2026-04-11T14:30:00",
    revenueRate: 0.1,
    paidAmount: 28000000,
    remainingAmount: 62000000,
    progress: 31,
    estimatedCompletionDate: "2026-06-10",
  };

  const repaymentHistory = [
    { date: "2026-04-15", amount: 1200000, tripRevenue: 12000000, tripId: "T005678", driverId: "D123" },
    { date: "2026-04-14", amount: 800000, tripRevenue: 8000000, tripId: "T005677", driverId: "D124" },
    { date: "2026-04-14", amount: 1500000, tripRevenue: 15000000, tripId: "T005676", driverId: "D125" },
    { date: "2026-04-13", amount: 2000000, type: "manual", tripRevenue: null, tripId: null, driverId: null },
  ];

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
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

          {/* Progress Bar */}
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
          className="bg-card rounded-2xl p-6 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h3>Thông tin khoản ứng doanh thu</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ngày ứng:</span>
              <span>{formatDateTime(advance.createdAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ngày dự kiến hoàn tất:</span>
              <span>{formatDate(advance.estimatedCompletionDate)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Số tiền giải ngân:</span>
              <span className="text-lg">{formatCurrency(advance.amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tỷ lệ hoàn trả:</span>
              <span className="text-primary flex items-center gap-1">
                <Percent className="w-4 h-4" />
                {advance.revenueRate * 100}% mỗi chuyến
              </span>
            </div>
          </div>
        </motion.div>

        {/* Repayment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-2xl p-5 border border-blue-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-primary">Cơ chế trích doanh thu</h4>
              <p className="text-sm text-muted-foreground">
                {advance.revenueRate * 100}% doanh thu sẽ được tự động trích từ mỗi giao dịch phát sinh
                của toàn fleet. Dự kiến hoàn tất vào{" "}
                <span className="text-foreground font-medium">{formatDate(advance.estimatedCompletionDate)}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Repayment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-6 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary" />
            <h3>Lịch sử trích hoàn trả</h3>
          </div>

          <div className="space-y-3">
            {repaymentHistory.map((item, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-sm">
                        {item.type === "manual" ? "Thanh toán trước hạn" : "Trích tự động từ doanh thu"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(item.date)}
                      </p>
                    </div>
                    <p className="text-sm text-primary">-{formatCurrency(item.amount)}</p>
                  </div>
                  {item.tripId && item.tripRevenue && (
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Chuyến {item.tripId} • Tài xế {item.driverId}</p>
                      <p>Doanh thu: {formatCurrency(item.tripRevenue)} → Trích {advance.revenueRate * 100}%</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pay Early Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowPayEarly(true)}
            className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Trả trước từ ví VSP
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

            <h3 className="text-xl mb-4">Thanh toán trước hạn</h3>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Số dư ví VSP:</span>
                <span className="text-lg">{formatCurrency(95000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số tiền cần trả:</span>
                <span className="text-lg text-primary">{formatCurrency(advance.remainingAmount)}</span>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-4 mb-6 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Sau khi trả trước, khoản ứng sẽ được đóng và hạn mức của bạn sẽ được phục hồi.
                Việc hoàn trả sớm giúp cải thiện hạn mức cho các khoản ứng tiếp theo.
              </p>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors mb-3">
              Xác nhận trả {formatCurrency(advance.remainingAmount)}
            </button>

            <button
              onClick={() => setShowPayEarly(false)}
              className="w-full py-3 text-muted-foreground"
            >
              Hủy bỏ
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
