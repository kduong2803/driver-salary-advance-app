import { Link } from "react-router";
import { motion } from "motion/react";
import { Wallet, TrendingUp, Clock, Shield, ArrowRight, Zap, CalendarDays, Car, Percent, Building2 } from "lucide-react";

export function Home() {
  const services = [
    {
      id: "ewa",
      title: "Ứng Thu Nhập Tài Xế",
      subtitle: "Ứng trên phần thu nhập đã phát sinh",
      description: "Dành cho tài xế đã ký hợp đồng muốn ứng trước phần thu nhập gồm lương cứng và doanh thu đã phát sinh trong kỳ",
      icon: Wallet,
      gradient: "from-cyan-400 to-cyan-600",
      link: "/ewa/discovery",
      features: ["Ứng 50-70% thu nhập khả dụng", "Hạn mức tăng theo từng cuốc xe", "Tự động khấu trừ cuối kỳ"],
    },
    {
      id: "rbf",
      title: "Ứng Doanh Thu",
      subtitle: "Ứng theo hạn mức đã phê duyệt",
      description: "Dành cho tài xế và đối tác GSM muốn ứng trước doanh thu theo lịch sử hoạt động và hoàn trả bằng tỷ lệ trích trên doanh thu",
      icon: TrendingUp,
      gradient: "from-cyan-500 to-teal-600",
      link: "/rbf/discovery",
      features: ["Hạn mức phê duyệt tự động", "Trích % doanh thu mỗi chuyến"],
    },
  ];

  const productExplainers = [
    {
      id: "ewa",
      title: "Ứng thu nhập cho tài xế có hợp đồng",
      intro: "Ứng trước phần thu nhập đã phát sinh trong kỳ, gồm lương cứng phân bổ và doanh thu từ các cuốc đã hoàn thành.",
      icon: Wallet,
      accent: "text-primary",
      bg: "bg-primary/10",
      stats: [
        { label: "Ngày công đã chạy", value: "22 ngày", icon: CalendarDays },
        { label: "Thu nhập từ cuốc xe", value: "12.400.000đ", icon: Car },
        { label: "Được ứng tối đa", value: "70%", icon: Percent },
      ],
      bullets: [
        "Số tiền có thể ứng được tính từ lương cứng phân bổ và thu nhập từ cuốc xe đã hoàn thành",
        "Hạn mức ứng được cập nhật sau mỗi cuốc xe, nên bạn luôn thấy phần thu nhập đã sẵn sàng để rút",
        "Khoản ứng được khấu trừ tự động từ thu nhập cuối kỳ, không cần thao tác thủ công",
      ],
    },
    {
      id: "rbf",
      title: "Ứng doanh thu cho tài xế và đối tác GSM",
      intro: "Ứng trước doanh thu dựa trên lịch sử hoạt động, dành cho cả tài xế lẫn đối tác cá nhân hợp tác với GSM.",
      icon: Building2,
      accent: "text-cyan-700",
      bg: "bg-cyan-500/10",
      stats: [
        { label: "Doanh thu 90 ngày", value: "90.000.000đ", icon: TrendingUp },
        { label: "Hạn mức được duyệt", value: "15.000.000đ", icon: Wallet },
        { label: "Tỷ lệ trích hoàn trả", value: "10–50%", icon: Percent },
      ],
      bullets: [
        "Hạn mức được duyệt trước dựa trên doanh thu và tần suất hoạt động gần đây",
        "Theo dõi số đã ứng, tiến độ hoàn trả và lịch sử trích theo từng chuyến ngay trên ứng dụng",
        "Tỷ lệ trích càng cao, phí càng thấp — tự chủ tốc độ hoàn trả để tiết kiệm chi phí thực",
      ],
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Nhanh chóng",
      description: "Duyệt trong 5 phút, tiền về tức thì",
    },
    {
      icon: Shield,
      title: "An toàn",
      description: "Bảo mật thông tin, minh bạch phí",
    },
    {
      icon: Zap,
      title: "Tự động",
      description: "Hoàn trả tự động, không kỳ hạn, không phát sinh phí",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-white px-6 pt-12 pb-8 rounded-b-3xl shadow-lg"
      >
        <h1 className="text-3xl mb-2">XanhSM</h1>
        <p className="text-primary-foreground/80">Giải pháp tài chính thông minh cho tài xế</p>
      </motion.div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-8">
        {/* Services */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.link}>
                <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl px-1">Hiểu nhanh từng sản phẩm</h2>
          <div className="space-y-4">
            {productExplainers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-xl ${product.bg} flex items-center justify-center flex-shrink-0`}>
                    <product.icon className={`w-6 h-6 ${product.accent}`} />
                  </div>
                  <div>
                    <h3 className="mb-1">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.intro}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-muted/40 p-3 border border-border/40">
                      <stat.icon className={`w-4 h-4 mb-2 ${product.accent}`} />
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-sm">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {product.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full ${product.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <div className={`w-2 h-2 rounded-full ${product.id === "ewa" ? "bg-primary" : "bg-cyan-700"}`} />
                      </div>
                      <p className="text-sm text-foreground/80">{bullet}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <h2 className="text-xl px-1">Tại sao chọn chúng tôi?</h2>
          <div className="grid grid-cols-3 gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-card rounded-xl p-4 text-center border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-sm mb-1">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="mb-1 text-primary">Cam kết bảo mật</h4>
              <p className="text-sm text-foreground/70">
                Thông tin của bạn được mã hóa và bảo vệ theo tiêu chuẩn ngân hàng.
                Chúng tôi không chia sẻ dữ liệu với bên thứ ba.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
