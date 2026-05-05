import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, FileText, Phone, Shield, Building2 } from "lucide-react";
import { useFinanceStore } from "../../data/financeStore";

export function YieldRegister() {
  const navigate = useNavigate();
  const { registerYield } = useFinanceStore();
  const [step, setStep] = useState<"terms" | "otp" | "success">("terms");
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const next = [...otp];
      next[index] = value;
      setOtp(next);
      if (value && index < 5) {
        document.getElementById(`otp-yield-${index + 1}`)?.focus();
      }
    }
  };

  const handleVerify = () => {
    registerYield();
    setStep("success");
    setTimeout(() => navigate("/yield/detail"), 2000);
  };

  const stepIndex = step === "terms" ? 0 : step === "otp" ? 1 : 2;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-white px-6 pt-12 pb-8">
        <Link to="/yield/discovery" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Đăng ký V-Smart Save</h1>
        <p className="text-white/80">Xác nhận điều khoản để bắt đầu sinh lời tự động</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {["Điều khoản", "Xác thực OTP", "Hoàn tất"].map((label, index) => (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  index <= stepIndex ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                } ${index === stepIndex ? "ring-4 ring-primary/20" : ""}`}>
                  {index < stepIndex ? <CheckCircle2 className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <span className={`text-xs ${index <= stepIndex ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
              {index < 2 && (
                <div className={`h-0.5 flex-1 mx-2 mb-8 ${index < stepIndex ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        {step === "terms" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1">Điều khoản V-Smart Save</h3>
                  <p className="text-sm text-muted-foreground">Vui lòng đọc kỹ trước khi đồng ý</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 max-h-56 overflow-y-auto space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">1. Phạm vi dịch vụ</h4>
                  <p className="text-muted-foreground">V-Smart Save là dịch vụ sinh lời tự động trên số dư ví V-Smart Pay, thực hiện qua đối tác quản lý tài sản WealthNet được cấp phép bởi NHNN.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">2. Cơ chế sinh lời</h4>
                  <p className="text-muted-foreground">Lãi suất 5,75%/năm, tính theo số dư cuối ngày. Tiền lời được cộng vào số dư V-Smart Save vào cuối mỗi tháng.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">3. Rút tiền</h4>
                  <p className="text-muted-foreground">Bạn có thể rút toàn bộ hoặc một phần về ví V-Smart Pay bất kỳ lúc nào mà không mất phí. Tiền lời đã tích lũy đến ngày rút vẫn được ghi nhận đầy đủ.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">4. Rủi ro</h4>
                  <p className="text-muted-foreground">Lãi suất có thể thay đổi theo thị trường. V-Smart Pay đóng vai trò nền tảng phân phối và không chịu trách nhiệm về rủi ro đầu tư của WealthNet.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">5. Bảo mật dữ liệu</h4>
                  <p className="text-muted-foreground">Thông tin cá nhân của bạn được chia sẻ với WealthNet để thực hiện dịch vụ theo quy định bảo vệ dữ liệu cá nhân hiện hành.</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Đối tác: WealthNet</span>
              </div>
              <p className="text-xs text-primary">Tiền được lưu ký tại WealthNet, đơn vị quản lý tài sản có phép hoạt động tại Việt Nam.</p>
            </div>

            <label className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 accent-primary rounded border-border"
              />
              <span className="text-sm">
                Tôi đã đọc, hiểu rõ và đồng ý với Điều khoản dịch vụ V-Smart Save và Chính sách bảo mật
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

        {step === "otp" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2">Xác thực số điện thoại</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Mã OTP đã được gửi đến số điện thoại<br />
                <span className="text-foreground font-medium">0912 345 678</span>
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-yield-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-14 text-center text-xl bg-input-background border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                  />
                ))}
              </div>
              <button className="text-sm text-primary">Gửi lại mã OTP</button>
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

        {step === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-2xl mb-2">Đăng ký thành công!</h2>
            <p className="text-muted-foreground mb-4">
              V-Smart Save đã được kích hoạt. Nạp tiền để bắt đầu sinh lời ngay hôm nay.
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
