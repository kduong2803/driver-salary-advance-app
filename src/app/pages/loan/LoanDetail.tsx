import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Car, Calendar, CheckCircle2, Clock, AlertCircle, Wifi, MapPin, ArrowRight } from "lucide-react";

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
  },
  {
    id: "2",
    vehicleName: "Selex Camel",
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
  },
];

const WALLET_BALANCE = 12000000;
const TODAY = new Date("2026-04-14");

function generateCalendar(paidDays: number) {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() - (13 - i));
    const isToday = i === 13;
    const isPast = i < 13;
    return {
      date: d,
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      isToday,
      isPaid: isPast && 13 - i <= paidDays,
    };
  });
}

export function LoanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const loan = LOANS.find((l) => l.id === id) || LOANS[0];

  const [payStep, setPayStep] = useState<"closed" | "amount" | "verify" | "success">("closed");
  const [payAmount, setPayAmount] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [pinError, setPinError] = useState(false);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const totalInterest = Math.round(loan.loanAmount * loan.monthlyRate * loan.termMonths);
  const feePercent = ((totalInterest / loan.loanAmount) * 100).toFixed(1);
  const calendar = generateCalendar(loan.status === "completed" ? 13 : 10);

  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";
  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-500 to-purple-700 text-white px-6 pt-12 pb-8">
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
          className="bg-gradient-to-br from-violet-500 to-purple-700 text-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-start gap-3 mb-5">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Car className="w-7 h-7" />
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
              <span>{loan.progress}% đã hoàn trả</span>
              <span>{loan.termMonths} tháng</span>
            </div>
          </div>
        </motion.div>

        {/* Loan info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-violet-600" />
            <h3>Thông tin khoản vay</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ngày giải ngân:</span>
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
              <span>Tổng hoàn trả:</span>
              <span className="text-violet-700">{formatCurrency(loan.totalRepay)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Góp mỗi ngày:</span>
              <span className="text-violet-700">{formatCurrency(loan.dailyPayment)}</span>
            </div>
          </div>
        </motion.div>

        {/* Repayment Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-violet-600" />
            <h3>Lịch trả góp gần đây</h3>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {calendar.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    day.isToday
                      ? "bg-amber-100 border-2 border-amber-400"
                      : day.isPaid
                      ? "bg-green-100"
                      : "bg-muted"
                  }`}
                >
                  {day.isToday ? (
                    <Clock className="w-4 h-4 text-amber-500" />
                  ) : day.isPaid ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <span className="text-xs text-muted-foreground">{day.date.getDate()}</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{day.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 rounded-full" />
              <span>Đã trả</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-100 border border-amber-400 rounded-full" />
              <span>Hôm nay</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <span>Sắp tới</span>
            </div>
          </div>
        </motion.div>

        {/* Vehicle IoT Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-violet-600" />
              <h3>Trạng thái phương tiện</h3>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
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
              <span className="text-green-600">Đang mở khóa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cập nhật lúc</span>
              <span>14/04/2026 22:45</span>
            </div>
          </div>
        </motion.div>

        {/* Action */}
        {loan.status === "active" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <button
              onClick={() => { setPayAmount(""); setPin(["", "", "", "", "", ""]); setPinError(false); setPayStep("amount"); }}
              className="w-full bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 transition-colors"
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
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Số dư V-Smart Pay:</span>
                        <span>{formatCurrency(WALLET_BALANCE)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Còn phải trả:</span>
                        <span className="text-violet-700">{formatCurrency(loan.remainingAmount)}</span>
                      </div>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Nhập số tiền"
                      value={numPay > 0 ? numPay.toLocaleString("vi-VN") : ""}
                      onChange={(e) => setPayAmount(e.target.value.replace(/\D/g, ""))}
                      className="w-full border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 mb-3"
                    />
                    <div className="flex gap-2 mb-5">
                      {[1000000, 3000000, 5000000].map((amt) => (
                        <button key={amt} onClick={() => setPayAmount(String(amt))} className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-violet-500 hover:text-violet-700 transition-colors">
                          {amt / 1000000}tr
                        </button>
                      ))}
                      <button onClick={() => setPayAmount(String(Math.min(loan.remainingAmount, WALLET_BALANCE)))} className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-violet-500 hover:text-violet-700 transition-colors">
                        Tất toán
                      </button>
                    </div>
                    <div className="bg-violet-50 rounded-xl p-4 mb-5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">Tất toán sớm không phát sinh phí phạt. Khoản vay sẽ được đóng ngay khi hoàn tất.</p>
                    </div>
                    <button disabled={!isValid} onClick={() => setPayStep("verify")} className="w-full bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-40 mb-3">
                      Xác nhận trả {numPay > 0 ? formatCurrency(numPay) : ""}
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
                      <input
                        key={i}
                        ref={(el) => { pinRefs.current[i] = el; }}
                        type="password"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (!val) return;
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
                        className={`w-12 h-14 text-center text-xl border-2 rounded-xl focus:outline-none transition-colors ${pinError ? "border-destructive" : digit ? "border-violet-500" : "border-border"}`}
                      />
                    ))}
                  </div>
                  {pinError && <p className="text-center text-sm text-destructive mb-3">Mã PIN không đúng. Vui lòng thử lại.</p>}
                  <p className="text-center text-xs text-muted-foreground mb-6">Trả {formatCurrency(parseInt(payAmount) || 0)} từ V-Smart Pay</p>
                  <button
                    onClick={() => {
                      if (pin.join("").length < 6) return;
                      if (pin.join("") === "123456") { setPayStep("success"); }
                      else { setPinError(true); setPin(["", "", "", "", "", ""]); pinRefs.current[0]?.focus(); }
                    }}
                    disabled={pin.join("").length < 6}
                    className="w-full bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-40 mb-3"
                  >
                    Xác nhận
                  </button>
                  <button onClick={() => setPayStep("amount")} className="w-full py-3 text-muted-foreground">Quay lại</button>
                </>
              )}

              {payStep === "success" && (
                <div className="text-center py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }} className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12 text-violet-600" />
                  </motion.div>
                  <h3 className="text-xl mb-1 text-violet-700">Thanh toán thành công</h3>
                  <p className="text-sm text-muted-foreground mb-2">Đã trả {formatCurrency(parseInt(payAmount) || 0)} từ V-Smart Pay</p>
                  <p className="text-xs text-muted-foreground mb-8">Khoản vay của bạn đã được cập nhật</p>
                  <button onClick={() => navigate("/manage")} className="w-full bg-violet-600 text-white py-4 rounded-xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 mb-3">
                    <span>Về trang quản lý</span>
                    <ArrowRight className="w-5 h-5" />
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
