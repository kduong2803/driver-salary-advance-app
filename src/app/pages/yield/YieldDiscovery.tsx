import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Coins, TrendingUp, Shield, Zap, Check, ChevronRight, Building2, Clock, Wallet } from "lucide-react";
import { formatCurrency, useFinanceStore } from "../../data/financeStore";

export function YieldDiscovery() {
  const { state } = useFinanceStore();

  const annualRate = state.yieldAnnualRate * 100;
  const exampleBalance = 10000000;
  const exampleMonthly = Math.round(exampleBalance * state.yieldAnnualRate / 12);
  const exampleDaily = Math.round(exampleBalance * state.yieldAnnualRate / 365);

  const features = [
    { icon: Zap, title: "Đăng ký nhanh", desc: "3 bước đơn giản, không cần giấy tờ thêm" },
    { icon: Wallet, title: "Rút bất cứ lúc nào", desc: "Không kỳ hạn, không phí rút tiền" },
    { icon: TrendingUp, title: `${annualRate}%/năm`, desc: "Lãi tính theo số dư cuối ngày, cộng vào cuối tháng" },
    { icon: Shield, title: "An toàn & minh bạch", desc: "Tiền do WealthNet quản lý, có giấy phép NHNN" },
  ];

  const howItWorks = [
    { step: "1", title: "Đăng ký V-Smart Save", desc: "Xác nhận điều khoản và xác thực OTP" },
    { step: "2", title: "Nạp tiền vào ví sinh lời", desc: "Chuyển từ ví V-Smart Pay bất cứ lúc nào" },
    { step: "3", title: "Số dư tự động sinh lời", desc: "Hệ thống tính lãi theo số dư cuối mỗi ngày" },
    { step: "4", title: "Nhận tiền lời cuối tháng", desc: "Tiền lời cộng thẳng vào số dư ví sinh lời" },
  ];

  const benefits = [
    "Không cần gửi tiết kiệm thủ công — số dư tự động sinh lời mỗi ngày",
    "Tiền luôn có thể rút về ví V-Smart Pay để thanh toán bất cứ lúc nào",
    "Lãi suất cạnh tranh hơn tài khoản thanh toán thông thường (0.1–0.2%/năm)",
    "Thông tin lãi suất, cách tính và đối tác hiển thị đầy đủ, minh bạch",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary to-cyan-600 text-white px-6 pt-12 pb-32 relative overflow-hidden">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <Coins className="w-9 h-9" />
          </div>
          <h1 className="text-3xl mb-2">V-Smart Save</h1>
          <p className="text-white/90 text-lg">Sinh lời tự động {annualRate}%/năm từ số dư ví</p>
        </motion.div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 top-40 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-6 pb-8 space-y-6 -mt-20 relative z-10">
        {/* Example card */}
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50">
          <h3 className="mb-4">Ví dụ — số dư {formatCurrency(exampleBalance)}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lãi suất áp dụng</span>
              <span>{annualRate}%/năm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lãi tích lũy mỗi ngày</span>
              <span className="text-primary">+{formatCurrency(exampleDaily)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-medium">
              <span>Tiền lời ước tính/tháng</span>
              <span className="text-primary text-lg">+{formatCurrency(exampleMonthly)}</span>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium text-sm mb-1">{f.title}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <h3 className="mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </span>
            Cách thức hoạt động
          </h3>
          <div className="space-y-4">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-sm mb-0.5">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <h3 className="mb-4">Lợi ích nổi bật</h3>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <p className="text-sm text-foreground/80">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner info */}
        <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Đối tác quản lý tài sản</h3>
          </div>
          <p className="text-sm text-primary">
            Tiền của bạn được lưu ký và quản lý bởi <strong>WealthNet</strong> — đơn vị tài chính được
            cấp phép bởi Ngân hàng Nhà nước Việt Nam. V-Smart Pay đóng vai trò nền tảng phân phối,
            không trực tiếp sử dụng tiền của người dùng để đầu tư.
          </p>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/yield/register">
            <button className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              <span className="text-lg">Đăng ký V-Smart Save</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của V-Smart Pay
          </p>
        </motion.div>
      </div>
    </div>
  );
}
