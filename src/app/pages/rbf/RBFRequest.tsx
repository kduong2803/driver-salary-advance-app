import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, AlertCircle, Wallet } from "lucide-react";
import { FaceAuth } from "../../components/FaceAuth";

const AVG_DAILY_REVENUE = 1000000;
const MAX_AMOUNT = 15000000;
const DAILY_RATE = 0.36 / 365;

const RATE_OPTIONS = [
  { value: 0.1, label: "10%" },
  { value: 0.2, label: "20%" },
  { value: 0.3, label: "30%" },
  { value: 0.4, label: "40%" },
  { value: 0.5, label: "50%" },
];

const calcMonths = (amount: number, rate: number) =>
  amount > 0 ? Math.min(6, Math.ceil(amount / (AVG_DAILY_REVENUE * rate) / 30)) : null;

export function RBFRequest() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [deductionRate, setDeductionRate] = useState(0.2);
  const [showConfirm, setShowConfirm] = useState(false);

  const numAmount = parseInt(amount.replace(/\D/g, "")) || 0;
  const estimatedMonths = calcMonths(numAmount, deductionRate) ?? 0;
  const estimatedDays = estimatedMonths * 30;
  const estimatedFee = numAmount > 0 ? Math.round(numAmount * DAILY_RATE * estimatedDays) : 0;
  const estimatedFeeRate = numAmount > 0 ? (estimatedFee / numAmount * 100).toFixed(1) : "0";
  const totalRepay = numAmount + estimatedFee;

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

  const handleAmountChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers || parseInt(numbers) <= MAX_AMOUNT) setAmount(numbers);
  };

  const quickAmounts = [3000000, 5000000, 8000000, 15000000];

  const handleConfirm = () => navigate("/rbf/success", {
    state: { amount: numAmount, estimatedFee, totalRepay, deductionRate, estimatedMonths },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Ứng doanh thu vận hành</h1>
        <p className="text-white/80">Chọn mức trích — hệ thống tính kỳ hạn tương đương</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        {/* Limit card */}
        <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-6 shadow-lg">
          <p className="text-white/80 text-sm mb-1">Hạn mức được duyệt</p>
          <p className="text-3xl">{formatCurrency(MAX_AMOUNT)}</p>
          <p className="text-sm text-white/70 mt-1">Dựa trên doanh thu và tần suất hoạt động 90 ngày</p>
        </div>

        {/* Amount Input */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <label className="block mb-3 text-sm text-muted-foreground">Số tiền muốn ứng</label>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? formatCurrency(numAmount) : ""}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="0đ"
            className="w-full text-3xl bg-transparent border-b-2 border-border focus:border-primary outline-none pb-2 transition-colors"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {quickAmounts.map((q) => (
              <button
                key={q}
                onClick={() => setAmount(q.toString())}
                className={`py-2 text-sm rounded-lg transition-colors ${numAmount === q ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-white"}`}
              >
                {q / 1000000}tr
              </button>
            ))}
          </div>
        </div>

        {/* Deduction Rate */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <div className="mb-3">
            <p className="text-sm font-medium">Tỷ lệ trích mỗi chuyến</p>
            <p className="text-xs text-muted-foreground mt-0.5">Trích càng cao → kỳ hạn càng ngắn → phí càng thấp</p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {RATE_OPTIONS.map((opt) => {
              const months = calcMonths(numAmount, opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => setDeductionRate(opt.value)}
                  className={`py-2.5 px-1 rounded-xl border-2 text-center transition-all ${
                    deductionRate === opt.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <p className="text-sm font-semibold">{opt.label}</p>
                  {months !== null && (
                    <p className={`text-xs mt-0.5 ${deductionRate === opt.value ? "text-primary" : "text-muted-foreground"}`}>
                      ~{months} tháng
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Disbursement Account */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Wallet className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Giải ngân vào V-Smart Pay</p>
            <p className="text-xs text-muted-foreground">Nhận tiền ngay lập tức</p>
          </div>
        </div>

        {/* Fee Preview */}
        {numAmount > 0 && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-5 shadow-xl"
            >
              <div className="text-center mb-5">
                <p className="text-white/80 text-sm mb-1">Kỳ hạn tương đương</p>
                <p className="text-4xl">{estimatedMonths} tháng</p>
                <p className="text-white/70 text-sm mt-1">Trích {Math.round(deductionRate * 100)}% mỗi chuyến · ~{estimatedDays} ngày</p>
              </div>
              <div className="space-y-2 text-sm border-t border-white/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Số tiền giải ngân:</span>
                  <span>{formatCurrency(numAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Phí ước tính ({estimatedFeeRate}%):</span>
                  <span>+{formatCurrency(estimatedFee)}</span>
                </div>
                <div className="flex justify-between font-medium border-t border-white/20 pt-2">
                  <span>Tổng hoàn trả ước tính:</span>
                  <span>{formatCurrency(totalRepay)}</span>
                </div>
              </div>
              <div className="mt-3 bg-white/10 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-white/70" />
                <p className="text-xs text-white/80">Kỳ hạn tính theo doanh thu trung bình. Hoàn trả sớm hơn nếu chạy nhiều chuyến hơn — phí tính theo ngày thực tế.</p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        <button
          onClick={() => setShowConfirm(true)}
          disabled={numAmount === 0}
          className="w-full bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          Tiếp tục
        </button>
      </div>

      {showConfirm && (
        <FaceAuth
          onSuccess={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          amount={formatCurrency(numAmount)}
        />
      )}
    </div>
  );
}
