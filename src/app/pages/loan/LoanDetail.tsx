import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft,  Calendar, CheckCircle2, Clock, AlertCircle, Wifi, MapPin, ArrowRight, Flame, Wallet, Zap } from "lucide-react";
import { MotorbikeIcon } from "../../components/MotorbikeIcon";

type DayStatus = "trip" | "wallet" | "missed" | "today" | "future";

const LOANS = [
  {
    id: "1",
    vehicleName: "VinFast Klara S",
    vehicleType: "Xe máy điện",
    loanAmount: 30000000,
    downPayment: 2900000,
    termMonths: 36,
    monthlyRate: 0.008,
    totalRepay: 38640000,
    dailyPayment: 35778,
    paidAmount: 3220020,
    remainingAmount: 35419980,
    progress: 25,
    status: "active" as const,
    createdAt: "2026-01-11",
    licensePlate: "51B-123.45",
    streak: 8,
    todayTripPaid: 28000,
    missedYesterday: false,
    rolledOver: 0,
    calendarPattern: ["trip","trip","wallet","trip","trip","missed","trip","trip","trip","trip","trip","wallet","trip"] as DayStatus[],
  },
  {
    id: "2",
    vehicleName: "VinFast Feliz S",
    vehicleType: "Xe máy điện",
    loanAmount: 24900000,
    downPayment: 0,
    termMonths: 24,
    monthlyRate: 0.008,
    totalRepay: 29680800,
    dailyPayment: 41224,
    paidAmount: 14840640,
    remainingAmount: 14840160,
    progress: 50,
    status: "active" as const,
    createdAt: "2025-04-14",
    licensePlate: "51B-678.90",
    streak: 0,
    todayTripPaid: 12000,
    missedYesterday: true,
    rolledOver: 41224,
    calendarPattern: ["trip","trip","trip","wallet","trip","trip","trip","trip","wallet","trip","trip","trip","missed"] as DayStatus[],
  },
  {
    id: "3",
    vehicleName: "VinFast Evo200",
    vehicleType: "Xe máy điện",
    loanAmount: 19900000,
    downPayment: 0,
    termMonths: 24,
    monthlyRate: 0.008,
    totalRepay: 23720800,
    dailyPayment: 32945,
    paidAmount: 23720800,
    remainingAmount: 0,
    progress: 100,
    status: "completed" as const,
    createdAt: "2024-04-14",
    licensePlate: "51B-999.99",
    streak: 720,
    todayTripPaid: 0,
    missedYesterday: false,
    rolledOver: 0,
    calendarPattern: ["trip","trip","trip","trip","trip","trip","trip","trip","trip","trip","trip","trip","trip","trip"] as DayStatus[],
  },
];

const WALLET_BALANCE = 12000000;
const TODAY = new Date("2026-04-14");

const WEEK_DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function getMonthOffset(date: Date) {
  const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return day === 0 ? 6 : day - 1; // Mon=0 … Sun=6
}

const DAY_CONFIG: Record<DayStatus, { bg: string; icon?: string; label: string }> = {
  trip: { bg: "bg-teal-100", label: "Cuốc xe" },
  wallet: { bg: "bg-cyan-100", label: "Ví VSP" },
  missed: { bg: "bg-red-100", label: "Thiếu" },
  today: { bg: "bg-amber-100 border-2 border-amber-400", label: "Hôm nay" },
  future: { bg: "bg-muted", label: "" },
};

