import { ArrowDownLeft, ArrowUpRight, Coins, ShieldCheck, Wallet } from "lucide-react";
import { formatCurrency, useFinanceStore } from "../data/financeStore";

const walletEvents = [
  {
    id: "income-1",
    title: "Nhận thu nhập từ GreenSM",
    description: "Settlement chuyến xe trong ngày",
    amount: 920000,
    type: "in" as const,
    icon: ArrowDownLeft,
    time: "Hôm nay • 18:10",
  },
  {
    id: "advance-1",
    title: "Ứng thu nhập",
    description: "Giải ngân từ module Tín dụng",
    amount: 640000,
    type: "in" as const,
    icon: Wallet,
    time: "Hôm nay • 12:25",
  },
  {
    id: "insurance-1",
    title: "Phí bảo hiểm theo ca",
    description: "BH mở rộng khi tắt app",
    amount: 15000,
    type: "out" as const,
    icon: ShieldCheck,
    time: "Hôm nay • 08:03",
  },
  {
    id: "yield-1",
    title: "Lãi ví tạm tính",
    description: "Tính theo số dư cuối ngày",
    amount: 1300,
    type: "in" as const,
    icon: Coins,
    time: "Hôm qua • 23:59",
  },
  {
    id: "ccq-1",
    title: "Trích đầu tư CCQ",
    description: "Gom tiền sau chuyến xe",
    amount: 5000,
    type: "out" as const,
    icon: ArrowUpRight,
    time: "Hôm qua • 20:40",
  },
];

export function WalletHistory() {
  const { state } = useFinanceStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <p className="text-sm text-white/80">V-Smart Pay</p>
        <h1 className="mt-1 text-3xl">Lịch sử ví</h1>
        <p className="mt-2 text-sm text-white/80">
          Tổng hợp mọi giao dịch vào/ra ví, khác với lịch sử riêng trong từng module sản phẩm.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="rounded-3xl border border-primary/20 bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Số dư hiện tại</p>
          <p className="mt-1 text-3xl text-primary">{formatCurrency(state.walletBalance)}</p>
        </div>

        <div className="space-y-3">
          {walletEvents.map((event) => (
            <div key={event.id} className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`rounded-2xl p-3 ${event.type === "in" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-600"}`}>
                  <event.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p>{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <p className={`whitespace-nowrap text-sm ${event.type === "in" ? "text-primary" : "text-slate-700"}`}>
                      {event.type === "in" ? "+" : "-"}{formatCurrency(event.amount)}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
