import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpCircle, CheckCircle2, Phone, Coins } from "lucide-react";
import { formatCurrency, useFinanceStore } from "../../data/financeStore";

const MIN_AMOUNT = 10000;

export function YieldWithdraw() {
  const navigate = useNavigate();
  const { state, withdrawYield } = useFinanceStore();
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [rawInput, setRawInput] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const amount = parseInt(rawInput.replace(/\D/g, "")) || 0;
  const isValid = amount >= MIN_AMOUNT && amount <= state.yieldBalance;

  const handleAmountChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    setRawInput(digits ? parseInt(digits).toLocaleString("vi-VN") : "");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const next = [...otp];
      next[index] = value;
      setOtp(next);
      if (value && index < 5) {
        document.getElementById(`otp-wd-${index + 1}`)?.focus();
      }
    }
  };

  const handleConfirm = () => {
    withdrawYield(amount);
    setStep("success");
    setTimeout(() => navigate("/yield/detail"), 2000);
  };

  const quickAmounts = [
    Math.round(state.yieldBalance * 0.25),
    Math.round(state.yieldBalance * 0.5),
    Math.round(state.yieldBalance * 0.75),
    state.yieldBalance,
  ].filter((v) => v >= MIN_AMOUNT);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/yield/detail" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <ArrowUpCircle className="w-6 h-6" />
          <h1 className="text-2xl">Rút tiền từ V-Smart Save</h1>
        </div>
        <p className="text-white/80 text-sm mt-1">Về ví V-Smart Pay</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-5">
        {step === "input" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            {/* Source balance */}
            <div className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Số dư V-Smart Save</p>
                <p className="font-semibold">{formatCurrency(state.yieldBalance)}</p>
              </div>
            </div>

            {/* Amount input */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
              <p className="text-sm text-muted-foreground mb-3">Số tiền muốn rút</p>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={rawInput}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0"
                  className="w-full text-3xl font-semibold bg-transparent outline-none pr-8 placeholder-muted-foreground/40"
                />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground">đ</span>
              </div>
              <div className="h-px bg-border mt-3 mb-3" />
              {amount > 0 && amount < MIN_AMOUNT && (
                <p className="text-xs text-destructive mb-2">Tối thiểu {formatCurrency(MIN_AMOUNT)}</p>
              )}
              {amount > state.yieldBalance && (
                <p className="text-xs text-destructive mb-2">Vượt quá số dư V-Smart Save</p>
              )}
              {quickAmounts.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((q, i) => {
                    const labels = ["25%", "50%", "75%", "Tất cả"];
                    return (
                      <button
                        key={i}
                        onClick={() => setRawInput(q.toLocaleString("vi-VN"))}
                        className="text-xs py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                      >
                        {labels[i]}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Summary */}
            {isValid && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-primary/10 rounded-2xl p-4 border border-primary/20 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số tiền rút</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí rút tiền</span>
                  <span className="text-primary">Miễn phí</span>
                </div>
                <div className="h-px bg-primary/30" />
                <div className="flex justify-between font-medium">
                  <span>Số dư V-Smart Save còn lại</span>
                  <span className="text-primary">{formatCurrency(state.yieldBalance - amount)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Nhận vào ví V-Smart Pay</span>
                  <span className="text-primary">+{formatCurrency(amount)}</span>
                </div>
              </motion.div>
            )}

            <button
              onClick={() => setStep("otp")}
              disabled={!isValid}
              className="w-full bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Tiếp tục
            </button>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-1">Xác thực giao dịch</h3>
              <p className="text-sm text-muted-foreground mb-2">Rút <strong>{formatCurrency(amount)}</strong> về ví V-Smart Pay</p>
              <p className="text-sm text-muted-foreground mb-6">
                Mã OTP gửi đến <span className="text-foreground font-medium">0912 345 678</span>
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-wd-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-14 text-center text-xl bg-input-background border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  />
                ))}
              </div>
              <button className="text-sm text-primary">Gửi lại mã OTP</button>
            </div>
            <button
              onClick={handleConfirm}
              disabled={otp.some((d) => !d)}
              className="w-full bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Xác nhận rút tiền
            </button>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-2xl mb-2">Rút tiền thành công!</h2>
            <p className="text-muted-foreground mb-2">{formatCurrency(amount)} đã về ví V-Smart Pay</p>
            <p className="text-sm text-muted-foreground">Tiền lời tích lũy đến hôm nay vẫn được ghi nhận đầy đủ.</p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Đang chuyển hướng...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
