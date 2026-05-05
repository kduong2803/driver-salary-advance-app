import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Building2, Car, Wallet } from "lucide-react";
import { MotorbikeIcon } from "../components/MotorbikeIcon";
import { formatCurrency, useFinanceStore } from "../data/financeStore";

const products = [
  {
    title: "Ứng thu nhập",
    description: "Rút sớm phần thu nhập đã phát sinh trong kỳ.",
    href: "/ewa/discovery",
    icon: Wallet,
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "Ứng doanh thu",
    description: "Ứng theo hạn mức đã duyệt và hoàn trả bằng tỷ lệ trích doanh thu.",
    href: "/rbf/discovery",
    icon: Building2,
    tone: "bg-primary/10 text-primary",
  },
  {
    title: "Vay mua xe",
    description: "Vay mua xe điện để chạy dịch vụ, quản lý khoản vay ngay trong app.",
    href: "/loan/discovery",
    icon: MotorbikeIcon,
    tone: "bg-primary/10 text-primary",
  },
];

export function Credit() {
  const { state } = useFinanceStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/85">
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Tín dụng</h1>
        <p className="mt-2 text-sm text-white/80">
          Ba flow hiện tại được giữ nguyên và gom vào một nhánh tín dụng.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="rounded-3xl border border-border/50 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              {state.vehicle === "car" ? <Car className="h-6 w-6" /> : <MotorbikeIcon className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hạn mức có thể dùng hôm nay</p>
              <p className="text-2xl text-primary">{formatCurrency(state.availableAdvance)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link to={product.href} className="block rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition active:scale-[0.98]">
                <div className="flex items-start gap-4">
                  <div className={`rounded-2xl p-3 ${product.tone}`}>
                    <product.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg">{product.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-muted-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
