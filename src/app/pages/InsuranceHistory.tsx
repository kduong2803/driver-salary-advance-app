import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { formatCurrency } from "../data/financeStore";
import { mockHistory } from "../data/insuranceData";

const grouped = mockHistory.reduce((acc: Record<string, typeof mockHistory>, r) => {
  const month = r.date.slice(3);
  if (!acc[month]) acc[month] = [];
  acc[month].push(r);
  return acc;
}, {});

const historyTotal = mockHistory.reduce((s, r) => s + r.amount, 0);

export function InsuranceHistory() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/85">
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Lịch sử giao dịch</h1>
        <p className="mt-2 text-sm text-white/80">Các gói bảo hiểm đã mua theo từng kỳ thanh toán.</p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Tổng đã chi</p>
            <p className="mt-1 text-xl text-primary">{formatCurrency(historyTotal)}</p>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Số giao dịch</p>
            <p className="mt-1 text-xl text-primary">{mockHistory.length} lần</p>
          </div>
        </div>

        {Object.entries(grouped).map(([month, records]) => (
          <div key={month}>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Tháng {month}</p>
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm">
              {records.map((r, i) => (
                <div
                  key={r.id}
                  className={`flex items-center justify-between px-4 py-3 ${i < records.length - 1 ? "border-b border-border/40" : ""}`}
                >
                  <div className="flex-1">
                    <p className="text-sm">{r.productName}</p>
                    <p className="text-xs text-muted-foreground">{r.period} · {r.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">-{formatCurrency(r.amount)}</p>
                    <span className={`text-xs ${r.status === "completed" ? "text-emerald-600" : r.status === "pending" ? "text-amber-600" : "text-muted-foreground"}`}>
                      {r.status === "completed" ? "Hoàn thành" : r.status === "pending" ? "Đang xử lý" : "Hoàn tiền"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {mockHistory.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-muted-foreground">Chưa có giao dịch nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
