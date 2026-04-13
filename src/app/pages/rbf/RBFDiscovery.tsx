import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Shield, Check, ChevronRight, Percent, Building2, Zap } from "lucide-react";

export function RBFDiscovery() {
  const features = [
    {
      icon: TrendingUp,
      title: "Hạn mức được phê duyệt",
      value: "Đến 15tr",
      description: "Dựa trên doanh thu và tần suất hoạt động 90 ngày gần nhất",
    },
    {
      icon: Zap,
      title: "Không kỳ hạn cố định",
      value: "Tự động",
      description: "Hệ thống trích theo từng chuyến — không deadline, không áp lực tất toán đúng hạn",
    },
    {
      icon: Percent,
      title: "Trích càng cao, phí càng thấp",
      value: "10 – 50%",
      description: "Chọn 10/20/30/40/50% mỗi chuyến — hoàn tất sớm hơn, phí thấp hơn",
    },
  ];

  const benefits = [
    "Không kỳ hạn — hệ thống trích tự động sau mỗi chuyến cho đến khi hoàn tất",
    "Tỷ lệ trích càng cao, hoàn tất càng nhanh và tổng phí thực tế càng thấp",
    "Tất toán sớm bất kỳ lúc nào từ V-Smart Pay — không phát sinh thêm phí",
    "Theo dõi tiến độ hoàn trả và lịch sử trích từng chuyến ngay trên ứng dụng",
    "Hạn mức được phục hồi sau mỗi lần tất toán — có thể ứng tiếp ngay",
  ];

  const howItWorks = [
    { step: "1", title: "Hệ thống đánh giá hoạt động", desc: "Xét doanh thu, số chuyến và mức độ hoạt động 90 ngày gần nhất để phê duyệt hạn mức" },
    { step: "2", title: "Chọn số tiền và tỷ lệ trích", desc: "Chọn số tiền cần ứng và tỷ lệ trích mỗi chuyến — xem ước tính phí và số ngày hoàn tất" },
    { step: "3", title: "Giải ngân vào V-Smart Pay", desc: "Xác nhận và nhận tiền ngay vào ví V-Smart Pay — không cần chờ xét duyệt thêm" },
    { step: "4", title: "Trích tự động sau mỗi chuyến", desc: "Hệ thống tự trích theo tỷ lệ đã chọn cho đến khi hoàn tất — có thể điều chỉnh hoặc tất toán sớm bất kỳ lúc nào" },
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
          <h1 className="text-3xl mb-2">Ứng Doanh Thu</h1>
          <p className="text-white/90 text-lg">Hoàn trả tự động, không kỳ hạn — trích càng cao, phí càng thấp</p>
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
          <h4 className="mb-4 text-primary">Ví dụ minh họa</h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-2 font-medium">Ứng 10.000.000đ — doanh thu ~1tr/ngày</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { rate: "10%", days: 100, fee: "98.630đ" },
                  { rate: "20%", days: 50, fee: "49.315đ" },
                  { rate: "30%", days: 34, fee: "33.534đ" },
                  { rate: "40%", days: 25, fee: "24.658đ" },
                  { rate: "50%", days: 20, fee: "19.726đ" },
                ].map((row) => (
                  <div key={row.rate} className="bg-card rounded-xl p-3 border border-border/40 space-y-1">
                    <p className="text-primary font-semibold">Trích {row.rate}/chuyến</p>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div className="flex justify-between">
                        <span>Hoàn tất:</span>
                        <span className="text-foreground">~{row.days} ngày</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí ước tính:</span>
                        <span className="text-destructive">{row.fee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