export function LoanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = LOANS.find((l) => l.id === id) || LOANS[0];

  const [payStep, setPayStep] = useState<"closed" | "amount" | "verify" | "success">("closed");
  const [payAmount, setPayAmount] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [walletSweep, setWalletSweep] = useState(true);

  const totalInterest = Math.round(loan.loanAmount * loan.monthlyRate * loan.termMonths);
  const feePercent = ((totalInterest / loan.loanAmount) * 100).toFixed(1);
  const todayTotal = loan.rolledOver > 0 ? loan.dailyPayment + loan.rolledOver : loan.dailyPayment;
  const todayRemaining = Math.max(0, todayTotal - loan.todayTripPaid);

  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";
  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Chi tiết khoản vay</h1>
        <p className="text-white/80">Mã: #{loan.id}</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">

        {/* Progress card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-start gap-3 mb-5">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MotorbikeIcon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-white/80 text-sm">{loan.vehicleType}</p>
              <p className="text-xl">{loan.vehicleName}</p>
              <p className="text-white/60 text-xs font-mono">{loan.licensePlate}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-0.5">Còn phải trả</p>
              <p className="text-2xl">{formatCurrency(loan.remainingAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-0.5">Đã trả</p>
              <p className="text-lg">{formatCurrency(loan.paidAmount)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${loan.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="flex justify-between text-sm text-white/80">
              <span>{loan.progress}% đã trả</span>
              <span>{loan.termMonths} tháng</span>
            </div>
          </div>
        </motion.div>

        {/* Missed yesterday warning */}
        {loan.missedYesterday && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-700">Hôm qua chưa đủ tiền trả góp</p>
              <p className="text-sm text-red-600 mt-0.5">
                {formatCurrency(loan.rolledOver)} đã được gộp vào hôm nay — tổng cần trả hôm nay:{" "}
                <span className="font-medium">{formatCurrency(todayTotal)}</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Today's repayment status */}
        {loan.status === "active" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-teal-600" />
              <h3>Trạng thái hôm nay</h3>
              <span className="ml-auto text-xs text-muted-foreground">14/04/2026</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-teal-100 rounded-lg flex items-center justify-center">
                    <MotorbikeIcon className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-muted-foreground">Thu từ cuốc xe</span>
                </div>
                <span className="text-teal-600">{formatCurrency(loan.todayTripPaid)}</span>
              </div>

              <div className={`flex justify-between items-center transition-opacity ${walletSweep ? "" : "opacity-40"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-cyan-600" />
                  </div>
                  <span className="text-muted-foreground">Còn lại dự kiến thanh toán từ ví</span>
                </div>
                <span className="text-cyan-600">{walletSweep ? formatCurrency(todayRemaining) : "Đã tắt"}</span>
              </div>

              {/* Wallet sweep toggle */}
              <div className="flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2.5">
                <div>
                  <p className="text-xs font-medium">Tự động quét ví</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {walletSweep ? "Bật — sẽ tự trừ phần còn thiếu từ ví" : "Tắt - mở Tự động quét để tránh trễ hạn"}
                  </p>
                </div>
                <button
                  onClick={() => setWalletSweep(!walletSweep)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${walletSweep ? "bg-teal-500" : "bg-muted-foreground/30"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${walletSweep ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>

              <div className="h-px bg-border" />
              <div className="flex justify-between items-center font-medium">
                <span>Cần trả hôm nay</span>
                <span className="text-teal-700">{formatCurrency(todayTotal)}</span>
              </div>
            </div>

            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (loan.todayTripPaid / todayTotal) * 100)}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full bg-teal-500 rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              {Math.round((loan.todayTripPaid / todayTotal) * 100)}% thu từ cuốc xe
              {walletSweep && " — phần còn lại tự động từ ví"}
            </p>
          </motion.div>
        )}

        {/* Streak calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <h3>Lịch trả góp</h3>
            </div>
            {loan.status !== "completed" && (
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">{loan.streak} ngày liên tiếp</span>
              </div>
            )}
          </div>

          {/* Month label */}
          <p className="text-xs text-muted-foreground text-center mb-3">
            Tháng {TODAY.getMonth() + 1}/{TODAY.getFullYear()}
          </p>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-muted-foreground/60 py-0.5">{d}</div>
            ))}
          </div>

          {/* Full month grid */}
          {(() => {
            const todayDate = TODAY.getDate();
            const daysInMonth = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0).getDate();
            const offset = getMonthOffset(TODAY);
            return (
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const status: DayStatus =
                    day < todayDate ? (loan.calendarPattern[day - 1] || "trip")
                    : day === todayDate ? "today"
                    : "future";
                  return (
                    <div key={day} className="flex flex-col items-center gap-0.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        status === "future" ? "bg-muted/30" : DAY_CONFIG[status].bg
                      }`}>
                        {status === "trip" && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
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
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-teal-100 rounded-full" /><span>Từ cuốc xe</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-cyan-100 rounded-full" /><span>Từ ví</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 rounded-full" /><span>Thiếu — gộp hôm sau</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-100 border border-amber-400 rounded-full" /><span>Hôm nay</span></div>
          </div>
        </motion.div>

        {/* Loan info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <MotorbikeIcon className="w-5 h-5 text-teal-600" />
            <h3>Thông tin khoản vay</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ngày mua xe:</span>
              <span>{formatDate(loan.createdAt)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền vay:</span>
              <span>{formatCurrency(loan.loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lãi suất:</span>
              <span>{(loan.monthlyRate * 100).toFixed(1)}%/tháng</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tổng lãi ({feePercent}%):</span>
              <span className="text-destructive">+{formatCurrency(totalInterest)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tổng phải trả:</span>
              <span className="text-teal-700">{formatCurrency(loan.totalRepay)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Góp mỗi ngày:</span>
              <span className="text-teal-700">{formatCurrency(loan.dailyPayment)}</span>
            </div>
          </div>
        </motion.div>

        {/* Vehicle IoT Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-teal-600" />
              <h3>Trạng thái phương tiện</h3>
            </div>
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              Đang kết nối
            </span>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Vị trí hiện tại</span>
              </div>
              <span>Quận 7, TP.HCM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Biển số</span>
              <span className="font-mono">{loan.licensePlate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trạng thái khóa</span>
              <span className="text-teal-600">Đang mở khóa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cập nhật lúc</span>
              <span>14/04/2026 22:45</span>
            </div>
          </div>
        </motion.div>

        {/* Action */}
        {loan.status === "active" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button
              onClick={() => { setPayAmount(""); setPin(["", "", "", "", "", ""]); setPinError(false); setPayStep("amount"); }}
              className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Tất toán sớm từ V-Smart Pay
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
                const numPay = parseInt(payAmount.replace(/\D/g, "")) || 0;
                const isValid = numPay >= 100000 && numPay <= Math.min(loan.remainingAmount, WALLET_BALANCE);
                return (
                  <>
                    <h3 className="text-xl mb-1">Tất toán sớm</h3>
                    <p className="text-sm text-muted-foreground mb-5">Chọn số tiền muốn trả trước</p>
                    <div className="bg-muted/50 rounded-xl p-4 mb-4 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Số dư V-Smart Pay:</span><span>{formatCurrency(WALLET_BALANCE)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Còn phải trả:</span><span className="text-teal-700">{formatCurrency(loan.remainingAmount)}</span></div>
                    </div>
                    <input
                      type="text" inputMode="numeric" placeholder="Nhập số tiền"
                      value={parseInt(payAmount.replace(/\D/g, "")) > 0 ? parseInt(payAmount.replace(/\D/g, "")).toLocaleString("vi-VN") : ""}
                      onChange={(e) => setPayAmount(e.target.value.replace(/\D/g, ""))}
                      className="w-full border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-teal-500 mb-3"
                    />
                    <div className="flex gap-2 mb-5">
                      {[1000000, 3000000, 5000000].map((amt) => (
                        <button key={amt} onClick={() => setPayAmount(String(amt))} className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-teal-500 hover:text-teal-700 transition-colors">{amt / 1000000}tr</button>
                      ))}
                      <button onClick={() => setPayAmount(String(Math.min(loan.remainingAmount, WALLET_BALANCE)))} className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-teal-500 hover:text-teal-700 transition-colors">Tất toán</button>
                    </div>
                    <div className="bg-teal-50 rounded-xl p-4 mb-5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">Trả hết sớm không tính thêm phí. Khoản vay sẽ được đóng ngay sau khi thanh toán.</p>
                    </div>
                    <button disabled={!isValid} onClick={() => setPayStep("verify")} className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-40 mb-3">
                      Xác nhận trả {parseInt(payAmount.replace(/\D/g, "")) > 0 ? formatCurrency(parseInt(payAmount.replace(/\D/g, ""))) : ""}
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
                        className={`w-12 h-14 text-center text-xl border-2 rounded-xl focus:outline-none transition-colors ${pinError ? "border-destructive" : digit ? "border-teal-500" : "border-border"}`}
                      />
                    ))}
                  </div>
                  {pinError && <p className="text-center text-sm text-destructive mb-3">Mã PIN không đúng. Vui lòng thử lại.</p>}
                  <p className="text-center text-xs text-muted-foreground mb-6">Trả {formatCurrency(parseInt(payAmount.replace(/\D/g, "")) || 0)} từ V-Smart Pay</p>
                  <button onClick={() => {
                    if (pin.join("").length < 6) return;
                    if (pin.join("") === "123456") { setPayStep("success"); }
                    else { setPinError(true); setPin(["", "", "", "", "", ""]); pinRefs.current[0]?.focus(); }
                  }} disabled={pin.join("").length < 6} className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-40 mb-3">Xác nhận</button>
                  <button onClick={() => setPayStep("amount")} className="w-full py-3 text-muted-foreground">Quay lại</button>
                </>
              )}

              {payStep === "success" && (
                <div className="text-center py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }} className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12 text-teal-600" />
                  </motion.div>
                  <h3 className="text-xl mb-1 text-teal-700">Thanh toán thành công</h3>
                  <p className="text-sm text-muted-foreground mb-2">Đã trả {formatCurrency(parseInt(payAmount.replace(/\D/g, "")) || 0)} từ V-Smart Pay</p>
                  <p className="text-xs text-muted-foreground mb-8">Khoản vay của bạn đã được cập nhật</p>
                  <button onClick={() => navigate("/manage")} className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 mb-3">
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
