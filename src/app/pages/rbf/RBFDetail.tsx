import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Percent, TrendingUp, TrendingDown, History, AlertCircle, ChevronUp, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

const DAILY_RATE = 0.36 / 365;
const AVG_DAILY_REVENUE = 1000000;

const ADVANCES = [
  { id: "1", amount: 15000000, status: "active" as const, createdAt: "2026-04-11T14:30:00", revenueRate: 0.2, paidAmount: 5000000, remainingAmount: 10000000, progress: 33 },
  { id: "2", amount: 10000000, status: "active" as const, createdAt: "2026-03-20T09:00:00", revenueRate: 0.3, paidAmount: 6000000, remainingAmount: 4000000, progress: 60 },
  { id: "3", amount: 12000000, status: "completed" as const, createdAt: "2026-02-01T10:00:00", revenueRate: 0.3, paidAmount: 12000000, remainingAmount: 0, progress: 100 },
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

  const [currentRate, setCurrentRate] = useState(advance.revenueRate);
  const [pendingRate, setPendingRate] = useState(advance.revenueRate);

  const estimatedDays = Math.ceil(advance.amount / (AVG_DAILY_REVENUE * advance.revenueRate));
  const feeAmount = Math.round(advance.amount * DAILY_RATE * estimatedDays);
  const feePercent = (feeAmount / advance.amount * 100).toFixed(1);
  const totalRepay = advance.amount + feeAmount;
  const estimatedDaysRemaining = Math.ceil(advance.remainingAmount / (AVG_DAILY_REVENUE * pendingRate));

  const repaymentHistory = [
    { date: "2026-04-12T19:45:00", amount: Math.round(185000 * advance.revenueRate), tripRevenue: 185000, tripId: "T002145" },
    { date: "2026-04-12T16:20:00", amount: Math.round(210000 * advance.revenueRate), tripRevenue: 210000, tripId: "T002144" },
    { date: "2026-04-12T13:05:00", amount: Math.round(145000 * advance.revenueRate), tripRevenue: 145000, tripId: "T002143" },
    { date: "2026-04-11T20:10:00", amount: Math.round(230000 * advance.revenueRate), tripRevenue: 230000, tripId: "T002142" },
    { date: "2026-04-08T09:00:00", amount: 500000, type: "manual" as const, tripRevenue: null, tripId: null },
  ];

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const adjustPendingRate = (delta: number) => {
    const newRate = Math.round((pendingRate + delta) * 100) / 100;
    if (newRate >= advance.revenueRate && newRate <= 0.5) setPendingRate(newRate);
  };

  const confirmRateChange = () => {
    setCurrentRate(pendingRate);
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
              <span>{100 - advance.progress}% còn lại</span>
            </div>
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
              <span className="text-muted-foreground">Phí dịch vụ ({feePercent}%):</span>
              <span className="text-destructive">+{formatCurrency(feeAmount)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tổng hoàn trả:</span>
              <span className="text-primary">{formatCurrency(totalRepay)}</span>
            </div>
          </div>
        </motion.div>

        {/* Rate Adjustment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Percent className="w-5 h-5 text-primary" />
            <h3>Tỷ lệ trích doanh thu</h3>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Đang áp dụng: <span className="text-foreground font-medium">{Math.round(currentRate * 100)}%/chuyến</span></p>
              <p className="text-xs text-muted-foreground mt-0.5">Tăng mức khấu trừ để hoàn trả sớm hơn, nâng điểm tín dụng và tiếp cận khoản vay mới nhanh hơn</p>
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
            <span className="text-muted-foreground">Ước tính hoàn tất:</span>
            <span className="text-primary font-medium">~{estimatedDaysRemaining} ngày nữa</span>
          </div>

          {pendingRate !== currentRate && (
            <button
              onClick={confirmRateChange}
              className="w-full bg-primary text-white py-2.5 rounded-xl text-sm hover:bg-primary/90 transition-colors"
            >
              Xác nhận thay đổi — áp dụng {Math.round(pendingRate * 100)}%
            </button>
          )}
        </motion.div>

        {/* Repayment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-primary" />
            <h3>Lịch sử trích hoàn trả</h3>
          </div>

          <div className="space-y-3">
            {repaymentHistory.map((item, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-sm">{item.type === "manual" ? "Thanh toán trước hạn" : "Trích tự động từ doanh thu"}</p>
                      <p className="text-xs text-muted-foreground">{formatDateTime(item.date)}</p>
                    </div>
                    <p className="text-sm text-primary whitespace-nowrap">-{formatCurrency(item.amount)}</p>
                  </div>
                  {item.tripId && item.tripRevenue && (
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Mã chuyến: {item.tripId} • Doanh thu: {formatCurrency(item.tripRevenue)}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => { setPayAmount(""); setPin(["","","","","",""]); setPinError(false); setPayStep("amount"); }}
            className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Trả trước từ V-Smart Pay
          </button>
        </motion.div>
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

              {/* Step 1: Chọn số tiền */}
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

                    <div className="mb-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Nhập số tiền"
                        value={numPayAmount > 0 ? numPayAmount.toLocaleString("vi-VN") : ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "");
                          setPayAmount(raw);
                        }}
                        className="w-full border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="flex gap-2 mb-5">
                      {[1000000, 2000000, 5000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setPayAmount(String(amt))}
                          className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-primary hover:text-primary transition-colors"
                        >
                          {(amt / 1000000)}tr
                        </button>
                      ))}
                      <button
                        onClick={() => setPayAmount(String(Math.min(advance.remainingAmount, WALLET_BALANCE)))}
                        className="flex-1 py-2 rounded-lg border border-border text-sm hover:border-primary hover:text-primary transition-colors"
                      >
                        Tất toán
                      </button>
                    </div>

                    <div className="bg-primary/10 rounded-xl p-4 mb-5 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        Trả trước không phát sinh thêm phí. Nếu tất toán toàn bộ, hạn mức sẽ được phục hồi ngay sau khi hoàn tất.
                      </p>
                    </div>

                    <button
                      disabled={!isValid}
                      onClick={() => setPayStep("verify")}
                      className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 mb-3"
                    >
                      Xác nhận trả {numPayAmount > 0 ? formatCurrency(numPayAmount) : ""}
                    </button>
                    <button onClick={() => setPayStep("closed")} className="w-full py-3 text-muted-foreground">
                      Hủy bỏ
                    </button>
                  </>
                );
              })()}

              {/* Step 2: Xác thực PIN */}
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
                          const next = [...pin];
                          next[i] = val;
                          setPin(next);
                          setPinError(false);
                          if (i < 5) pinRefs.current[i + 1]?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            const next = [...pin];
                            if (pin[i]) {
                              next[i] = "";
                              setPin(next);
                            } else if (i > 0) {
                              next[i - 1] = "";
                              setPin(next);
                              pinRefs.current[i - 1]?.focus();
                            }
                          }
                        }}
                        className={`w-12 h-14 text-center text-xl border-2 rounded-xl focus:outline-none transition-colors ${pinError ? "border-destructive" : digit ? "border-primary" : "border-border"}`}
                      />
                    ))}
                  </div>

                  {pinError && (
                    <p className="text-center text-sm text-destructive mb-3">Mã PIN không đúng. Vui lòng thử lại.</p>
                  )}

                  <p className="text-center text-xs text-muted-foreground mb-6">Trả {formatCurrency(parseInt(payAmount) || 0)} từ V-Smart Pay</p>

                  <button
                    onClick={() => {
                      if (pin.join("").length < 6) return;
                      if (pin.join("") === "123456") {
                        setPayStep("success");
                      } else {
                        setPinError(true);
                        setPin(["", "", "", "", "", ""]);
                        pinRefs.current[0]?.focus();
                      }
                    }}
                    disabled={pin.join("").length < 6}
                    className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 mb-3"
                  >
                    Xác nhận
                  </button>
                  <button onClick={() => setPayStep("amount")} className="w-full py-3 text-muted-foreground">
                    Quay lại
                  </button>
                </>
              )}

              {/* Step 3: Thành công */}
              {payStep === "success" && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-xl mb-1 text-primary">Thanh toán thành công</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Đã trả {formatCurrency(parseInt(payAmount) || 0)} từ V-Smart Pay
                  </p>
                  <p className="text-xs text-muted-foreground mb-8">
                    Khoản ứng của bạn đã được cập nhật
                  </p>
                  <button
                    onClick={() => navigate("/manage")}
                    className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3"
                  >
                    <span>Về trang quản lý</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={() => setPayStep("closed")} className="w-full py-3 text-muted-foreground">
                    Ở lại trang này
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
