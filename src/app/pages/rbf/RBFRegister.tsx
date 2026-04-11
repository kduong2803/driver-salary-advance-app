import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Shield, FileText, Phone } from "lucide-react";

export function RBFRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"terms" | "otp" | "success">("terms");
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    setStep("success");
    setTimeout(() => {
      navigate("/rbf/request");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/rbf/discovery" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Đăng ký dịch vụ RBF</h1>
        <p className="text-white/80">Hoàn tất các bước để kích hoạt</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {["Điều khoản", "Xác thực OTP", "Hoàn tất"].map((label, index) => {
            const stepIndex = step === "terms" ? 0 : step === "otp" ? 1 : 2;
            const isActive = index <= stepIndex;
            const isCurrent = index === stepIndex;

            return (
              <div key={label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                  >
                    {isActive ? <CheckCircle2 className="w-5 h-5" /> : <span>{index + 1}</span>}
                  </div>
                  <span className={`text-xs ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-0.5 flex-1 mx-2 mb-8 ${isActive ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Terms Step */}
        {step === "terms" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1">Điều khoản sử dụng dịch vụ RBF</h3>
                  <p className="text-sm text-muted-foreground">
                    Vui lòng đọc kỹ trước khi đồng ý
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 max-h-64 overflow-y-auto space-y-3 text-sm">
                <div>
                  <h4 className="mb-1">1. Phạm vi dịch vụ</h4>
                  <p className="text-muted-foreground">
                    Dịch vụ ứng doanh thu cho phép đối tác fleet nhận trước vốn kinh doanh,
                    với tỷ lệ hoàn trả từ 8-12% trên doanh thu thực tế của từng chuyến xe.
                  </p>
                </div>
                <div>
                  <h4 className="mb-1">2. Cơ chế hoàn trả</h4>
                  <p className="text-muted-foreground">
                    Tỷ lệ phần trăm doanh thu sẽ được tự động trích từ mỗi chuyến xe hoàn thành
                    cho đến khi tất toán đầy đủ. Không có kỳ hạn cố định, linh hoạt theo
                    hiệu quả kinh doanh thực tế.
                  </p>
                </div>
                <div>
                  <h4 className="mb-1">3. Hạn mức và đánh giá</h4>
                  <p className="text-muted-foreground">
                    Hạn mức được phê duyệt dựa trên lịch sử vận hành 90 ngày gần nhất.
                    Hạn mức có thể được điều chỉnh theo hiệu quả hoàn trả.
                  </p>
                </div>
                <div>
                  <h4 className="mb-1">4. Quyền và trách nhiệm</h4>
                  <p className="text-muted-foreground">
                    Đối tác cam kết sử dụng vốn đúng mục đích kinh doanh và duy trì
                    hoạt động vận hành ổn định. Chúng tôi cam kết bảo mật thông tin
                    và minh bạch trong toàn bộ quá trình.
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 text-primary rounded border-border focus:ring-primary"
              />
              <span className="text-sm">
                Tôi đã đọc, hiểu rõ và đồng ý với các Điều khoản dịch vụ RBF và Chính sách bảo mật
              </span>
            </label>

            <button
              onClick={() => setStep("otp")}
              disabled={!agreed}
              className="w-full bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Tiếp tục
            </button>
          </motion.div>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Xác thực số điện thoại</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Mã OTP đã được gửi đến số điện thoại<br />
                <span className="text-foreground">0987 654 321</span>
              </p>

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-14 text-center text-xl bg-input-background border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  />
                ))}
              </div>

              <button className="text-sm text-primary">
                Gửi lại mã OTP
              </button>
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.some((d) => !d)}
              className="w-full bg-primary text-white py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Xác nhận
            </button>
          </motion.div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-2xl mb-2">Kích hoạt thành công!</h2>
            <p className="text-muted-foreground mb-8">
              Bạn đã có thể sử dụng dịch vụ ứng doanh thu
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Đang chuyển hướng...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
