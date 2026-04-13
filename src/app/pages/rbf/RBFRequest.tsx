import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, AlertCircle, Building2, Wallet, Percent, ChevronUp, ChevronDown } from "lucide-react";
import { FaceAuth } from "../../components/FaceAuth";

const TERMS = [
  {
    days: 7,
    label: "7 ngày",
    fee: 0.007,
    feeLabel: "0.7%",
    minRate: 0.5,
    maxAmount: 3000000,
    desc: "Phù hợp vốn ngắn hạn",
  },
  {
    days: 14,
    label: "14 ngày",
    fee: 0.014,
    feeLabel: "1.4%",
    minRate: 0.4,
    maxAmount: 5000000,
    desc: "Cân bằng phí và dòng tiền",
  },
  {
    days: 30,
    label: "30 ngày",
    fee: 0.03,
    feeLabel: "3.0%",
    minRate: 0.3,
    maxAmount: 10000000,
    desc: "Phù hợp vận hành 1 tháng",
  },
  {
    days: 60,
    label: "60 ngày",
    fee: 0.06,
    feeLabel: "6.0%",
    minRate: 0.2,
    maxAmount: 15000000,
    desc: "Hạn mức cao, trích nhẹ mỗi chuyến",
  },
];

export function RBFRequest() {
  const navigate = useNavigate();
  const [selectedTermIndex, setSelectedTermIndex] = useState(2); // default 30 ngày
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState<"vsp" | "bank">("vsp");
  const [deductionRate, setDeductionRate] = useState(TERMS[2].minRate);
  const [showConfirm, setShowConfirm] = useState(false);

  const term = TERMS[selectedTermIndex];
  const avgDailyRevenue = 1000000;

  const numAmount = parseInt(amount.replace(/\D/g, "")) || 0;
  const feeAmount = Math.round(numAmount * term.fee);
  const totalRepay = numAmount + feeAmount;
  const estimatedDays = numAmount > 0
    ? Math.ceil(totalRepay / (avgDailyRevenue * deductionRate))
    : 0;

  const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

  const handleTermChange = (index: number) => {
    setSelectedTermIndex(index);
    setDeductionRate(TERMS[index].minRate);
    // reset amount if exceeds new term limit
    const newMax = TERMS[index].maxAmount;
    const currentNum = parseInt(amount.replace(/\D/g, "")) || 0;
    if (currentNum > newMax) setAmount("");
  };

  const handleAmountChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers || parseInt(numbers) <= term.maxAmount) {
      setAmount(numbers);
    }
  };

  const adjustRate = (delta: number) => {
    const newRate = Math.round((deductionRate + delta) * 100) / 100;
    if (newRate >= term.minRate && newRate <= 0.8) {
      setDeductionRate(newRate);
    }
  };

  const quickAmounts = [
    Math.floor(term.maxAmount * 0.25 / 500000) * 500000,
    Math.floor(term.maxAmount * 0.5 / 500000) * 500000,
    Math.floor(term.maxAmount * 0.75 / 500000) * 500000,
    term.maxAmount,
  ].filter((v, i, arr) => v > 0 && arr.indexOf(v) === i);

  const handleConfirm = () => navigate("/rbf/success");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Ứng doanh thu vận hành</h1>
        <p className="text-white/80">Chọn kỳ hạn và số tiền phù hợp với nhu cầu</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">

        {/* Term Selection */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <h3 className="mb-3 text-sm text-muted-foreground">Kỳ hạn hoàn trả</h3>
          <div className="grid grid-cols-2 gap-2">
            {TERMS.map((t, index) => (
              <button
                key={t.days}
                onClick={() => handleTermChange(index)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedTermIndex === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <p className={`text-base font-semibold mb-0.5 ${selectedTermIndex === index ? "text-primary" : ""}`}>
                  {t.label}
                </p>
                <p className="text-xs text-muted-foreground">Phí {t.feeLabel} • Trích {t.minRate * 100}%/chuyến</p>
                <p className="text-xs text-muted-foreground mt-0.5">Tối đa {formatCurrency(t.maxAmount)}</p>
              </button>
            ))}
          </div>

          {/* Selected term info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTermIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 bg-primary/5 rounded-xl p-3 space-y-1 text-sm"
            >
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{term.desc} — phí {term.feeLabel} một lần khi giải ngân. Tất toán sớm không phát sinh thêm phí.</span>
              </div>
              <p className="text-xs text-destructive pl-6">Quá hạn bị phạt lãi 0.1%/ngày trên số dư còn lại.</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Amount Input */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <label className="block mb-3">
            <span className="text-sm text-muted-foreground">Số tiền muốn ứng (tối đa {formatCurrency(term.maxAmount)})</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={amount ? formatCurrency(numAmount) : ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0đ"
              className="w-full text-3xl bg-transparent border-b-2 border-border focus:border-primary outline-none pb-2 transition-colors"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className={`py-2 px-1 text-sm rounded-lg transition-colors ${
                  numAmount === quickAmount
                    ? "bg-primary text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-white"
                }`}
              >
                {(quickAmount / 1000000).toFixed(quickAmount % 1000000 === 0 ? 0 : 1)}tr
              </button>
            ))}
          </div>
        </div>

        {/* Account Selection */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
          <label className="block mb-3">
            <span className="text-sm text-muted-foreground">Tài khoản giải ngân</span>
          </label>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${account === "vsp" ? "border-primary bg-primary/5" : "border-border"}`}>
              <input type="radio" name="account" value="vsp" checked={account === "vsp"} onChange={() => setAccount("vsp")} className="w-4 h-4 text-primary" />
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm">V-Smart Pay</p>
                <p className="text-xs text-muted-foreground">Nhận tiền ngay lập tức</p>
              </div>
            </label>
            <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${account === "bank" ? "border-primary bg-primary/5" : "border-border"}`}>
              <input type="radio" name="account" value="bank" checked={account === "bank"} onChange={() => setAccount("bank")} className="w-4 h-4 text-primary" />
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm">Tài khoản ngân hàng</p>
                <p className="text-xs text-muted-foreground">Vietcombank •••• 1234</p>
              </div>
            </label>
          </div>
        </div>

        {/* Calculation */}
        {numAmount > 0 && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 space-y-4"
            >
              <h3 className="text-sm font-medium">Chi tiết khoản ứng</h3>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số tiền giải ngân:</span>
                  <span className="text-lg">{formatCurrency(numAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí dịch vụ ({term.feeLabel}):</span>
                  <span className="text-destructive">+{formatCurrency(feeAmount)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tổng phải hoàn trả:</span>
                  <span className="font-medium">{formatCurrency(totalRepay)}</span>
                </div>
              </div>

              {/* Deduction Rate Adjustment */}
              <div className="bg-muted/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Tỷ lệ trích mỗi chuyến</p>
                    <p className="text-xs text-muted-foreground">Tối thiểu {term.minRate * 100}% để hoàn tất trong {term.days} ngày</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustRate(-0.05)}
                      disabled={deductionRate <= term.minRate}
                      className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center disabled:opacity-30 hover:border-primary transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold text-primary w-12 text-center">
                      {Math.round(deductionRate * 100)}%
                    </span>
                    <button
                      onClick={() => adjustRate(0.05)}
                      disabled={deductionRate >= 0.8}
                      className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center disabled:opacity-30 hover:border-primary transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ước tính hoàn tất:</span>
                  <span className="text-primary font-medium">
                    ~{estimatedDays} ngày
                    {estimatedDays <= term.days
                      ? <span className="text-xs text-green-600 ml-1">(trong kỳ hạn)</span>
                      : <span className="text-xs text-amber-600 ml-1">(tăng tỷ lệ để đúng kỳ)</span>
                    }
                  </span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Tất toán sớm bất kỳ lúc nào từ V-Smart Pay — chỉ trả phần dư còn lại, không phát sinh thêm phí.
                  Có thể điều chỉnh tăng tỷ lệ trích để hoàn tất sớm hơn.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* CTA */}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={numAmount === 0 || numAmount > term.maxAmount}
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
