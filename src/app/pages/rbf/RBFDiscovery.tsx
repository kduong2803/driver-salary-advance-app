import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Shield, Check, ChevronRight, Percent, Calendar, Building2, Zap } from "lucide-react";

const TERMS = [
  { days: 7,  fee: "0.7%", minRate: "50%", maxAmount: "3.000.000đ" },
  { days: 14, fee: "1.4%", minRate: "40%", maxAmount: "5.000.000đ" },
  { days: 30, fee: "3.0%", minRate: "30%", maxAmount: "10.000.000đ" },
  { days: 60, fee: "6.0%", minRate: "20%", maxAmount: "15.000.000đ" },
];

export function RBFDiscovery() {
  const features = [
    {
      icon: TrendingUp,
      title: "Hạn mức được phê duyệt",
      value: "Đến 15tr",
      description: "Dựa trên doanh thu và tần suất hoạt động 90 ngày gần nhất",
    },
    {
      icon: Calendar,
      title: "Kỳ hạn linh hoạt",
      value: "7 – 60 ngày",
      description: "Chọn kỳ hạn phù hợp với nhu cầu dòng tiền — phí thay đổi theo kỳ",
    },
    {
      icon: Percent,
      title: "Tỷ lệ trích / chuyến",
      value: "20 – 50%",
      description: "Tự điều chỉnh tăng để tất toán nhanh hơn, giảm tổng phí trả",
    },
  ];

  const benefits = [
    "Chọn kỳ hạn 7/14/30/60 ngày — phí flat cố định, biết trước trước khi xác nhận",
    "Tất toán sớm bất kỳ lúc nào từ V-Smart Pay — không phát sinh thêm phí",
    "Tự tăng tỷ lệ trích để trả nhanh hơn, giảm bớt số ngày chịu phí",
    "Phù hợp bổ sung dòng tiền cho nhiên liệu, bảo dưỡng và chi phí vận hành",
    "Hạn mức được phục hồi sau mỗi lần tất toán — có thể ứng tiếp ngay",
  ];

  const howItWorks = [
    { step: "1", title: "Hệ thống đánh giá hoạt động", desc: "Xét doanh thu, số chuyến và mức độ hoạt động 90 ngày gần nhất" },
    { step: "2", title: "Chọn kỳ hạn và số tiền", desc: "Chọn 7/14/30/60 ngày — xem phí, tỷ lệ trích và ước tính thời gian hoàn tất" },
    { step: "3", title: "Giải ngân về ví hoặc ngân hàng", desc: "Xác nhận và nhận tiền ngay vào V-Smart Pay hoặc tài khoản ngân hàng" },
    { step: "4", title: "Tự động trích từ mỗi chuyến", desc: "Hệ thống trích theo tỷ lệ đã chọn cho đến khi hoàn tất — hoặc tất toán sớm bất kỳ lúc nào" },
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
          <p className="text-white/90 text-lg">Dành cho tài xế và đối tác GSM — chọn kỳ hạn, biết trước phí, tất toán sớm không mất thêm</p>
        </motion.div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 top-40 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-6 pb-8 space-y-6">

        {/* Term Comparison Table */}
        <div className="bg-card rounded-2xl p-5 shadow-lg border border-border/50">
          <h3 className="mb-4">Bảng kỳ hạn & phí dịch vụ</h3>
          <div className="grid grid-cols-2 gap-2">
            {TERMS.map((t) => (
              <div key={t.days} className="bg-muted/40 rounded-xl p-3 space-y-1.5">
                <p className="font-semibold text-primary">{t.days} ngày</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Phí flat:</span>
                    <span className="text-foreground">{t.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trích tối thiểu:</span>
                    <span className="text-foreground">{t.minRate}/chuyến</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hạn mức tối đa:</span>
                    <span className="text-primary">{t.maxAmount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Phí tính một lần khi giải ngân. Tất toán sớm không phát sinh thêm phí.
          </p>
        </div>

        {/* Early Payoff Highlight */}
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="mb-1 text-primary">Tất toán sớm — tiết kiệm chi phí thực</p>
            <p className="text-sm text-foreground/80">
              Trả phần dư còn lại từ V-Smart Pay bất kỳ lúc nào trong kỳ hạn.
              Phí đã được tính cố định khi giải ngân — tất toán sớm không phát sinh thêm.
            </p>
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
              <p className="text-muted-foreground mb-2 font-medium">Kỳ hạn 30 ngày — ứng 10.000.000đ</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Số tiền giải ngân:</span>
                  <span>10.000.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí dịch vụ (3.0%):</span>
                  <span>300.000đ</span>
                </div>
                <div className="h-px bg-border my-1" />
                <div className="flex justify-between">
                  <span>Tổng phải hoàn trả:</span>
                  <span className="text-primary font-medium">10.300.000đ</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="text-muted-foreground mb-2 font-medium">Tiến độ hoàn trả (doanh thu ~1tr/ngày, trích 30%)</p>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chuyến 185.000đ:</span>
                  <span>Trích 55.500đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mỗi ngày (~10 chuyến):</span>
                  <span>Trích ~300.000đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ước tính hoàn tất:</span>
                  <span className="text-primary">~34 ngày</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Tăng tỷ lệ trích lên 40% → hoàn tất trong ~26 ngày, đúng trong kỳ hạn 30 ngày.
              </p>
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
