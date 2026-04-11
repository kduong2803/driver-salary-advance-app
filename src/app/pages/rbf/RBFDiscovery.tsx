import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Shield, Check, ChevronRight, Percent, Calendar, Building2 } from "lucide-react";

export function RBFDiscovery() {
  const features = [
    {
      icon: TrendingUp,
      title: "Hạn mức được phê duyệt",
      value: "90.000.000đ",
      description: "Dựa trên doanh thu, số xe hoạt động và tần suất vận hành 90 ngày gần nhất",
    },
    {
      icon: Percent,
      title: "Tỷ lệ trích doanh thu",
      value: "8-10%",
      description: "Tự động trích trên doanh thu phát sinh để hoàn trả khoản ứng",
    },
    {
      icon: Calendar,
      title: "Thời gian ước tính",
      value: "60-90 ngày",
      description: "Phụ thuộc vào mức doanh thu thực tế trong giai đoạn hoàn trả",
    },
  ];

  const benefits = [
    "Hạn mức được duyệt trước để bạn chủ động kế hoạch chi tiêu vận hành",
    "Hoàn trả bằng tỷ lệ trích doanh thu, không cần lịch trả cố định",
    "Theo dõi rõ số đã ứng, số còn lại và tiến độ hoàn trả theo doanh thu phát sinh",
    "Phù hợp khi cần thêm dòng tiền ngắn hạn cho nhiên liệu, bảo dưỡng và chi phí vận hành đội xe",
    "Minh bạch mức phí, tỷ lệ trích và số tiền còn phải hoàn trả",
  ];

  const howItWorks = [
    { step: "1", title: "Hệ thống đánh giá hoạt động", desc: "Xét doanh thu, số chuyến và mức độ hoạt động gần đây" },
    { step: "2", title: "Cấp hạn mức ứng doanh thu", desc: "Hiển thị số tiền có thể ứng và tỷ lệ trích hoàn trả" },
    { step: "3", title: "Giải ngân về ví hoặc ngân hàng", desc: "Xác nhận khoản ứng và nhận tiền ngay" },
    { step: "4", title: "Trích doanh thu tự động", desc: "Khấu trừ một tỷ lệ phần trăm từ doanh thu phát sinh cho đến khi hoàn tất" },
  ];

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
          <h1 className="text-3xl mb-2">Ứng doanh thu đội fleet GSM</h1>
          <p className="text-white/90 text-lg">Ứng trước doanh thu cho đội 5-10 xe để xoay vòng vận hành</p>
        </motion.div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 top-40 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-6 pb-8 space-y-6">
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50">
          <h3 className="mb-4">Hạn mức được xác định như thế nào?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Doanh thu 90 ngày</span>
              <span>720.000.000đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Số xe đang vận hành</span>
              <span>7 xe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Doanh thu trung bình/ngày</span>
              <span>8.000.000đ</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span>Hạn mức được duyệt</span>
              <span className="text-primary">90.000.000đ</span>
            </div>
            <div className="flex justify-between">
              <span>Tỷ lệ trích doanh thu</span>
              <span className="text-primary">10% / giao dịch</span>
            </div>
          </div>
        </div>

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

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
          <h4 className="mb-3 text-primary">Ví dụ minh họa</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Kịch bản:</p>
              <p>Ứng 60.000.000đ với tỷ lệ hoàn trả 10% trên doanh thu phát sinh của đội xe</p>
            </div>
            <div className="h-px bg-border" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doanh thu 500.000đ:</span>
                <span>Trích 50.000đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doanh thu 1.000.000đ:</span>
                <span>Trích 100.000đ</span>
              </div>
            </div>
            <div className="h-px bg-border" />
            <p className="text-xs text-muted-foreground">
              Với doanh thu trung bình 8 triệu/ngày, khoản ứng dự kiến hoàn tất trong khoảng 75 ngày.
            </p>
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
