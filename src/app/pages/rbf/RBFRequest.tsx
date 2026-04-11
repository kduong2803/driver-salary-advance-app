import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, AlertCircle, Building2, Wallet, Percent } from "lucide-react";
import { FaceAuth } from "../../components/FaceAuth";

export function RBFRequest() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState<"vsp" | "bank">("vsp");
  const [showConfirm, setShowConfirm] = useState(false);

  const maxAmount = 25000000;
  const revenueRate = 0.1; // 10%
  const avgDailyRevenue = 3500000;

  const numAmount = parseInt(amount.replace(/\D/g, "")) || 0;
  const estimatedDays = numAmount > 0 ? Math.ceil(numAmount / (avgDailyRevenue * revenueRate)) : 0;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const handleAmountChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (parseInt(numbers) <= maxAmount || !numbers) {
      setAmount(numbers);
    }
  };

  const quickAmounts = [5000000, 10000000, 15000000, 20000000];

  const handleConfirm = () => {
    navigate("/rbf/success");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/manage" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Ứng doanh thu vận hành</h1>
        <p className="text-white/80">Chọn số tiền trong hạn mức đã được phê duyệt trước</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Available Limit */}
        <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-white/80">Hạn mức được duyệt</span>
          </div>
          <p className="text-3xl">{formatCurrency(maxAmount)}</p>
          <p className="text-sm text-white/70 mt-1">
            Xác định từ doanh thu, số chuyến và tần suất vận hành 90 ngày
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 space-y-3">
          <h3>Thông tin phê duyệt hiện tại</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Doanh thu trung bình/ngày</span>
            <span>{formatCurrency(avgDailyRevenue)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tỷ lệ trích doanh thu</span>
            <span className="text-primary">{revenueRate * 100}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Hạn mức còn khả dụng</span>
            <span>{formatCurrency(maxAmount)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <label className="block mb-3">
            <span className="text-sm text-muted-foreground">Số tiền muốn ứng từ hạn mức đã duyệt</span>
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
                {quickAmount / 1000000}tr
              </button>
            ))}
          </div>
        </div>

        {/* Account Selection */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <label className="block mb-3">
            <span className="text-sm text-muted-foreground">Tài khoản giải ngân</span>
          </label>
          <div className="space-y-3">
            <label
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                account === "vsp"
                  ? "border-blue-600 bg-blue-50"
                  : "border-border bg-background"
              }`}
            >
              <input
                type="radio"
                name="account"
                value="vsp"
                checked={account === "vsp"}
                onChange={(e) => setAccount(e.target.value as "vsp")}
                className="w-5 h-5 text-blue-600"
              />
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p>Ví VSP</p>
                <p className="text-sm text-muted-foreground">Nhận tiền ngay lập tức</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                account === "bank"
                  ? "border-blue-600 bg-blue-50"
                  : "border-border bg-background"
              }`}
            >
              <input
                type="radio"
                name="account"
                value="bank"
                checked={account === "bank"}
                onChange={(e) => setAccount(e.target.value as "bank")}
                className="w-5 h-5 text-blue-600"
              />
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p>Tài khoản ngân hàng</p>
                <p className="text-sm text-muted-foreground">Vietcombank •••• 1234</p>
              </div>
            </label>
          </div>
        </div>

        {/* Calculation */}
        {numAmount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 space-y-4"
          >
            <h3 className="mb-3">Chi tiết khoản ứng doanh thu</h3>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Số tiền giải ngân:</span>
                <span className="text-lg">{formatCurrency(numAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tỷ lệ hoàn trả mỗi chuyến:</span>
                <span className="text-primary flex items-center gap-1">
                  <Percent className="w-4 h-4" />
                  {revenueRate * 100}%
                </span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ước tính thời gian:</span>
                <span className="text-lg text-primary">~{estimatedDays} ngày</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm">
              <p className="text-muted-foreground">Ví dụ hoàn trả:</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Chuyến 500.000đ:</span>
                  <span className="text-primary">Trích50.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Chuyến 1.000.000đ:</span>
                  <span className="text-primary">Trích100.000đ</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Hệ thống sẽ tự động trích {revenueRate * 100}% trên doanh thu phát sinh của fleet cho đến khi khoản ứng hoàn tất.
                Đối tác vẫn có thể chủ động thanh toán trước hạn từ ví VSP.
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
          amount={formatCurrency(numAmount)}
        />
      )}
    </div>
  );
}
