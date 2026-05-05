import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Coins, TrendingUp, ArrowDownCircle, ArrowUpCircle,
  Building2, Shield, ChevronDown, ChevronUp,
  AlertTriangle, Clock, HelpCircle, FileText, LogOut,
} from "lucide-react";
import { formatCurrency, useFinanceStore, YieldTransaction } from "../../data/financeStore";

const WEEK_DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

type DayStatus = "earned" | "zero" | "future" | "today";

function getCalendarDays(): { date: number; status: DayStatus }[] {
  const today = new Date("2026-05-04");
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;

  const days: { date: number; status: DayStatus }[] = [];
  for (let i = 0; i < offset; i++) days.push({ date: 0, status: "future" });
  for (let d = 1; d <= daysInMonth; d++) {
    if (d < today.getDate()) days.push({ date: d, status: "earned" });
    else if (d === today.getDate()) days.push({ date: d, status: "today" });
    else days.push({ date: d, status: "future" });
  }
  return days;
}

function TxIcon({ type }: { type: YieldTransaction["type"] }) {
  if (type === "deposit") return <ArrowDownCircle className="w-5 h-5 text-primary" />;
  if (type === "withdraw") return <ArrowUpCircle className="w-5 h-5 text-orange-500" />;
  return <TrendingUp className="w-5 h-5 text-blue-500" />;
}

function txLabel(type: YieldTransaction["type"]) {
  if (type === "deposit") return "Nạp tiền";
  if (type === "withdraw") return "Rút tiền";
  return "Tiền lời";
}

function txAmountColor(type: YieldTransaction["type"]) {
  if (type === "withdraw") return "text-orange-500";
  return "text-primary";
}

function txAmountPrefix(type: YieldTransaction["type"]) {
  return type === "withdraw" ? "-" : "+";
}

const FAQ_ITEMS = [
  {
    q: "Tiền lời được tính như thế nào?",
    a: "Lãi tính theo số dư cuối ngày với lãi suất 5,75%/năm. Công thức: Số dư × 5,75% ÷ 365. Tiền lời được cộng vào số dư V-Smart Save vào cuối tháng.",
  },
  {
    q: "Tôi có thể rút tiền bất cứ lúc nào không?",
    a: "Có. Bạn có thể rút toàn bộ hoặc một phần về ví V-Smart Pay bất kỳ lúc nào. Tiền lời đã tích lũy đến ngày rút vẫn được ghi nhận đầy đủ.",
  },
  {
    q: "Tiền của tôi được bảo vệ như thế nào?",
    a: "Tiền được lưu ký tại WealthNet — đơn vị quản lý tài sản được NHNN cấp phép. V-Smart Pay đóng vai trò nền tảng phân phối và không trực tiếp sử dụng tiền của bạn để đầu tư.",
  },
  {
    q: "Hủy đăng ký thì tiền sẽ về đâu?",
    a: "Khi hủy, toàn bộ số dư V-Smart Save (gốc + lời tích lũy) sẽ được chuyển về ví V-Smart Pay của bạn.",
  },
];

