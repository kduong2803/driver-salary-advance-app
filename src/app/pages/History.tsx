import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingDown, Calendar, Wallet, Building2, MapPin, Clock } from "lucide-react";

export function History() {
  const [activeTab, setActiveTab] = useState<"ewa" | "rbf">("ewa");

  const ewaHistory = [
    { id: "1", date: "2026-04-12T20:00:00", amount: 680000, type: "auto" as const, dayLabel: "12/04", advanceId: "EWA001" },
    { id: "2", date: "2026-04-11T20:00:00", amount: 720000, type: "auto" as const, dayLabel: "11/04", advanceId: "EWA001" },
    { id: "3", date: "2026-04-10T20:00:00", amount: 590000, type: "auto" as const, dayLabel: "10/04", advanceId: "EWA001" },
    { id: "4", date: "2026-04-09T20:00:00", amount: 710000, type: "auto" as const, dayLabel: "09/04", advanceId: "EWA001" },
    { id: "5", date: "2026-04-08T20:00:00", amount: 300000, type: "manual" as const, advanceId: "EWA001" },
  ];

  const rbfHistory = [
    { id: "1", date: "2026-04-12T20:00:00", amount: 210000, type: "auto" as const, dayLabel: "12/04", tripRevenue: 1050000, advanceId: "RBF001", revenueRate: 0.2 },
    { id: "2", date: "2026-04-11T20:00:00", amount: 190000, type: "auto" as const, dayLabel: "11/04", tripRevenue: 950000, advanceId: "RBF001", revenueRate: 0.2 },
    { id: "3", date: "2026-04-10T20:00:00", amount: 220000, type: "auto" as const, dayLabel: "10/04", tripRevenue: 1100000, advanceId: "RBF001", revenueRate: 0.2 },
    { id: "4", date: "2026-04-09T20:00:00", amount: 180000, type: "auto" as const, dayLabel: "09/04", tripRevenue: 900000, advanceId: "RBF001", revenueRate: 0.2 },
    { id: "5", date: "2026-04-08T20:00:00", amount: 500000, type: "manual" as const, advanceId: "RBF001" },
  ];

  const history = activeTab === "ewa" ? ewaHistory : rbfHistory;

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-cyan-500 to-cyan-600 text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl mb-1">Lịch sử hoàn trả</h1>
        <p className="text-white/80">Theo dõi riêng các khoản khấu trừ thu nhập và trích doanh thu</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Toggle Tabs */}
        <div className="bg-card rounded-xl p-1.5 shadow-sm border border-border/50 flex gap-1">
          <button
            onClick={() => setActiveTab("ewa")}
            className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "ewa"
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Ứng thu nhập</span>
          </button>
          <button
            onClick={() => setActiveTab("rbf")}
            className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "rbf"
                ? "bg-primary text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Ứng doanh thu</span>
          </button>
        </div>

        {/* History List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-5 border border-border/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-medium">
                          {item.type === "manual"
                            ? activeTab === "ewa" ? "Tất toán sớm thủ công" : "Thanh toán trước hạn"
                            : activeTab === "ewa" ? "Khấu trừ tự động từ thu nhập cuốc xe" : "Trích tự động từ doanh thu"}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {formatDateTime(item.date)}
                        </p>
                      </div>
                      <p className="text-lg text-primary whitespace-nowrap">-{formatCurrency(item.amount)}</p>
                    </div>

                    {/* Deduction Details */}
                    {item.type === "auto" && "dayLabel" in item && (
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Thu nhập tích lũy ngày:</span>
                          <span>{item.dayLabel}</span>
                        </div>
                        {"tripRevenue" in item && item.tripRevenue && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Doanh thu trong ngày:</span>
                              <span className="text-primary">{formatCurrency(item.tripRevenue)}</span>
                            </div>
                            {"revenueRate" in item && (
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tỷ lệ trích:</span>
                                <span>{item.revenueRate * 100}%</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Manual Payment Note */}
                    {item.type === "manual" && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <p className="text-muted-foreground">
                          {activeTab === "ewa" ? "Tất toán sớm khoản ứng từ V-Smart Pay" : "Thanh toán trước hạn từ V-Smart Pay"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
