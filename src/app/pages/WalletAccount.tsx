import { Banknote, ChevronRight, CircleHelp, CreditCard, Headphones, ShieldCheck, UserRound, Wallet } from "lucide-react";

const linkedItems = [
  {
    title: "Liên kết ngân hàng",
    description: "Vietcombank •••• 2488",
    icon: Banknote,
    status: "Đã liên kết",
  },
  {
    title: "Thẻ thanh toán",
    description: "Thêm thẻ để nạp/rút tiền nhanh hơn",
    icon: CreditCard,
    status: "Thêm mới",
  },
];

const supportItems = [
  {
    title: "FAQ về V-Smart Pay",
    description: "Phí, hạn mức, bảo mật và thời gian xử lý",
    icon: CircleHelp,
  },
  {
    title: "Trung tâm hỗ trợ",
    description: "Chat với GSM Financial Services",
    icon: Headphones,
  },
  {
    title: "Bảo mật tài khoản",
    description: "Sinh trắc học, PIN ví và thiết bị tin cậy",
    icon: ShieldCheck,
  },
];

export function WalletAccount() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <p className="text-sm text-white/80">V-Smart Pay</p>
        <h1 className="mt-1 text-3xl">Tài khoản ví</h1>
        <p className="mt-2 text-sm text-white/80">
          Quản lý liên kết ngân hàng, thẻ, bảo mật, FAQ và hỗ trợ cho ví.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="rounded-3xl border border-primary/20 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <p className="text-lg">Tài xế GSM</p>
              <p className="text-sm text-muted-foreground">Ví đã xác thực eKYC • V-Smart Pay</p>
            </div>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="px-1 text-xl text-primary">Liên kết thanh toán</h2>
          {linkedItems.map((item) => (
            <button
              key={item.title}
              className="flex w-full items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 text-left shadow-sm transition active:scale-[0.98]"
            >
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p>{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{item.status}</span>
            </button>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="px-1 text-xl text-primary">Trợ giúp & bảo mật</h2>
          {supportItems.map((item) => (
            <button
              key={item.title}
              className="flex w-full items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 text-left shadow-sm transition active:scale-[0.98]"
            >
              <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p>{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </section>

        <div className="rounded-2xl bg-primary/10 p-4">
          <div className="flex items-start gap-3">
            <Wallet className="mt-0.5 h-5 w-5 text-primary" />
            <p className="text-sm text-secondary-foreground">
              Các cài đặt ở đây thuộc ví tổng, không thuộc riêng module Tín dụng, Bảo hiểm, Sinh lời hay Đầu tư CCQ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
