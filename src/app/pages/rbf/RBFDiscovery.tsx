import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Shield, Check, ChevronRight, Percent, Building2, Calendar } from "lucide-react";

const TERM_RATES: Record<number, number> = {
  1: 0.025, 2: 0.028, 3: 0.030, 4: 0.033, 5: 0.035, 6: 0.038,
};

const AVG_DAILY_REVENUE = 1000000;
const EXAMPLE_AMOUNT = 10000000;

const calcExample = (rate: number) => {
  const days = Math.ceil(EXAMPLE_AMOUNT / (AVG_DAILY_REVENUE * rate));
  const months = Math.min(6, Math.max(1, Math.ceil(days / 30)));
  const monthlyRate = TERM_RATES[months];
  const interest = Math.round(EXAMPLE_AMOUNT * monthlyRate * months);
  return { months, monthlyRate, interest, total: EXAMPLE_AMOUNT + interest };
};

export function RBFDiscovery() {
  const features = [
    {
      icon: TrendingUp,
      title: "Hạn mức được duyệt",
      value: "Đến 15tr",
      description: "Dựa trên doanh thu và tần suất hoạt động 90 ngày gần nhất",
    },
    {
      icon: Calendar,
      title: "Kỳ hạn tương đương",
      value: "1 – 6 tháng",
      description: "Tỷ lệ trích mỗi chuyến quy ra kỳ hạn tương đương — lãi cố định theo kỳ",
    },
    {
      icon: Percent,
      title: "Trích càng cao, lãi càng thấp",
      value: "10 – 50%",
      description: "Chọn mức trích mỗi chuyến — kỳ ngắn hơn, lãi suất thấp hơn",
    },
  ];

  const benefits = [
    "Tỷ lệ trích mỗi chuyến được quy ra kỳ hạn tương đương — lãi suất cố định theo kỳ, không phát sinh thêm",
    "Trích càng cao → kỳ hạn càng ngắn → lãi suất càng thấp",
    "Tất toán sớm bất kỳ lúc nào từ V-Smart Pay",
    "Theo dõi lịch trích, kỳ hạn và tiến độ hoàn trả ngay trên ứng dụng",
    "Hạn mức được phục hồi sau tất toán — có thể ứng tiếp ngay",
  ];

  const howItWorks = [
    { step: "1", title: "Hệ thống đánh giá hoạt động", desc: "Xét doanh thu, số chuyến và mức độ hoạt động 90 ngày gần nhất để phê duyệt hạn mức" },
    { step: "2", title: "Chọn số tiền và tỷ lệ trích", desc: "Chọn số tiền cần ứng và tỷ lệ trích — hệ thống tính ngay kỳ hạn tương đương và lãi suất áp dụng" },
    { step: "3", title: "Giải ngân vào V-Smart Pay", desc: "Xác nhận và nhận tiền ngay vào ví V-Smart Pay — không cần chờ xét duyệt thêm" },
    { step: "4", title: "Trích tự động sau mỗi chuyến", desc: "Hệ thống tự trích theo tỷ lệ đã chọn cho đến khi hoàn tất kỳ hạn — có thể điều chỉnh % trích hoặc tất toán sớm" },
  ];

  const examples = [
    { rate: 0.1, label: "10%" },
    { rate: 0.2, label: "20%" },
    { rate: 0.3, label: "30%" },
    { rate: 0.4, label: "40%" },
    { rate: 0.5, label: "50%" },
  ];

  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-6 pt-12 pb-16 relative overflow-hidden">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <Building2 className="w-9 h-9" />
          </div>
          <h1 className="text-3xl mb-2">Ứng Doanh Thu</h1>
          <p className="text-white/90 text-lg">Chọn mức trích — kỳ hạn và lãi được tính tự động</p>
        </motion.div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 top-40 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-6 pb-8 space-y-6">

        {/* Key Features */}
        <div className="grid gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-0.5">{feature.title}</p>
                  <p className="text-2xl text-primary mb-0.5">{feature.value}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <h3 className="mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </span>
            Cách thức hoạt động
          </h3>
          <div className="space-y-4">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="mb-0.5">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <h3 className="mb-4">Lợi ích khi sử dụng</h3>
          <div className="space-y-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <p className="text-sm text-foreground/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <h4 className="mb-1 text-primary">Ví dụ minh họa</h4>
          <p className="text-sm text-muted-foreground mb-4">Ứng 10.000.000đ — doanh thu ~1tr/ngày</p>
          <div className="grid grid-cols-2 gap-3">
            {examples.map(({ rate, label }) => {
              const { months, monthlyRate, interest } = calcExample(rate);
              return (
                <div key={label} className="bg-card rounded-xl p-3 border border-border/40 space-y-1.5">
                  <p className="text-primary font-semibold text-sm">Trích {label}/chuyến</p>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div className="flex justify-between">
                      <span>Kỳ hạn:</span>
                      <span className="text-foreground">~{months} tháng</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lãi suất:</span>
                      <span className="text-foreground">{(monthlyRate * 100).toFixed(1)}%/tháng</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tổng lãi:</span>
                      <span className="text-destructive">+{formatCurrency(interest)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/rbf/register">
            <button className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              <span className="text-lg">Đăng ký ngay</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
