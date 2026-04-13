import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Wallet, AlertCircle } from "lucide-react";
import { FaceAuth } from "../../components/FaceAuth";

export function EWARequest() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const maxAmount = 15000000;
  const feeRate = 0.015; // 1.5%
  const earnedIncome = 15000000;
  const heldAmount = 2500000;
  const availableEarnings = earnedIncome - heldAmount;

  const numAmount = parseInt(amount.replace(/\D/g, "")) || 0;
  const fee = Math.round(numAmount * feeRate);
  const netAmount = numAmount - fee;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const handleAmountChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (parseInt(numbers) <= maxAmount || !numbers) {
      setAmount(numbers);
    }
  };

  const quickAmounts = [1000000, 3000000, 5000000, 10000000];

  const handleConfirm = () => {
    navigate("/ewa/success");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Ứng thu nhập khả dụng</h1>
        <p className="text-white/80">Chọn số tiền muốn ứng trên phần thu nhập đã phát sinh</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5" />
            <span className="text-white/80">Thu nhập có thể ứng</span>
          </div>
          <p className="text-3xl">{formatCurrency(maxAmount)}</p>
          <p className="text-sm text-white/70 mt-1">
            Dựa trên thu nhập đã phát sinh sau khi trừ khoản giữ lại
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 space-y-3">
          <h3>Chi tiết thu nhập khả dụng</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lương cứng phân bổ</span>
            <span>{formatCurrency(4200000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Thu nhập từ cuốc đã hoàn thành</span>
            <span>{formatCurrency(earnedIncome - 4200000)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Khoản giữ lại / chờ xử lý</span>
            <span className="text-destructive">-{formatCurrency(heldAmount)}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between text-sm">
            <span>Thu nhập khả dụng</span>
            <span className="text-primary">{formatCurrency(availableEarnings)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <label className="block mb-3">
            <span className="text-sm text-muted-foreground">Số tiền muốn ứng từ thu nhập khả dụng</span>
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

          {/* Quick Amounts */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className="py-2 px-1 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                {formatCurrency(quickAmount / 1000000)}tr
              </button>
            ))}
          </div>
        </div>

        {/* Calculation */}
        {numAmount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 space-y-3"
          >
            <h3 className="mb-3">Chi tiết ứng thu nhập</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Thu nhập được ứng:</span>
                <span>{formatCurrency(numAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí dịch vụ ({feeRate * 100}%):</span>
                <span className="text-destructive">-{formatCurrency(fee)}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span>Số tiền thực nhận:</span>
                <span className="text-xl text-primary">{formatCurrency(netAmount)}</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-2 mt-4">
              <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Khoản ứng sẽ được tự động khấu trừ từ thu nhập phát sinh cuối kỳ. Bạn vẫn có thể chủ động tất toán sớm từ V-Smart Pay nếu muốn.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <button
          onClick={() => setShowConfirm(true)}
          disabled={numAmount === 0 || numAmount > maxAmount}
          className="w-full bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          Tiếp tục
        </button>
      </div>

      {/* Face Authentication Modal */}
      {showConfirm && (
        <FaceAuth
          onSuccess={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          amount={formatCurrency(netAmount)}
        />
      )}
    </div>
  );
}
