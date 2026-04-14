import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, Shield } from "lucide-react";
import { MotorbikeIcon } from "../../components/MotorbikeIcon";

const CREDIT_LIMIT = 30000000;
const MONTHLY_RATE = 0.008;
const DEFAULT_TERM = 24;

const VEHICLES = [
  { id: "klara", name: "VinFast Klara S", type: "Xe máy điện", price: 32900000, range: "90 km/sạc", tag: "Phổ biến nhất" },
  { id: "feliz", name: "VinFast Feliz S", type: "Xe máy điện", price: 24900000, range: "100 km/sạc", tag: null },
  { id: "evo", name: "VinFast Evo200", type: "Xe máy điện", price: 19900000, range: "120 km/sạc", tag: "Tiết kiệm" },
];

export function LoanDiscovery() {
  const navigate = useNavigate();

  const calcDailyPayment = (price: number) => {
    const loan = Math.min(price, CREDIT_LIMIT);
    const totalInterest = loan * MONTHLY_RATE * DEFAULT_TERM;
    return Math.ceil((loan + totalInterest) / (DEFAULT_TERM * 30));
  };

  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white px-6 pt-12 pb-16 relative overflow-hidden">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl mb-2">Vay Mua Xe</h1>
          <p className="text-white/90 text-lg mb-5">Hạn mức được phê duyệt sẵn — chọn xe, ký hợp đồng và nhận xe ngay trong ngày</p>
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-white/80 text-sm mb-1">Vay tối đa</p>
            <p className="text-4xl">100% giá trị xe</p>
          </div>
        </motion.div>

        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 top-40 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto px-6 pt-6 pb-8 space-y-6">

        {/* Vehicle Options */}
        <div>
          <h3 className="mb-3 px-1">Chọn xe phù hợp với bạn</h3>
          <div className="space-y-3">
            {VEHICLES.map((v, i) => {
              const daily = calcDailyPayment(v.price);
              const needsDown = v.price > CREDIT_LIMIT;
              return (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <button
                    onClick={() => navigate("/loan/request", { state: { vehicleId: v.id } })}
                    className="w-full bg-card rounded-2xl p-5 border border-border/50 hover:border-teal-400 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MotorbikeIcon className="w-7 h-7 text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-medium">{v.name}</p>
                            <p className="text-sm text-muted-foreground">{v.type} • {v.range}</p>
                          </div>
                          {v.tag && (
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full whitespace-nowrap">{v.tag}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Giá niêm yết</p>
                            <p className="text-sm">{formatCurrency(v.price)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Góp mỗi ngày (~{DEFAULT_TERM}th)</p>
                            <p className="text-lg text-teal-600">~{formatCurrency(daily)}</p>
                          </div>
                        </div>
                        {needsDown && (
                          <p className="text-xs text-amber-600 mt-2">Trả trước tối thiểu {formatCurrency(v.price - CREDIT_LIMIT)}</p>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
          <h3 className="mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-teal-600" />
            </span>
            Cách thức hoạt động
          </h3>
          <div className="space-y-4">
            {[
              { step: "1", title: "Chọn xe và xem ngay số tiền góp", desc: "Chọn xe, điều chỉnh trả trước và kỳ hạn — số tiền góp hàng ngày hiển thị tức thì" },
              { step: "2", title: "Xác nhận và ký trên ứng dụng", desc: "Xem lại thông tin khoản vay và ký xác nhận ngay trên app — không cần giấy tờ" },
              { step: "3", title: "Nhận xe ngay trong ngày", desc: "Thanh toán được chuyển thẳng cho đại lý, bạn nhận phiếu lấy xe ngay sau đó" },
              { step: "4", title: "Trả góp tự động mỗi ngày", desc: "Thu nhập từ cuốc xe được trích trước — phần còn lại tự động từ ví lúc 23h, không cần nhớ" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
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
            {[
              "Hạn mức được phê duyệt sẵn — quy trình đơn giản, hoàn tất nhanh chóng",
              "Số tiền góp hàng ngày nhỏ, không áp lực — phù hợp với thu nhập chạy xe",
              "Trả nợ tự động mỗi ngày, không lo quên hay phát sinh phí trễ hạn",
              "Trả hết sớm bất kỳ lúc nào — không tính thêm phí",
            ].map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-teal-600" />
                </div>
                <p className="text-sm text-foreground/80">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Example */}
        <div className="bg-gradient-to-r from-teal-500/10 to-teal-500/5 rounded-2xl p-6 border border-teal-500/20">
          <h4 className="mb-4 text-teal-700">Ví dụ minh họa</h4>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">Vay 24.900.000đ — kỳ hạn 24 tháng — lãi 0.8%/tháng</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Tổng lãi", value: "4.780.800đ", sub: "19.2% tổng khoản vay" },
                { label: "Tổng phải trả", value: "29.680.800đ", sub: "Trả trong 720 ngày" },
                { label: "Góp mỗi ngày", value: "~42.000đ", sub: "Trừ tự động lúc 23h" },
                { label: "Thời gian vay", value: "24 tháng", sub: "Tất toán sớm miễn phí" },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-xl p-3 border border-border/40">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-teal-700">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/loan/request">
            <button className="w-full bg-teal-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
              <span className="text-lg">Chọn xe và đăng ký</span>
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
