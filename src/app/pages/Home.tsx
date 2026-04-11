import { Link } from "react-router";
import { motion } from "motion/react";
import { Wallet, TrendingUp, Clock, Shield, ArrowRight, Zap } from "lucide-react";

export function Home() {
  const services = [
    {
      id: "ewa",
      title: "Ứng Lương Tài Xế",
      subtitle: "EWA - Earned Wage Access",
      description: "Nhận lương trước khi đến ngày trả, hỗ trợ tài xế chi tiêu hợp lý",
      icon: Wallet,
      gradient: "from-cyan-400 to-cyan-600",
      link: "/ewa/discovery",
      features: ["Ứng tới 50% lương", "Phí thấp 1-2%", "Hoàn trả tự động"],
    },
    {
      id: "rbf",
      title: "Ứng Doanh Thu Fleet",
      subtitle: "RBF - Revenue Based Financing",
      description: "Ứng doanh thu cho chủ xe, đối tác fleet dựa trên hiệu quả vận hành",
      icon: TrendingUp,
      gradient: "from-cyan-500 to-teal-600",
      link: "/rbf/discovery",
      features: ["Hạn mức cao", "Trả theo % doanh thu", "Linh hoạt thời gian"],
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
      description: "Hoàn trả tự động, không lo quên",
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
        <h1 className="text-3xl mb-2">XanhSM Tài Chính</h1>
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