export function YieldDetail() {
  const { state, cancelYield } = useFinanceStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tab = pathname === "/yield/history" ? "history" : pathname === "/yield/settings" ? "settings" : "product";
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const isCanceling = state.yieldStatus === "canceling";
  const dailyYield = Math.round(state.yieldBalance * state.yieldAnnualRate / 365);
  const monthlyEstimate = Math.round(state.yieldBalance * state.yieldAnnualRate / 12);
  const calendarDays = getCalendarDays();
  const streak = new Date("2026-05-04").getDate() - 1;

  const interestTotal = state.yieldTransactions
    .filter((t) => t.type === "interest")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleCancel = () => {
    cancelYield();
    setShowCancelConfirm(false);
    navigate("/yield/discovery");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-cyan-600 px-6 pt-12 pb-6 text-white">
        <Link to="/" className="inline-flex items-center gap-2 mb-5 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Về trang chủ ví</span>
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <Coins className="w-7 h-7" />
          <h1 className="text-2xl">V-Smart Save</h1>
        </div>
        <p className="text-white/80 text-sm">Sinh lời tự động 5,75%/năm</p>

        {isCanceling && (
          <div className="mt-3 flex items-center gap-2 bg-orange-400/30 rounded-xl px-4 py-2 text-sm">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Đang xử lý hủy đăng ký — tính năng nạp/rút tạm dừng</span>
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">
        {/* TAB: SẢN PHẨM */}
        {tab === "product" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            {/* Balance card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary to-cyan-600 p-5 text-white shadow-lg">
              <p className="text-sm text-white/75 mb-1">Số dư đang sinh lời</p>
              <p className="text-4xl font-semibold mb-4">{formatCurrency(state.yieldBalance)}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/15 rounded-xl p-3">
                  <p className="text-xs text-white/70 mb-0.5">Lãi hôm nay</p>
                  <p className="text-lg">+{formatCurrency(dailyYield)}</p>
                </div>
                <div className="bg-white/15 rounded-xl p-3">
                  <p className="text-xs text-white/70 mb-0.5">Tiền lời đã nhận</p>
                  <p className="text-lg">+{formatCurrency(interestTotal)}</p>
                </div>
              </div>
            </div>

            {/* Monthly estimate */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ước tính tiền lời tháng này</p>
                  <p className="text-2xl text-primary">+{formatCurrency(monthlyEstimate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Dự kiến nhận</p>
                  <p className="text-sm font-medium">31/05/2026</p>
                </div>
              </div>
            </div>

            {/* Earning streak calendar */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  Chuỗi sinh lời — {streak} ngày
                </h3>
                <span className="text-xs text-muted-foreground">Tháng 5/2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEK_DAYS.map((d) => (
                  <div key={d} className="text-center text-xs text-muted-foreground py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  if (day.date === 0) return <div key={`e-${i}`} />;
                  const base = "w-full aspect-square rounded-lg flex items-center justify-center text-sm";
                  if (day.status === "earned") return (
                    <div key={i} className={`${base} bg-primary/20 text-primary font-medium`}>{day.date}</div>
                  );
                  if (day.status === "today") return (
                    <div key={i} className={`${base} bg-primary text-white font-bold ring-2 ring-primary/40`}>{day.date}</div>
                  );
                  return <div key={i} className={`${base} text-muted-foreground/40`}>{day.date}</div>;
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary/20" />Đã sinh lời</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary" />Hôm nay</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-muted" />Chưa đến</div>
              </div>
            </div>

            {/* Deposit / Withdraw buttons */}
            {!isCanceling && (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/yield/deposit">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl hover:bg-primary/90 transition-colors">
                    <ArrowDownCircle className="w-5 h-5" />
                    Nạp tiền
                  </button>
                </Link>
                <Link to="/yield/withdraw">
                  <button
                    disabled={state.yieldBalance === 0}
                    className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3.5 rounded-xl hover:bg-primary/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowUpCircle className="w-5 h-5" />
                    Rút tiền
                  </button>
                </Link>
              </div>
            )}

            {/* How earnings work */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
              <h3 className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                Cách tính lãi
              </h3>
              <div className="bg-muted/50 rounded-xl p-3 text-sm text-center mb-3 font-mono">
                Số dư cuối ngày × 5,75% ÷ 365
              </div>
              <p className="text-sm text-muted-foreground">
                Lãi tích lũy mỗi ngày và được cộng vào số dư V-Smart Save vào ngày cuối cùng của tháng.
              </p>
            </div>

            {/* Partner */}
            <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-foreground">Đối tác: WealthNet</h3>
              </div>
              <p className="text-sm text-primary">
                Tiền được lưu ký và quản lý bởi WealthNet — đơn vị tài chính được NHNN cấp phép.
                V-Smart Pay đóng vai trò nền tảng phân phối.
              </p>
            </div>

            {/* Safety */}
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
              <h3 className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                An toàn & Bảo đảm
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Tiền lưu ký tại đối tác tài chính có phép hoạt động</p>
                <p>✓ Lãi suất và cách tính hiển thị minh bạch</p>
                <p>✓ Rút tiền bất kỳ lúc nào, không phí, không kỳ hạn</p>
                <p>✓ Lịch sử giao dịch đầy đủ, có thể tra cứu</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: LỊCH SỬ */}
        {tab === "history" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {state.yieldTransactions.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Chưa có giao dịch nào</p>
              </div>
            ) : (
              state.yieldTransactions.map((tx) => (
                <div key={tx.id} className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <TxIcon type={tx.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{txLabel(tx.type)}</p>
                    {tx.note && <p className="text-xs text-muted-foreground truncate">{tx.note}</p>}
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`font-semibold ${txAmountColor(tx.type)}`}>
                      {txAmountPrefix(tx.type)}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{tx.status === "success" ? "Thành công" : tx.status}</p>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* TAB: CÀI ĐẶT */}
        {tab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            {/* FAQ */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border/50">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h3>Câu hỏi thường gặp</h3>
              </div>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-border/30 last:border-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium pr-4">{item.q}</span>
                    {expandedFaq === i
                      ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    }
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-muted-foreground">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Contracts */}
            <button className="w-full bg-card rounded-2xl p-4 border border-border/50 shadow-sm flex items-center gap-3 hover:bg-muted/30 transition-colors">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium flex-1 text-left">Hợp đồng & Điều khoản</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground rotate-[-90deg]" />
            </button>

            {/* Cancel */}
            {!isCanceling ? (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full bg-card rounded-2xl p-4 border border-red-200 shadow-sm flex items-center gap-3 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 text-destructive" />
                <span className="text-sm font-medium text-destructive flex-1 text-left">Hủy đăng ký V-Smart Save</span>
              </button>
            ) : (
              <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-sm text-orange-700">Đang xử lý hủy đăng ký. Tiền sẽ về ví trong vài phút.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Cancel confirm modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4"
            onClick={() => setShowCancelConfirm(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-background rounded-2xl p-6 w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-5">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <LogOut className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Xác nhận hủy đăng ký?</h3>
                <p className="text-sm text-muted-foreground">
                  Toàn bộ số dư <strong>{formatCurrency(state.yieldBalance)}</strong> (gốc + tiền lời tích lũy)
                  sẽ được chuyển về ví V-Smart Pay.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleCancel}
                  className="w-full bg-destructive text-white py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Xác nhận hủy
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full border border-border py-3.5 rounded-xl hover:bg-muted/30 transition-colors text-sm"
                >
                  Giữ lại V-Smart Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
