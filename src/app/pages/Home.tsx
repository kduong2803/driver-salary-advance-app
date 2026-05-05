import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeDollarSign,
  Bike,
  Car,
  Coins,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatCurrency, formatNumber, useFinanceStore } from "../data/financeStore";

const categories = [
  {
    title: "Bảo hiểm",
    description: "Mua bảo vệ theo ca, theo tháng hoặc theo từng đơn nhỏ.",
    href: "/insurance",
    icon: ShieldCheck,
    tone: "from-primary to-cyan-600",
    stat: "5 sản phẩm",
  },
  {
    title: "Tín dụng",
    description: "Ứng thu nhập, ứng doanh thu và vay mua xe trong một nhánh.",
    href: "/credit",
    icon: BadgeDollarSign,
    tone: "from-primary to-cyan-600",
    stat: "3 flow hiện tại",
  },
  {
    title: "Sinh lời",
    description: "Số dư ví tự sinh lãi mỗi ngày, rút bất cứ lúc nào.",
    href: "/yield",
    icon: Coins,
    tone: "from-primary to-cyan-600",
    stat: "5,75%/năm",
  },
  {
    title: "Đầu tư CCQ",
    description: "Trích tiền nhỏ sau mỗi chuyến để tích lũy dài hạn.",
    href: "/investment",
    icon: TrendingUp,
    tone: "from-primary to-cyan-600",
    stat: "Setup tự động",
  },
];

export function Home() {
  const { state, metrics, setVehicle } = useFinanceStore();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-primary px-6 pb-10 pt-12 text-white">
        <div className="absolute -right-16 top-4 h-44 w-44 rounded-full bg-cyan-300/20 blur-2xl" />
        <div className="absolute -left-14 bottom-0 h-36 w-36 rounded-full bg-cyan-300/20 blur-2xl" />

        <div className="relative z-10 space-y-6">
          <div>
            <p className="mb-2 text-sm text-white/80">GSM Financial Services</p>
            <h1 className="text-3xl leading-tight">Tài chính trong một ví cho tài xế GSM</h1>
            <p className="mt-2 text-sm text-white/80">
              V-Smart Pay là trung tâm nhận thu nhập, ứng tiền, mua bảo hiểm, sinh lời và tích lũy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/10 p-1.5 backdrop-blur">
            <button
              onClick={() => setVehicle("car")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition ${
                state.vehicle === "car" ? "bg-white text-primary shadow-lg" : "text-white/75"
              }`}
            >
              <Car className="h-4 w-4" />
              Ô tô điện
            </button>
            <button
              onClick={() => setVehicle("bike")}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition ${
                state.vehicle === "bike" ? "bg-white text-primary shadow-lg" : "text-white/75"
              }`}
            >
              <Bike className="h-4 w-4" />
              Xe máy điện
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg space-y-6 px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/70 bg-white p-5 shadow-[0_18px_50px_rgba(12,74,110,0.18)]"
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">Số dư V-Smart Pay</p>
              <p className="mt-1 text-3xl text-primary">{formatCurrency(state.walletBalance)}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Wallet className="h-6 w-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Thu nhập hôm nay</p>
              <p className="mt-1 text-lg text-slate-900">{formatCurrency(state.todayIncome)}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-slate-500">Có thể ứng</p>
              <p className="mt-1 text-lg text-primary">{formatCurrency(state.availableAdvance)}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-slate-500">Tiền lời V-SmartSave</p>
              <p className="mt-1 text-lg text-primary">{formatCurrency(state.monthYield)}</p>
            </div>
            <Link to="/green-points" className="rounded-2xl bg-primary/10 p-3 transition active:scale-[0.98]">
              <p className="text-xs text-slate-500">Tín chỉ Xanh</p>
              <p className="mt-1 text-lg text-primary">{formatNumber(state.greenPoints)}</p>
            </Link>
          </div>
        </motion.div>

        <section className="rounded-[24px] border border-primary/20 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Chấm điểm tài xế</p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-3xl text-primary">{state.driverRating.toFixed(2)}</p>
                <Star className="h-6 w-6 fill-primary text-primary" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Dựa trên {formatNumber(state.customerReviewCount)} đánh giá khách hàng
              </p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Star className="h-6 w-6" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-slate-500">Tỷ lệ hoàn thành</p>
              <p className="mt-1 text-lg text-primary">{state.completionRate}%</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Gợi ý cải thiện</p>
              <p className="mt-1 text-sm text-slate-700">Giữ đánh giá trên 4,8 để mở ưu đãi tốt hơn</p>
            </div>
          </div>
        </section>

        <Link
          to="/green-points"
          className="block rounded-[24px] border border-primary/20 bg-gradient-to-br from-primary to-cyan-600 p-5 text-white shadow-lg shadow-cyan-900/10"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/15 p-3">
              <Leaf className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-cyan-50/80">Bạn đã chạy {formatNumber(metrics.monthKm)} km tháng này</p>
              <h2 className="mt-1 text-xl">Giảm khoảng {metrics.co2Kg} kg CO2</h2>
              <p className="mt-1 text-sm text-cyan-50/80">
                Tương đương trồng khoảng {metrics.treeEquivalent} cây xanh, quy đổi {formatCurrency(state.greenSavings)} ưu đãi.
              </p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5" />
          </div>
        </Link>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl text-primary">Danh mục tài chính</h2>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index }}
              >
                <Link
                  to={category.href}
                  className="block min-h-[180px] rounded-[26px] border border-white bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.tone} text-white shadow-lg`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-lg text-slate-950">{category.title}</p>
                  <p className="mb-3 text-xs leading-relaxed text-slate-500">{category.description}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{category.stat}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
