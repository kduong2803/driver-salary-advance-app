import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingDown, Wallet, Building2, Clock, List, CalendarDays, MapPin, Calendar } from "lucide-react";

export function History() {
  const [activeTab, setActiveTab] = useState<"ewa" | "rbf">("ewa");
  const [viewMode, setViewMode] = useState<"detail" | "daily">("detail");

  // EWA — khấu trừ cuối kỳ lương (không theo cuốc xe)
  const ewaDetailHistory = [
    { id: "1", date: "2026-03-31T08:00:00", amount: 8000000, type: "auto" as const, note: "Khấu trừ cuối kỳ tháng 03/2026 — thu nhập phát sinh 16.200.000đ" },
    { id: "2", date: "2026-03-15T10:30:00", amount: 5000000, type: "manual" as const, note: "Tất toán sớm từ V-Smart Pay" },
    { id: "3", date: "2026-02-28T08:00:00", amount: 10000000, type: "auto" as const, note: "Khấu trừ cuối kỳ tháng 02/2026 — thu nhập phát sinh 18.500.000đ" },
    { id: "4", date: "2026-01-31T08:00:00", amount: 7500000, type: "auto" as const, note: "Khấu trừ cuối kỳ tháng 01/2026 — thu nhập phát sinh 14.800.000đ" },
  ];

  // EWA — gộp theo tháng
  const ewaDailyHistory = [
    { id: "1", date: "2026-03-31", amount: 13000000, type: "auto" as const, dayLabel: "03/2026", note: "Khấu trừ cuối kỳ + tất toán sớm" },
    { id: "2", date: "2026-02-28", amount: 10000000, type: "auto" as const, dayLabel: "02/2026", note: "Khấu trừ cuối kỳ" },
    { id: "3", date: "2026-01-31", amount: 7500000, type: "auto" as const, dayLabel: "01/2026", note: "Khấu trừ cuối kỳ" },
  ];

  // RBF — chi tiết theo cuốc xe (trích 20% doanh thu mỗi cuốc)
  const rbfDetailHistory = [
    { id: "1", date: "2026-04-12T19:45:00", amount: 37000, type: "auto" as const, tripId: "T002145", tripRevenue: 185000, revenueRate: 0.2, from: "Quận 1, TP.HCM", to: "Quận 7, TP.HCM" },
    { id: "2", date: "2026-04-12T16:20:00", amount: 42000, type: "auto" as const, tripId: "T002144", tripRevenue: 210000, revenueRate: 0.2, from: "Tân Bình, TP.HCM", to: "Bình Thạnh, TP.HCM" },
    { id: "3", date: "2026-04-12T13:05:00", amount: 29000, type: "auto" as const, tripId: "T002143", tripRevenue: 145000, revenueRate: 0.2, from: "Gò Vấp, TP.HCM", to: "Phú Nhuận, TP.HCM" },
    { id: "4", date: "2026-04-11T20:10:00", amount: 46000, type: "auto" as const, tripId: "T002142", tripRevenue: 230000, revenueRate: 0.2, from: "Quận 3, TP.HCM", to: "Thủ Đức, TP.HCM" },
    { id: "5", date: "2026-04-11T17:30:00", amount: 33000, type: "auto" as const, tripId: "T002141", tripRevenue: 165000, revenueRate: 0.2, from: "Bình Thạnh, TP.HCM", to: "Quận 4, TP.HCM" },
    { id: "6", date: "2026-04-11T14:45:00", amount: 39000, type: "auto" as const, tripId: "T002140", tripRevenue: 195000, revenueRate: 0.2, from: "Quận 10, TP.HCM", to: "Quận 1, TP.HCM" },
    { id: "7", date: "2026-04-11T10:20:00", amount: 26000, type: "auto" as const, tripId: "T002139", tripRevenue: 130000, revenueRate: 0.2, from: "Tân Phú, TP.HCM", to: "Tân Bình, TP.HCM" },
    { id: "8", date: "2026-04-08T09:00:00", amount: 500000, type: "manual" as const, tripId: null },
  ];

  // RBF — gộp theo ngày
  const rbfDailyHistory = [
    { id: "1", date: "2026-04-12", amount: 108000, type: "auto" as const, tripCount: 3, tripRevenue: 540000, dayLabel: "12/04", revenueRate: 0.2 },
    { id: "2", date: "2026-04-11", amount: 144000, type: "auto" as const, tripCount: 4, tripRevenue: 720000, dayLabel: "11/04", revenueRate: 0.2 },
    { id: "3", date: "2026-04-10", amount: 118000, type: "auto" as const, tripCount: 3, tripRevenue: 590000, dayLabel: "10/04", revenueRate: 0.2 },
    { id: "4", date: "2026-04-09", amount: 130000, type: "auto" as const, tripCount: 4, tripRevenue: 650000, dayLabel: "09/04", revenueRate: 0.2 },
    { id: "5", date: "2026-04-08", amount: 500000, type: "manual" as const, dayLabel: "08/04" },
  ];

  const history =
    activeTab === "ewa"
      ? viewMode === "detail" ? ewaDetailHistory : ewaDailyHistory
      : viewMode === "detail" ? rbfDetailHistory : rbfDailyHistory;

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
      <div className="bg-gradient-to-br from-primary via-cyan-500 to-cyan-600 text-white px-6 pt-12 pb-8">
        <h1 className="text-2xl mb-1">Lịch sử hoàn trả</h1>
        <p className="text-white/80">Theo dõi riêng các khoản khấu trừ thu nhập và trích doanh thu</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-4">
        {/* Product Tab */}
        <div className="bg-card rounded-xl p-1.5 shadow-sm border border-border/50 flex gap-1">
          <button
            onClick={() => setActiveTab("ewa")}
            className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "ewa" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Ứng thu nhập</span>
          </button>
          <button
            onClick={() => setActiveTab("rbf")}
            className={`flex-1 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "rbf" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Ứng doanh thu</span>
          </button>
        </div>

        {/* View Mode Sub-tab */}
        <div className="bg-muted/40 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setViewMode("detail")}
            className={`flex-1 py-2 rounded-md text-sm transition-all flex items-center justify-center gap-1.5 ${
              viewMode === "detail" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Chi tiết
          </button>
          <button
            onClick={() => setViewMode("daily")}
            className={`flex-1 py-2 rounded-md text-sm transition-all flex items-center justify-center gap-1.5 ${
              viewMode === "daily" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            {activeTab === "ewa" ? "Theo kỳ" : "Theo ngày"}
          </button>
        </div>

        {/* History List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + viewMode}
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
                            ? activeTab === "ewa" ? "Tất toán sớm từ V-Smart Pay" : "Thanh toán trước"
                            : activeTab === "ewa"
                              ? viewMode === "detail" ? "Khấu trừ cuối kỳ lương" : "Khấu trừ cuối kỳ"
                              : viewMode === "detail" ? "Trích doanh thu cuốc xe" : "Trích doanh thu trong ngày"}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {viewMode === "detail" ? formatDateTime(item.date) : formatDate(item.date)}
                        </p>
                      </div>
                      <p className="text-lg text-primary whitespace-nowrap">-{formatCurrency(item.amount)}</p>
                    </div>

                    {/* EWA — note field */}
                    {activeTab === "ewa" && "note" in item && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-muted-foreground">{(item as any).note}</p>
                        </div>
                      </div>
                    )}

                    {/* RBF — per-trip detail */}
                    {activeTab === "rbf" && item.type === "auto" && viewMode === "detail" && "tripId" in item && item.tripId && (
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Mã chuyến:</span>
                          <span className="font-mono">{item.tripId}</span>
                        </div>
                        {"tripRevenue" in item && (item as any).tripRevenue > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Doanh thu cuốc:</span>
                            <span className="text-primary">{formatCurrency((item as any).tripRevenue)}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tỷ lệ trích:</span>
                          <span>{"revenueRate" in item ? Math.round((item as any).revenueRate * 100) : 20}%</span>
                        </div>
                        {"from" in item && (item as any).from && (
                          <>
                            <div className="h-px bg-border/60" />
                            <div className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <div className="flex-1 space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Điểm đón:</span>
                                  <span className="text-right">{(item as any).from}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Điểm đến:</span>
                                  <span className="text-right">{(item as any).to}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* RBF — daily view */}
                    {activeTab === "rbf" && item.type === "auto" && viewMode === "daily" && "dayLabel" in item && (
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                        {"tripCount" in item && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Số cuốc trong ngày:</span>
                            <span>{(item as any).tripCount} cuốc</span>
                          </div>
                        )}
                        {"tripRevenue" in item && (item as any).tripRevenue > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tổng doanh thu ngày:</span>
                            <span className="text-primary">{formatCurrency((item as any).tripRevenue)}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tỷ lệ trích:</span>
                          <span>{"revenueRate" in item ? Math.round((item as any).revenueRate * 100) : 20}%</span>
                        </div>
                      </div>
                    )}

                    {/* RBF manual */}
                    {activeTab === "rbf" && item.type === "manual" && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <p className="text-muted-foreground">Thanh toán trước từ V-Smart Pay</p>
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
