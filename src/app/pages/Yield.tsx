import { ArrowLeft, Coins, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router";
import { formatCurrency, useFinanceStore } from "../data/financeStore";

export function Yield() {
  const { state } = useFinanceStore();
  const dailyYield = Math.round(state.walletBalance * state.yieldAnnualRate / 365);
  const projectedYear = Math.round(state.walletBalance * state.yieldAnnualRate);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/85">
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Sinh lời tự động</h1>
        <p className="mt-2 text-sm text-white/80">
          Demo tính theo số dư cuối ngày, lãi 5,75%/năm và cộng vào ví cuối tháng.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="rounded-[28px] border border-primary/20 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Số dư đang sinh lời</p>
              <p className="mt-1 text-3xl text-primary">{formatCurrency(state.walletBalance)}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Coins className="h-7 w-7" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-primary/10 p-4">
              <p className="text-xs text-slate-500">Lãi hôm nay</p>
              <p className="mt-1 text-xl text-primary">{formatCurrency(dailyYield)}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-4">
              <p className="text-xs text-slate-500">Tiền lời V-SmartSave</p>
              <p className="mt-1 text-xl text-primary">{formatCurrency(state.monthYield)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <div className="mb-3 flex items-center gap-3">
            <Wallet className="h-5 w-5 text-primary" />
            <h2 className="text-lg">Nguyên tắc vận hành</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tài xế không cần gửi tiết kiệm thủ công. Cuối mỗi ngày, hệ thống ghi nhận số dư ví,
            tính lãi theo 5,75%/năm và hiển thị phần lãi dự kiến. Tiền vẫn rút được bất cứ lúc nào.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
          <div className="mb-3 flex items-center gap-3 text-primary">
            <TrendingUp className="h-5 w-5" />
            <h2 className="text-lg">Nếu giữ số dư như hiện tại</h2>
          </div>
          <p className="text-sm text-secondary-foreground">
            Bạn có thể nhận khoảng {formatCurrency(projectedYear)} trong 12 tháng, chưa tính thay đổi số dư ví hằng ngày.
          </p>
        </div>
      </div>
    </div>
  );
}
