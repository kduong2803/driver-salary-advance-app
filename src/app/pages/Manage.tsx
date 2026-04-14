import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle, ChevronRight, Wallet, Building2,  Flame, Zap } from "lucide-react";
import { MotorbikeIcon } from "../components/MotorbikeIcon";

export function Manage() {
  const [activeTab, setActiveTab] = useState<"ewa" | "rbf" | "loan">("ewa");

  const ewaAdvances = [
    {
      id: "1",
      amount: 10000000,
      netAmount: 9850000,
      fee: 150000,
      status: "active" as const,
      createdAt: "2026-04-11",
      dueDate: "2026-04-30",
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
      dueDate: "2026-04-30",
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

  const rbfAdvances = [
    {
      id: "1",
      amount: 15000000,
      status: "active" as const,
      createdAt: "2026-04-11",
      revenueRate: 0.2,
      estimatedMonths: 3,
      monthlyRate: 0.030,
      paidAmount: 5000000,
      remainingAmount: 10000000,
      progress: 33,
      streak: 3,
      streakDays: ["paid","paid","paid"] as const,
    },
    {
      id: "2",
      amount: 10000000,
      status: "active" as const,
      createdAt: "2026-03-20",
      revenueRate: 0.3,
      estimatedMonths: 2,
      monthlyRate: 0.028,
      paidAmount: 6000000,
      remainingAmount: 4000000,
      progress: 60,
      streak: 5,
      streakDays: ["paid","wallet","paid","paid","missed","paid","wallet"] as const,
    },
    {
      id: "3",
      amount: 12000000,
      status: "completed" as const,
      createdAt: "2026-02-01",
      revenueRate: 0.3,
      estimatedMonths: 2,
      monthlyRate: 0.028,
      paidAmount: 12000000,
      remainingAmount: 0,
      progress: 100,
      streak: 42,
      streakDays: ["paid","paid","paid","paid","paid","paid","paid"] as const,
    },
  ];

  const loanAdvances = [
    {
      id: "1",
      vehicleName: "VinFast Klara S",
      loanAmount: 30000000,
      dailyPayment: 35778,
      paidAmount: 3220020,
      remainingAmount: 35419980,
      progress: 25,
      status: "active" as const,
      createdAt: "2026-01-11",
      termMonths: 36,
      streak: 8,
      missedYesterday: false,
      rolledOver: 0,
      streakDays: ["trip","trip","wallet","trip","trip","missed","trip","trip"] as const,
    },
    {
      id: "2",
      vehicleName: "VinFast Feliz S",
      loanAmount: 24900000,
      dailyPayment: 41224,
      paidAmount: 14840640,
      remainingAmount: 14840160,
      progress: 50,
      status: "active" as const,
      createdAt: "2025-04-14",
      termMonths: 24,
      streak: 0,
      missedYesterday: true,
      rolledOver: 41224,
      streakDays: ["trip","trip","wallet","trip","trip","trip","missed","today"] as const,
    },
    {
      id: "3",
      vehicleName: "VinFast Evo200",
      loanAmount: 19900000,
      dailyPayment: 32945,
      paidAmount: 23720800,
      remainingAmount: 0,
      progress: 100,
      status: "completed" as const,
      createdAt: "2024-04-14",
      termMonths: 24,
      streak: 720,
      missedYesterday: false,
      rolledOver: 0,
      streakDays: ["trip","trip","trip","trip","trip","trip","trip","trip"] as const,
    },
  ];

  const loanStats = {
    totalActive: loanAdvances.filter((l) => l.status === "active").length,
    totalAmount: loanAdvances.filter((l) => l.status === "active").reduce((sum, l) => sum + l.remainingAmount, 0),
    availableLimit: 0,
  };

  const ewaStats = {
    totalActive: ewaAdvances.filter((a) => a.status === "active").length,
    totalAmount: ewaAdvances
      .filter((a) => a.status === "active")
      .reduce((sum, a) => sum + a.remainingAmount, 0),
    availableLimit: 15000000,
  };

  const rbfStats = {
    totalActive: rbfAdvances.filter((a) => a.status === "active").length,
    totalAmount: rbfAdvances
      .filter((a) => a.status === "active")
      .reduce((sum, a) => sum + a.remainingAmount, 0),
    availableLimit: 15000000,
  };

  const stats = activeTab === "ewa" ? ewaStats : activeTab === "rbf" ? rbfStats : loanStats;

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

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date("2026-04-13");
    const due = new Date(dueDate);
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          label: "Đang hoạt động",
          icon: Clock,
          color: "text-primary",
          bgColor: "bg-primary/10",
        };
      case "completed":
        return {
          label: "Đã hoàn tất",
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
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
      <div className="bg-gradient-to-br from-primary via-cyan-500 to-cyan-600 text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl mb-1">Quản lý tài chính</h1>
        <p className="text-white/80">Theo dõi khoản ứng thu nhập, ứng doanh thu và vay mua xe</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Toggle Tabs */}
        <div className="bg-card rounded-xl p-1.5 shadow-sm border border-border/50 flex gap-1">
          {(["ewa", "rbf", "loan"] as const).map((tab) => {
            const config = {
              ewa: { icon: Wallet, label: "Thu nhập" },
              rbf: { icon: Building2, label: "Doanh thu" },
              loan: { icon: MotorbikeIcon, label: "Vay xe" },
            }[tab];
            const Icon = config.icon;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 text-sm ${
                  activeTab === tab ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stats Overview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {activeTab === "ewa" ? "Khoản ứng đang khấu trừ" : activeTab === "rbf" ? "Khoản ứng đang hoàn trả" : "Khoản vay đang hoàn trả"}
                </span>
              </div>
              <p className="text-2xl text-primary">{stats.totalActive}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {activeTab === "ewa" ? "Còn phải khấu trừ " : "Còn phải hoàn trả "}{formatCurrency(stats.totalAmount)}
              </p>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {activeTab === "loan" ? "Hạn mức đã sử dụng" : activeTab === "ewa" ? "Có thể ứng thêm" : "Hạn mức còn khả dụng"}
                </span>
              </div>
              <p className="text-2xl text-primary">
                {activeTab === "loan" ? `${(loanAdvances.filter(l => l.status === "active").reduce((s, l) => s + l.loanAmount, 0) / 1000000).toFixed(0)}tr` : `${stats.availableLimit / 1000000}tr`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activeTab === "ewa" ? "Dựa trên thu nhập đã phát sinh" : activeTab === "rbf" ? "Dựa trên hạn mức đã duyệt" : "Tổng vốn đang vay"}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* New Advance Button */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-button"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={activeTab === "ewa" ? "/ewa/request" : activeTab === "rbf" ? "/rbf/request" : "/loan/request"}>
              <button className={`w-full text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg ${activeTab === "loan" ? "bg-teal-600 hover:bg-teal-700 shadow-teal-500/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"}`}>
                <Plus className="w-5 h-5" />
                <span>{activeTab === "ewa" ? "Tạo khoản ứng thu nhập" : activeTab === "rbf" ? "Tạo khoản ứng doanh thu" : "Đăng ký vay mua xe"}</span>
              </button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Advances / Loans List */}
        <div className="space-y-3">
          <h3 className="px-1">
            {activeTab === "ewa" ? "Danh sách ứng thu nhập" : activeTab === "rbf" ? "Danh sách ứng doanh thu" : "Danh sách khoản vay"}
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-list"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* EWA cards */}
              {activeTab === "ewa" && ewaAdvances.map((advance, index) => {
                const statusConfig = getStatusConfig(advance.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <motion.div key={advance.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link to={`/ewa/detail/${advance.id}`}>
                      <div className="bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-xl mb-1">{formatCurrency(advance.amount)}</p>
                            <p className="text-xs text-muted-foreground">Ngày ứng tiền: {formatDate(advance.createdAt)}</p>
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                            <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                          </div>
                        </div>
                        {advance.status === "active" && (
                          <div className="mb-4 bg-muted/40 rounded-lg px-3 py-2 flex justify-between text-sm">
                            <span className="text-muted-foreground">Số tiền sẽ khấu trừ</span>
                            <span className="text-primary">{formatCurrency(advance.amount)}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {advance.status === "active" ? `Ngày dự kiến thanh toán: ${formatDate(advance.dueDate)}` : "Đã hoàn tất"}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* RBF cards — same design as loan */}
              {activeTab === "rbf" && rbfAdvances.map((advance, index) => {
                const statusConfig = getStatusConfig(advance.status);
                const StatusIcon = statusConfig.icon;
                const dayColors: Record<string, string> = {
                  paid: "bg-teal-400",
                  wallet: "bg-cyan-400",
                  missed: "bg-red-400",
                  today: "bg-amber-400",
                };
                return (
                  <motion.div key={advance.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link to={`/rbf/detail/${advance.id}`}>
                      <div className="bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium mb-0.5">{formatCurrency(advance.amount)}</p>
                              <p className="text-xs text-muted-foreground">Ngày giải ngân: {formatDate(advance.createdAt)}</p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                            <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                          </div>
                        </div>

                        {/* Progress */}
                        {advance.status === "active" && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                              <span>Đã hoàn trả: {formatCurrency(advance.paidAmount)}</span>
                              <span>Còn lại: {formatCurrency(advance.remainingAmount)}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${advance.progress}%` }} transition={{ duration: 1, delay: 0.3 + index * 0.05 }} className="h-full bg-primary rounded-full" />
                            </div>
                          </div>
                        )}

                        {/* Streak strip */}
                        {advance.status !== "completed" && (
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {advance.streakDays.slice(-7).map((s, i) => (
                                <div key={i} className={`w-5 h-5 rounded-full ${dayColors[s] ?? "bg-muted"} flex items-center justify-center`}>
                                  {s === "wallet" && <Zap className="w-3 h-3 text-white" />}
                                  {s === "missed" && <span className="text-white text-xs leading-none">!</span>}
                                  {s === "today" && <span className="text-white text-xs leading-none">·</span>}
                                </div>
                              ))}
                            </div>
                            {advance.streak > 0 && (
                              <div className="flex items-center gap-1 text-xs text-orange-600">
                                <Flame className="w-3.5 h-3.5" />
                                <span>{advance.streak} ngày</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {advance.status === "active"
                              ? `Trích ${Math.round(advance.revenueRate * 100)}%/chuyến · kỳ ~${advance.estimatedMonths} tháng`
                              : `Hoàn tất — streak ${advance.streak} ngày`}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Loan cards */}
              {activeTab === "loan" && loanAdvances.map((loan, index) => {
                const statusConfig = getStatusConfig(loan.status);
                const StatusIcon = statusConfig.icon;
                const dayColors: Record<string, string> = {
                  trip: "bg-teal-400",
                  wallet: "bg-cyan-400",
                  missed: "bg-red-400",
                  today: "bg-amber-400",
                  future: "bg-muted",
                };
                return (
                  <motion.div key={loan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link to={`/loan/detail/${loan.id}`}>
                      <div className="bg-card rounded-xl p-5 border border-border/50 hover:shadow-md transition-shadow">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <MotorbikeIcon className="w-5 h-5 text-teal-600" />
                            </div>
                            <div>
                              <p className="font-medium mb-0.5">{loan.vehicleName}</p>
                              <p className="text-xs text-muted-foreground">Ngày mua xe: {formatDate(loan.createdAt)}</p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusConfig.bgColor}`}>
                            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                            <span className={`text-xs ${statusConfig.color}`}>{statusConfig.label}</span>
                          </div>
                        </div>

                        {/* Missed warning */}
                        {loan.missedYesterday && (
                          <div className="mb-3 bg-red-50 border border-red-100 rounded-lg px-3 py-2 flex items-center gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            <p className="text-xs text-red-600">
                              Hôm qua thiếu — gộp thêm <span className="font-medium">{formatCurrency(loan.rolledOver)}</span> vào hôm nay
                            </p>
                          </div>
                        )}

                        {/* Progress */}
                        {loan.status === "active" && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                              <span>Đã trả: {formatCurrency(loan.paidAmount)}</span>
                              <span>Còn lại: {formatCurrency(loan.remainingAmount)}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${loan.progress}%` }} transition={{ duration: 1, delay: 0.3 + index * 0.05 }} className="h-full bg-teal-500 rounded-full" />
                            </div>
                          </div>
                        )}

                        {/* Streak strip — always show last 7 days only; full history on detail page */}
                        {loan.status !== "completed" && (
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {loan.streakDays.slice(-7).map((s, i) => (
                                <div key={i} className={`w-5 h-5 rounded-full ${dayColors[s]} flex items-center justify-center`}>
                                  {s === "wallet" && <Zap className="w-3 h-3 text-white" />}
                                  {s === "missed" && <span className="text-white text-xs leading-none">!</span>}
                                  {s === "today" && <span className="text-white text-xs leading-none">·</span>}
                                </div>
                              ))}
                            </div>
                            {loan.streak > 0 && (
                              <div className="flex items-center gap-1 text-xs text-orange-600">
                                <Flame className="w-3.5 h-3.5" />
                                <span>{loan.streak} ngày</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {loan.status === "active" ? `Góp mỗi ngày: ${formatCurrency(loan.dailyPayment)}` : `Hoàn tất — streak ${loan.streak} ngày`}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
