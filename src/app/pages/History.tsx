import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingDown, Calendar, Wallet, Building2, MapPin, Clock } from "lucide-react";

export function History() {
  const [activeTab, setActiveTab] = useState<"ewa" | "rbf">("ewa");

  const ewaHistory = [
    {
      id: "1",
      date: "2026-04-15T14:30:00",
      amount: 1500000,
      type: "auto" as const,
      tripId: "T001234",
      tripRevenue: 8500000,
      from: "Quận 1, TP.HCM",
      to: "Quận 7, TP.HCM",
      advanceId: "EWA001",
    },
    {
      id: "2",
      date: "2026-04-14T10:15:00",
      amount: 800000,
      type: "auto" as const,
      tripId: "T001233",
      tripRevenue: 4200000,
      from: "Tân Bình, TP.HCM",
      to: "Bình Thạnh, TP.HCM",
      advanceId: "EWA001",
    },
    {
      id: "3",
      date: "2026-04-13T16:45:00",
      amount: 700000,
      type: "manual" as const,
      advanceId: "EWA001",
    },
  ];

  const rbfHistory = [
    {
      id: "1",
      date: "2026-04-15T14:30:00",
      amount: 1200000,
      type: "auto" as const,
      tripId: "T005678",
      tripRevenue: 12000000,
      from: "Quận 1, TP.HCM",
      to: "Quận 7, TP.HCM",
      driverId: "D123",
      driverName: "Nguyễn Văn A",
      advanceId: "RBF001",
      revenueRate: 0.1,
    },
    {
      id: "2",
      date: "2026-04-14T09:20:00",
      amount: 800000,
      type: "auto" as const,
      tripId: "T005677",
      tripRevenue: 8000000,
      from: "Tân Bình, TP.HCM",
      to: "Thủ Đức, TP.HCM",
      driverId: "D124",
      driverName: "Trần Văn B",
      advanceId: "RBF001",
      revenueRate: 0.1,
    },
    {
      id: "3",
      date: "2026-04-14T11:50:00",
      amount: 1500000,
      type: "auto" as const,
      tripId: "T005676",
      tripRevenue: 15000000,
      from: "Quận 3, TP.HCM",
      to: "Bình Dương",
      driverId: "D125",
      driverName: "Lê Văn C",
      advanceId: "RBF001",
      revenueRate: 0.1,
    },
    {
      id: "4",
      date: "2026-04-13T15:00:00",
      amount: 2000000,
      type: "manual" as const,
      advanceId: "RBF001",
    },
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
                            : activeTab === "ewa" ? "Khấu trừ tự động từ thu nhập cuốc xe" : "Trích tự động từ doanh thu fleet"}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {formatDateTime(item.date)}
                        </p>
                      </div>
                      <p className="text-lg text-primary whitespace-nowrap">-{formatCurrency(item.amount)}</p>
                    </div>

                    {/* Trip Details */}
                    {item.type === "auto" && "tripId" in item && (
                      <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Mã chuyến:</span>
                          <span className="font-mono">{item.tripId}</span>
                        </div>

                        {activeTab === "rbf" && "driverName" in item && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tài xế:</span>
                            <span>{item.driverName} ({item.driverId})</span>
                          </div>
                        )}

                        {item.tripRevenue && (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                {activeTab === "ewa" ? "Thu nhập phát sinh:" : "Doanh thu chuyến:"}
                              </span>
                              <span className="text-primary">{formatCurrency(item.tripRevenue)}</span>
                            </div>

                            {activeTab === "rbf" && "revenueRate" in item && (
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tỷ lệ trích:</span>
                                <span>{item.revenueRate * 100}%</span>
                              </div>
                            )}
                          </>
                        )}

                        {item.from && item.to && (
                          <div className="pt-2 border-t border-border space-y-1.5">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Điểm đón</p>
                                <p>{item.from}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Điểm đến</p>
                                <p>{item.to}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Manual Payment Note */}
                    {item.type === "manual" && (
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <p className="text-muted-foreground">
                          {activeTab === "ewa" ? "Tất toán sớm khoản ứng từ ví VSP" : "Thanh toán trước hạn từ ví VSP"}
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
