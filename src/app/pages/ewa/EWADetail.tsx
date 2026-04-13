import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Wallet } from "lucide-react";

const ADVANCES = [
  { id: "1", amount: 10000000, netAmount: 9850000, fee: 150000, status: "active" as const, createdAt: "2026-04-11T10:30:00", dueDate: "2026-04-30" },
  { id: "2", amount: 5000000, netAmount: 4925000, fee: 75000, status: "active" as const, createdAt: "2026-04-05T09:00:00", dueDate: "2026-04-30" },
  { id: "3", amount: 8000000, netAmount: 7880000, fee: 120000, status: "completed" as const, createdAt: "2026-03-15T08:00:00", dueDate: "2026-04-10" },
];

export function EWADetail() {
  const { id } = useParams();

  const advance = ADVANCES.find((a) => a.id === id) || ADVANCES[0];

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Chi tiết ứng thu nhập</h1>
        <p className="text-white/80">Mã: #{advance.id}</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        {/* Amount Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-6 shadow-xl text-center relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <p className="text-white/80 text-sm mb-1">Số tiền thực nhận</p>
            <p className="text-4xl mb-1">{formatCurrency(advance.netAmount)}</p>
            <p className="text-white/70 text-sm">Đã chuyển vào V-Smart Pay</p>
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
            <Wallet className="w-5 h-5 text-primary" />
            <h3>Thông tin ứng thu nhập</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ngày ứng tiền:</span>
              <span>{formatDateTime(advance.createdAt)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thu nhập được ứng:</span>
              <span>{formatCurrency(advance.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí dịch vụ (1.5%):</span>
              <span className="text-destructive">-{formatCurrency(advance.fee)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Số tiền thực nhận:</span>
              <span className="text-primary">{formatCurrency(advance.netAmount)}</span>
            </div>
          </div>
        </motion.div>

        {/* Repayment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-5 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="mb-1 text-primary">Ngày dự kiến thanh toán</h4>
              <p className="text-2xl mb-2">{formatDate(advance.dueDate)}</p>
              <p className="text-sm text-muted-foreground">
                Toàn bộ khoản ứng sẽ được khấu trừ một lần từ thu nhập cuối kỳ tháng này — không cần thao tác, không cần nhớ ngày.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
