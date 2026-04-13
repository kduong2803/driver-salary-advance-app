import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Wallet, TrendingUp, Shield, Clock, Check, ChevronRight, CalendarDays, Percent } from "lucide-react";

export function EWADiscovery() {
  const features = [
    {
      icon: CalendarDays,
      title: "Thu nhập đã phát sinh",
      value: "15.000.000đ",
      description: "Gồm lương cứng phân bổ và thu nhập từ các cuốc đã hoàn thành",
    },
    {
      icon: Percent,
      title: "Tỷ lệ được ứng",
      value: "50-70%",
      description: "Chỉ áp dụng trên phần thu nhập khả dụng sau khi trừ giữ lại",
    },
    {
      icon: Clock,
      title: "Hạn mức cập nhật liên tục",
      value: "7-30 ngày",
      description: "Hạn mức tăng sau mỗi cuốc xe và ngày công thực tế.",
    },
  ];

  const benefits = [
    "Cuối kỳ lương, khoản ứng tự động được trừ vào thu nhập — không cần nhớ, không cần thao tác",
    "Chỉ ứng phần thu nhập đã có trong kỳ — lương cứng phân bổ và doanh thu từ cuốc xe đã hoàn thành",
    "Hạn mức tăng sau mỗi cuốc xe và ngày công, ứng thêm bất cứ lúc nào trong tháng",
    "Xem rõ lương cứng và doanh thu cuốc xe riêng biệt, minh bạch từng khoản",
    "Biết trước phí dịch vụ và số tiền thực nhận ngay trước khi xác nhận",
  ];

  const howItWorks = [
    { step: "1", title: "Hệ thống tính thu nhập khả dụng", desc: "Cộng lương cứng phân bổ và cuốc đã hoàn thành" },
    { step: "2", title: "Hiển thị phần có thể ứng", desc: "Trừ khoản giữ lại, chờ xử lý và giới hạn trong 50-70%" },
    { step: "3", title: "Chọn số tiền cần ứng", desc: "Xem phí, số tiền thực nhận và xác nhận giao dịch" },
    { step: "4", title: "Khấu trừ tự động cuối kỳ", desc: "Trừ toàn bộ khoản ứng từ thu nhập phát sinh vào cuối kỳ thanh toán" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white px-6 pt-12 pb-32 relative overflow-hidden">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
            <Wallet className="w-9 h-9" />
          </div>
          <h1 className="text-3xl mb-2">Ứng Lương Tài Xế</h1>
          <p className="text-white/90 text-lg">Ứng trước trên phần thu nhập bạn đã kiếm được</p>
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 top-40 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-6 pb-8 space-y-6">
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50">
          <h3 className="mb-4">Thu nhập khả dụng được tính như thế nào?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lương cứng phân bổ theo ngày</span>
              <span>4.200.000đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Thu nhập từ cuốc đã hoàn thành</span>
              <span>10.800.000đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Khoản giữ lại / chờ xử lý</span>
              <span className="text-destructive">-1.500.000đ</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span>Thu nhập khả dụng</span>
              <span className="text-primary">13.500.000đ</span>
            </div>
            <div className="flex justify-between">
              <span>Có thể ứng tối đa (70%)</span>
              <span className="text-primary">9.450.000đ</span>
            </div>
          </div>
        </div>
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
            {howItWorks.map((item, index) => (
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
          <h4 className="mb-3 text-primary">Ví dụ minh họa</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số tiền ứng:</span>
              <span>10.000.000đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phí dịch vụ (1.5%):</span>
              <span>150.000đ</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between">
              <span>Số tiền thực nhận:</span>
              <span className="text-lg text-primary">9.850.000đ</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/ewa/register">
            <button className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              <span className="text-lg">Đăng ký ngay</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật
          </p>
        </motion.div>
      </div>
    </div>
  );
}
