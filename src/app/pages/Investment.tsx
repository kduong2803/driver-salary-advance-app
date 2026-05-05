import { ArrowLeft, Minus, PauseCircle, PlayCircle, Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { formatCurrency, useFinanceStore } from "../data/financeStore";

export function Investment() {
  const { state, updateCcqPlan } = useFinanceStore();
  const plan = state.ccqPlan;
  const estimatedTrips = state.vehicle === "car" ? 250 : 320;
  const monthlyContribution = plan.mode === "fixed"
    ? plan.fixedPerTrip * estimatedTrips
    : Math.round(state.todayIncome * 24 * plan.percentPerTrip / 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/85">
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Đầu tư CCQ</h1>
        <p className="mt-2 text-sm text-white/80">
          Trích khoản nhỏ sau mỗi chuyến, gom lại để mua chứng chỉ quỹ theo lịch tài xế chọn.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="rounded-[28px] border border-primary/20 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Tổng NAV hiện tại</p>
              <p className="mt-1 text-3xl text-primary">{formatCurrency(plan.nav)}</p>
              <p className="mt-1 text-sm text-slate-500">Đã tích lũy {formatCurrency(plan.accumulated)}</p>
            </div>
            <button
              onClick={() => updateCcqPlan({ enabled: !plan.enabled })}
              className={`rounded-2xl p-3 transition active:scale-95 ${plan.enabled ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}
            >
              {plan.enabled ? <PauseCircle className="h-7 w-7" /> : <PlayCircle className="h-7 w-7" />}
            </button>
          </div>

          <div className="rounded-2xl bg-primary/10 p-4">
            <p className="text-xs text-primary">Dự kiến trích tháng này</p>
            <p className="mt-1 text-2xl text-primary">{formatCurrency(monthlyContribution)}</p>
            <p className="text-xs text-primary">Dựa trên khoảng {estimatedTrips} chuyến/tháng</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="mb-4 text-lg">Cài đặt trích tự động</h2>

          <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-muted/40 p-1.5">
            <button
              onClick={() => updateCcqPlan({ mode: "fixed" })}
              className={`rounded-xl py-2.5 text-sm transition ${plan.mode === "fixed" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Theo số tiền
            </button>
            <button
              onClick={() => updateCcqPlan({ mode: "percent" })}
              className={`rounded-xl py-2.5 text-sm transition ${plan.mode === "percent" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Theo %
            </button>
          </div>

          {plan.mode === "fixed" ? (
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <button onClick={() => updateCcqPlan({ fixedPerTrip: Math.max(1000, plan.fixedPerTrip - 1000) })} className="rounded-full bg-white p-2 shadow-sm">
                <Minus className="h-4 w-4" />
              </button>
              <div className="text-center">
                <p className="text-xs text-slate-500">Mỗi chuyến trích</p>
                <p className="text-xl text-slate-950">{formatCurrency(plan.fixedPerTrip)}</p>
              </div>
              <button onClick={() => updateCcqPlan({ fixedPerTrip: plan.fixedPerTrip + 1000 })} className="rounded-full bg-white p-2 shadow-sm">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <button onClick={() => updateCcqPlan({ percentPerTrip: Math.max(1, plan.percentPerTrip - 1) })} className="rounded-full bg-white p-2 shadow-sm">
                <Minus className="h-4 w-4" />
              </button>
              <div className="text-center">
                <p className="text-xs text-slate-500">Mỗi chuyến trích</p>
                <p className="text-xl text-slate-950">{plan.percentPerTrip}% doanh thu</p>
              </div>
              <button onClick={() => updateCcqPlan({ percentPerTrip: plan.percentPerTrip + 1 })} className="rounded-full bg-white p-2 shadow-sm">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <div className="mb-3 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg">Quỹ và lịch mua</h2>
          </div>
          <p className="text-sm text-muted-foreground">{plan.fund}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => updateCcqPlan({ frequency: "weekly" })}
              className={`rounded-xl px-3 py-2 text-sm ${plan.frequency === "weekly" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
            >
              Mua hằng tuần
            </button>
            <button
              onClick={() => updateCcqPlan({ frequency: "monthly" })}
              className={`rounded-xl px-3 py-2 text-sm ${plan.frequency === "monthly" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
            >
              Mua cuối tháng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
