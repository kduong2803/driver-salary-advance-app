import { Bike, Car, Leaf, Sparkles, Zap } from "lucide-react";
import { formatCurrency, formatNumber, useFinanceStore } from "../data/financeStore";
import { MotorbikeIcon } from "../components/MotorbikeIcon";

export function GreenPoints() {
  const { state, metrics, setVehicle } = useFinanceStore();

  const benefits = [
    { label: "Giảm phí ứng lương", value: Math.round(state.greenSavings * 0.57) },
    { label: "Giảm phí bảo hiểm", value: Math.round(state.greenSavings * 0.31) },
    { label: "Voucher sạc V-GREEN", value: Math.round(state.greenSavings * 0.12) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Tín chỉ Xanh</h1>
        <p className="mt-2 text-sm text-white/80">
          Ghi nhận km đã chạy bằng xe điện, quy đổi thành điểm, ưu đãi và thông điệp tác động môi trường.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-card p-1.5 shadow-sm">
          <button
            onClick={() => setVehicle("car")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition ${
              state.vehicle === "car" ? "bg-primary text-white" : "text-muted-foreground"
            }`}
          >
            <Car className="h-4 w-4" />
            Ô tô điện
          </button>
          <button
            onClick={() => setVehicle("bike")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition ${
              state.vehicle === "bike" ? "bg-primary text-white" : "text-muted-foreground"
            }`}
          >
            <Bike className="h-4 w-4" />
            Xe máy điện
          </button>
        </div>

        <div className="rounded-[28px] border border-primary/20 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-4">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              {state.vehicle === "car" ? <Car className="h-7 w-7" /> : <MotorbikeIcon className="h-7 w-7" />}
            </div>
            <div>
              <p className="text-sm text-slate-500">Km ghi nhận tháng này</p>
              <p className="text-3xl text-primary">{formatNumber(metrics.monthKm)} km</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-primary/10 p-4">
              <p className="text-xs text-primary">Tín chỉ/km</p>
              <p className="mt-1 text-xl text-primary">{metrics.pointsPerKm}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-4">
              <p className="text-xs text-primary">Tổng điểm</p>
              <p className="mt-1 text-xl text-primary">{formatNumber(state.greenPoints)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary to-cyan-600 p-5 text-white">
          <div className="mb-4 flex items-center gap-3">
            <Leaf className="h-6 w-6" />
            <h2 className="text-xl">Tác động xanh</h2>
          </div>
          <p className="text-sm text-cyan-50/85">
            Bạn đã góp phần giảm khoảng {metrics.co2Kg} kg CO2 trong tháng này,
            tương đương trồng khoảng {metrics.treeEquivalent} cây xanh.
          </p>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg">Ưu đãi dự kiến</h2>
          </div>
          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit.label} className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">{benefit.label}</span>
                <span className="text-sm text-primary">{formatCurrency(benefit.value)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm text-secondary-foreground">
            <Zap className="h-4 w-4" />
            Tổng ưu đãi tháng này khoảng {formatCurrency(state.greenSavings)}
          </div>
        </div>
      </div>
    </div>
  );
}
