import { Link } from "react-router";
import { motion } from "motion/react";
import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";

export function EWAList() {
  const advances = [
    {
      id: "1",
      amount: 10000000,
      netAmount: 9850000,
      fee: 150000,
      status: "active" as const,
      createdAt: "2026-04-11",
      dueDate: "2026-05-11",
      paidAmount: 3000000,
      remainingAmount: 7000000,
      progress: 30,
    },
    {
      id: "2",
      amount: 5000000,
      netAmount: 4925000,
      fee: 75000,
      status: "active" as const,
      createdAt: "2026-04-05",
      dueDate: "2026-04-25",
      paidAmount: 4000000,
      remainingAmount: 1000000,
      progress: 80,
    },
    {
      id: "3",
      amount: 8000000,
      netAmount: 7880000,
      fee: 120000,
      status: "completed" as const,
      createdAt: "2026-03-15",
      dueDate: "2026-04-10",
      paidAmount: 8000000,
      remainingAmount: 0,
      progress: 100,
    },
  ];

  const stats = {
    totalActive: advances.filter((a) => a.status === "active").length,
    totalAmount: advances
      .filter((a) => a.status === "active")
      .reduce((sum, a) => sum + a.remainingAmount, 0),
    availableLimit: 15000000,
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          label: "Đang hoạt động",
          icon: Clock,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        };
      case "completed":
        return {
          label: "Đã hoàn tất",
          icon: CheckCircle,
          color: "text-primary",
          bgColor: "bg-primary/10",
        };
      case "overdue":
        return {
          label: "Quá hạn",
          icon: AlertCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
        };
      default:
        return {
          label: status,
          icon: Clock,
          color: "text-muted-foreground",
          bgColor: "bg-muted",
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl mb-1">Quản lý khoản ứng</h1>
        <p className="text-white/80">Theo dõi và quản lý các khoản ứng lương</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-4 border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Đang hoạt động</span>
            </div>
            <p className="text-2xl text-primary">{stats.totalActive}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(stats.totalAmount)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl p-4 border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">Hạn mức khả dụng</span>
            </div>
            <p className="text-2xl text-primary">{stats.availableLimit / 1000000}tr</p>
            <p className="text-xs text-muted-foreground mt-1">Có thể ứng thêm</p>
          </motion.div>
        </div>

        {/* New Advance Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/ewa/request">
            <button className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" />
              <span>Ứng lương mới</span>
            </button>
          </Link>
        </motion.div>

        {/* Advances List */}
        <div className="space-y-3">
          <h3 className="px-1">Danh sách khoản ứng</h3>

          {advances.map((advance, index) => {
            const statusConfig = getStatusConfig(advance.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={advance.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={`/ewa/detail/${advance.id}`}>
                  <div className="bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xl mb-1">{formatCurrency(advance.amount)}</p>
                        <p className="text-xs text-muted-foreground">
                          Ngày ứng: {formatDate(advance.createdAt)}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                        <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                        <span className={`text-xs ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>

                    {/* Progress */}
                    {advance.status === "active" && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Đã trả: {formatCurrency(advance.paidAmount)}</span>
                          <span>Còn lại: {formatCurrency(advance.remainingAmount)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${advance.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {advance.status === "active" ? `Đến hạn: ${formatDate(advance.dueDate)}` : "Đã tất toán"}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
