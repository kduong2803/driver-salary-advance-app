import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Percent, TrendingDown, AlertCircle, ChevronUp, ChevronDown, CheckCircle2, ArrowRight, Calendar, Flame, Clock, Building2, Wallet, Zap } from "lucide-react";

const AVG_DAILY_REVENUE = 1000000;

const TERM_RATES: Record<number, number> = {
  1: 0.025, 2: 0.028, 3: 0.030, 4: 0.033, 5: 0.035, 6: 0.038,
};

type DayStatus = "paid" | "wallet" | "missed" | "today" | "future";

const WEEK_DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function getMonthOffset(date: Date) {
  const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const TODAY = new Date("2026-04-14");

const ADVANCES = [
  {
    id: "1",
    amount: 15000000,
    status: "active" as const,
    createdAt: "2026-04-11T14:30:00",
    revenueRate: 0.2,
    paidAmount: 5000000,
    remainingAmount: 10000000,
    progress: 33,
    estimatedMonths: 3,
    streak: 3,
    todayTripDeducted: 140000,
    calendarPattern: ["paid", "paid", "paid"] as DayStatus[],
  },
  {
    id: "2",
    amount: 10000000,
    status: "active" as const,
    createdAt: "2026-03-20T09:00:00",
    revenueRate: 0.3,
    paidAmount: 6000000,
    remainingAmount: 4000000,
    progress: 60,
    estimatedMonths: 2,
    streak: 5,
    todayTripDeducted: 300000,
    calendarPattern: [
      "paid","paid","missed","paid","wallet","paid","paid",
      "paid","missed","paid","wallet","paid","paid","paid",
      "paid","paid","wallet","missed","paid","paid","paid",
      "paid","wallet","paid","paid","missed",
    ] as DayStatus[],
  },
  {
    id: "3",
    amount: 12000000,
    status: "completed" as const,
    createdAt: "2026-02-01T10:00:00",
    revenueRate: 0.3,
    paidAmount: 12000000,
    remainingAmount: 0,
    progress: 100,
    estimatedMonths: 2,
    streak: 42,
    calendarPattern: [] as DayStatus[],
  },
];

const WALLET_BALANCE = 12000000;

export function RBFDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payStep, setPayStep] = useState<"closed" | "amount" | "verify" | "success">("closed");
  const [payAmount, setPayAmount] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const advance = ADVANCES.find((a) => a.id === id) || ADVANCES[0];
  const [walletSweep, setWalletSweep] = useState(true);
  const [currentRate, setCurrentRate] = useState(advance.revenueRate);
  const [pendingRate, setPendingRate] = useState(advance.revenueRate);

  const monthlyRate = TERM_RATES[advance.estimatedMonths] ?? 0.038;
  const totalInterest = Math.round(advance.amount * monthlyRate * advance.estimatedMonths);
  const interestPct = (totalInterest / advance.amount * 100).toFixed(1);
  const totalRepay = advance.amount + totalInterest;
  const estimatedDaysRemaining = Math.ceil(advance.remainingAmount / (AVG_DAILY_REVENUE * pendingRate));
  const estimatedMonthsRemaining = Math.min(6, Math.max(1, Math.ceil(estimatedDaysRemaining / 30)));

  const todayDailyTarget = Math.round(AVG_DAILY_REVENUE * advance.revenueRate);
  const todayTripDeducted = (advance as any).todayTripDeducted ?? 0;
  const todayRemaining = Math.max(0, todayDailyTarget - todayTripDeducted);

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const adjustPendingRate = (delta: number) => {
    const newRate = Math.round((pendingRate + delta) * 100) / 100;
    if (newRate >= advance.revenueRate && newRate <= 0.5) setPendingRate(newRate);
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
              <span>Kỳ hạn ~{advance.estimatedMonths} tháng</span>
            </div>
          </div>
        </motion.div>

        {/* Today's status */}
        {advance.status === "active" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3>Trạng thái hôm nay</h3>
              <span className="ml-auto text-xs text-muted-foreground">14/04/2026</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-muted-foreground">Từ doanh thu chuyến xe</span>
                </div>
                <span className="text-teal-600">{formatCurrency(todayTripDeducted)}</span>
              </div>

              <div className={`flex justify-between items-center transition-opacity ${walletSweep ? "" : "opacity-40"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-cyan-600" />
                  </div>
                  <span className="text-muted-foreground">Dự kiến thanh toán từ ví V-SmartPay</span>
                </div>
                <span className="text-cyan-600">{walletSweep ? formatCurrency(todayRemaining) : "—"}</span>
              </div>

              <div className="flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2.5 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Wallet className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-medium">Tự động quét ví V-SmartPay</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {walletSweep ? "Bật — số tiền còn thiếu trong ngày sẽ được tự động thanh toán vào 23h55" : "Bật ngay để tránh trễ hạn dư nợ"}
                  </p>
                </div>
                <button
                  onClick={() => setWalletSweep(!walletSweep)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${walletSweep ? "bg-primary" : "bg-muted-foreground/30"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${walletSweep ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="h-px bg-border" />
              <div className="flex justify-between items-center font-medium">
                <span>Dư nợ hôm nay</span>
                <span className="text-primary">{formatCurrency(todayDailyTarget)}</span>
              </div>
            </div>

            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.round(todayTripDeducted / todayDailyTarget * 100))}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {Math.round(todayTripDeducted / todayDailyTarget * 100)}% đã trích từ chuyến xe
              {walletSweep && todayRemaining > 0 && ` — phần còn lại sẽ được tự động trả từ ví lúc 23h55`}
            </p>
          </motion.div>
        )}

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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
              <span className="text-muted-foreground">Tỷ lệ trích mỗi chuyến:</span>
              <span>{Math.round(advance.revenueRate * 100)}% doanh thu</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lãi suất:</span>
              <span>{(monthlyRate * 100).toFixed(1)}%/tháng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tổng lãi ({interestPct}%):</span>
              <span className="text-destructive">+{formatCurrency(totalInterest)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tổng hoàn trả:</span>
              <span className="text-primary">{formatCurrency(totalRepay)}</span>
            </div>
          </div>
        </motion.div>

        {/* Streak Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3>Lịch trích hoàn trả</h3>
            </div>
            {advance.status !== "completed" && (
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">{advance.streak} ngày liên tiếp</span>
              </div>
            )}
          </div>

          {/* Period summary */}
          {advance.status !== "completed" && (() => {
            const createdDate = new Date(advance.createdAt);
            const daysSince = Math.floor((TODAY.getTime() - createdDate.getTime()) / 86400000);
            const periodIndex = Math.floor(daysSince / 30);
            const periodNum = periodIndex + 1;
            const periodStart = new Date(createdDate.getTime() + periodIndex * 30 * 86400000);
            const periodEnd = new Date(periodStart.getTime() + 29 * 86400000);
            const daysElapsed = Math.min(Math.floor((TODAY.getTime() - periodStart.getTime()) / 86400000) + 1, 30);
            // Ước tính trích trong kỳ = daysElapsed × (doanh thu tb × tỷ lệ trích)
            const dailyDeduction = Math.round(AVG_DAILY_REVENUE * advance.revenueRate);
            const monthlyTarget = dailyDeduction * 30;
            const paidThisPeriod = Math.min(daysElapsed * dailyDeduction, advance.paidAmount);
            const remainingThisPeriod = Math.max(0, monthlyTarget - paidThisPeriod);
            const paidPct = Math.min(100, Math.round((paidThisPeriod / monthlyTarget) * 100));
            const fmtDate = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
            return (
              <div className="bg-muted/30 rounded-xl p-4 mb-4 border border-border/40">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium">Kỳ {periodNum}</p>
                  <p className="text-xs text-muted-foreground">{fmtDate(periodStart)} – {fmtDate(periodEnd)}/{periodEnd.getFullYear()}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Phải trích</p>
                    <p className="text-sm font-medium">{formatCurrency(monthlyTarget)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Đã trích</p>
                    <p className="text-sm font-medium text-primary">{formatCurrency(paidThisPeriod)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Còn lại</p>
                    <p className="text-sm font-medium text-amber-600">{formatCurrency(remainingThisPeriod)}</p>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${paidPct}%` }} />
                </div>
                <button
                  onClick={() => { setPayAmount(String(remainingThisPeriod)); setPin(["","","","","",""]); setPinError(false); setPayStep("amount"); }}
                  className="w-full bg-primary text-white py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  Thanh toán kỳ {periodNum} — còn {formatCurrency(remainingThisPeriod)}
                </button>
              </div>
            );
          })()}

          <p className="text-xs text-muted-foreground text-center mb-3">
            Tháng {TODAY.getMonth() + 1}/{TODAY.getFullYear()}
          </p>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground/60 py-0.5">{d}</div>
            ))}
          </div>

          {(() => {
            const todayDate = TODAY.getDate();
            const daysInMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0).getDate();
            const offset = getMonthOffset(TODAY);
            const createdDate = new Date(advance.createdAt);
            const startOfMonth = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
            const daysSinceCreated = Math.floor((startOfMonth.getTime() - createdDate.getTime()) / 86400000);

            return (
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const patternIdx = daysSinceCreated + i;
                  const beforeCreation = new Date(TODAY.getFullYear(), TODAY.getMonth(), day) < new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
                  const status: DayStatus =
                    beforeCreation ? "future"
                    : day < todayDate ? (advance.calendarPattern[patternIdx] || "paid")
                    : day === todayDate ? "today"
                    : "future";

                  return (
                    <div key={day} className="flex flex-col items-center gap-0.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        status === "paid" ? "bg-teal-100"
                        : status === "wallet" ? "bg-cyan-100"
                        : status === "missed" ? "bg-red-100"
                        : status === "today" ? "bg-amber-100 border-2 border-amber-400"
                        : "bg-muted/30"
                      }`}>
                        {status === "paid" && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
                        {status === "wallet" && <Zap className="w-3.5 h-3.5 text-cyan-600" />}
                        {status === "missed" && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                        {status === "today" && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                        {status === "future" && <span className="text-xs text-muted-foreground/30">{day}</span>}
                      </div>
                      {status !== "future" && (
                        <span className="text-xs text-muted-foreground">{day}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-teal-100 rounded-full" /><span>Đã trích</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-cyan-100 rounded-full" /><span>Từ ví</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 rounded-full" /><span>Thiếu — gộp hôm sau</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-100 border border-amber-400 rounded-full" /><span>Hôm nay</span></div>
          </div>
        </motion.div>

        {/* Rate Adjustment Card */}
        {advance.status === "active" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Percent className="w-5 h-5 text-primary" />
              <h3>Điều chỉnh tỷ lệ trích doanh thu</h3>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Đang áp dụng: <span className="text-foreground font-medium">{Math.round(currentRate * 100)}%/chuyến</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">Tăng mức trích để hoàn trả sớm hơn và giảm phí</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustPendingRate(-0.05)}
                  disabled={pendingRate <= advance.revenueRate}
                  className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center disabled:opacity-30 hover:border-primary transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <span className={`text-2xl font-semibold w-14 text-center ${pendingRate !== currentRate ? "text-amber-500" : "text-primary"}`}>
                  {Math.round(pendingRate * 100)}%
                </span>
                <button
                  onClick={() => adjustPendingRate(0.05)}
                  disabled={pendingRate >= 0.5}
                  className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center disabled:opacity-30 hover:border-primary transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-3 flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Kỳ hạn còn lại ước tính:</span>
              <span className="text-primary font-medium">~{estimatedMonthsRemaining} tháng ({estimatedDaysRemaining} ngày)</span>
            </div>

            {pendingRate !== currentRate && (
              <button
                onClick={() => setCurrentRate(pendingRate)}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-sm hover:bg-primary/90 transition-colors"
              >
                Xác nhận thay đổi — áp dụng {Math.round(pendingRate * 100)}%
              </button>
            )}
          </motion.div>
        )}

        {/* Actions */}
        {advance.status === "active" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <button
              onClick={() => { setPayAmount(""); setPin(["","","","","",""]); setPinError(false); setPayStep("amount"); }}
              className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Trả trước từ V-Smart Pay
            </button>
          </motion.div>
        )}
      </div>

      {/* Pay Early Modal */}
      <AnimatePresence>
        {payStep !== "closed" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={() => payStep !== "success" && setPayStep("closed")}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card w-full max-w-lg rounded-t-3xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />

              {payStep === "amount" && (() => {
                const numPayAmount = parseInt(payAmount.replace(/\D/g, "")) || 0;
                const isValid = numPayAmount >= 100000 && numPayAmount <= Math.min(advance.remainingAmount, WALLET_BALANCE);
                return (
                  <>
                    <h3 className="text-xl mb-1">Trả trước từ V-Smart Pay</h3>
                    <p className="text-sm text-muted-foreground mb-5">Chọn số tiền muốn trả — tối thiểu 100.000đ</p>
                    <div className="bg-muted/50 rounded-xl p-4 mb-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số dư V-Smart Pay:</span>
                        <span>{formatCurrency(WALLET_BALANCE)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Còn phải hoàn trả:</span>
                        <span className="text-primary">{formatCurrency(advance.remainingAmount)}</span>
                      </div>
                    </div>
                    <input
                      type="text" inputMode="numeric" placeholder="Nhập số tiền"
                      value={numPayAmount > 0 ? numPayAmount.toLocaleString("vi-VN") : ""}
                      onChange={(e) => setPayAmount(e.target.value.replace(/\D/g, ""))}
                      className="w-full border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary mb-3"
                    />
                    <div className="flex gap-2 mb-5">
                      {[1000000, 2000000, 5000000].map((amt) => (
                        <button key={amt} onClick={() => setPayAmount(String(amt))} className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-primary hover:text-primary transition-colors">
                          {amt / 1000000}tr
                        </button>
                      ))}
                      <button onClick={() => setPayAmount(String(Math.min(advance.remainingAmount, WALLET_BALANCE)))} className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-primary hover:text-primary transition-colors">
                        Tất toán
                      </button>
                    </div>
                    <div className="bg-primary/10 rounded-xl p-4 mb-5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">Trả trước không phát sinh thêm phí. Tất toán toàn bộ, hạn mức phục hồi ngay.</p>
                    </div>
                    <button disabled={!isValid} onClick={() => setPayStep("verify")} className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 mb-3">
                      Xác nhận trả {numPayAmount > 0 ? formatCurrency(numPayAmount) : ""}
                    </button>
                    <button onClick={() => setPayStep("closed")} className="w-full py-3 text-muted-foreground">Hủy bỏ</button>
                  </>
                );
              })()}

              {payStep === "verify" && (
                <>
                  <h3 className="text-xl mb-1">Xác thực giao dịch</h3>
                  <p className="text-sm text-muted-foreground mb-6">Nhập mã PIN V-Smart Pay để xác nhận</p>
                  <div className="flex justify-center gap-3 mb-3">
                    {pin.map((digit, i) => (
                      <input key={i} ref={(el) => { pinRefs.current[i] = el; }}
                        type="password" inputMode="numeric" maxLength={1} value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, ""); if (!val) return;
                          const next = [...pin]; next[i] = val; setPin(next); setPinError(false);
                          if (i < 5) pinRefs.current[i + 1]?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            const next = [...pin];
                            if (pin[i]) { next[i] = ""; setPin(next); }
                            else if (i > 0) { next[i - 1] = ""; setPin(next); pinRefs.current[i - 1]?.focus(); }
                          }
                        }}
                        className={`w-12 h-14 text-center text-xl border-2 rounded-xl focus:outline-none transition-colors ${pinError ? "border-destructive" : digit ? "border-primary" : "border-border"}`}
                      />
                    ))}
                  </div>
                  {pinError && <p className="text-center text-sm text-destructive mb-3">Mã PIN không đúng. Vui lòng thử lại.</p>}
                  <p className="text-center text-xs text-muted-foreground mb-6">Trả {formatCurrency(parseInt(payAmount) || 0)} từ V-Smart Pay</p>
                  <button
                    onClick={() => {
                      if (pin.join("").length < 6) return;
                      setPayStep("success");
                    }}
                    disabled={pin.join("").length < 6}
                    className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 mb-3"
                  >
                    Xác nhận
                  </button>
                  <button onClick={() => setPayStep("amount")} className="w-full py-3 text-muted-foreground">Quay lại</button>
                </>
              )}

              {payStep === "success" && (
                <div className="text-center py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-xl mb-1 text-primary">Thanh toán thành công</h3>
                  <p className="text-sm text-muted-foreground mb-2">Đã trả {formatCurrency(parseInt(payAmount) || 0)} từ V-Smart Pay</p>
                  <p className="text-xs text-muted-foreground mb-8">Khoản ứng của bạn đã được cập nhật</p>
                  <button onClick={() => navigate("/manage")} className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3">
                    <span>Về trang quản lý</span><ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={() => setPayStep("closed")} className="w-full py-3 text-muted-foreground">Ở lại trang này</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
