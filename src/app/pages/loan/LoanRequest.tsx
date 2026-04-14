import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronRight, Phone } from "lucide-react";
import { MotorbikeIcon } from "../../components/MotorbikeIcon";

const CREDIT_LIMIT = 30000000;
const MONTHLY_RATE = 0.008;
const TERM_OPTIONS = [6, 12, 18, 24, 36];

const VEHICLES = [
  { id: "klara", name: "VinFast Klara S", type: "Xe máy điện", price: 32900000 },
  { id: "feliz", name: "VinFast Feliz S", type: "Xe máy điện", price: 24900000 },
  { id: "evo", name: "VinFast Evo200", type: "Xe máy điện", price: 19900000 },
];

export function LoanRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const initVehicleId = (location.state as any)?.vehicleId || "selex";

  const [step, setStep] = useState<"config" | "otp">("config");
  const [selectedVehicleId, setSelectedVehicleId] = useState(initVehicleId);
  const [termMonths, setTermMonths] = useState(24);
  const [downPaymentRaw, setDownPaymentRaw] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const vehicle = VEHICLES.find((v) => v.id === selectedVehicleId) || VEHICLES[0];
  const minDown = Math.max(0, vehicle.price - CREDIT_LIMIT);
  const parsedDown = parseInt(downPaymentRaw.replace(/\D/g, "")) || 0;
  const downPayment = Math.max(minDown, parsedDown);
  const loanAmount = vehicle.price - downPayment;
  const totalInterest = Math.round(loanAmount * MONTHLY_RATE * termMonths);
  const totalRepay = loanAmount + totalInterest;
  const dailyPayment = Math.ceil(totalRepay / (termMonths * 30));
  const feePercent = ((totalInterest / loanAmount) * 100).toFixed(1);

  const isValid = loanAmount > 0 && loanAmount <= CREDIT_LIMIT;
  const formatCurrency = (v: number) => v.toLocaleString("vi-VN") + "đ";
  const quickDownOptions = [0, 2000000, 5000000, 10000000].filter((a) => a >= minDown && a < vehicle.price);

  const handleOtpChange = (i: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const next = [...otp];
      next[i] = value;
      setOtp(next);
      setOtpError(false);
      if (value && i < 5) otpRefs.current[i + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp]; next[i] = ""; setOtp(next);
      } else if (i > 0) {
        const next = [...otp]; next[i - 1] = ""; setOtp(next);
        otpRefs.current[i - 1]?.focus();
      }
    }
  };

  const handleConfirm = () => {
    navigate("/loan/success", {
      state: { vehicleName: vehicle.name, vehicleType: vehicle.type, loanAmount, downPayment, termMonths, dailyPayment, totalRepay, totalInterest },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white px-6 pt-12 pb-8">
        <button
          onClick={() => step === "otp" ? setStep("config") : navigate("/loan/discovery")}
          className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>
        <h1 className="text-2xl mb-1">{step === "config" ? "Cấu hình khoản vay" : "Xác thực OTP"}</h1>
        <p className="text-white/80">{step === "config" ? "Vay đến 100% giá trị xe" : "Xác nhận để ký hợp đồng và nhận xe"}</p>
      </div>

      {/* Step indicator */}
      <div className="max-w-lg mx-auto px-6 pt-5">
        <div className="flex items-center gap-2 mb-5">
          {["Cấu hình", "Xác thực OTP"].map((label, index) => {
            const stepIndex = step === "config" ? 0 : 1;
            const isActive = index <= stepIndex;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className={`flex items-center gap-1.5 flex-shrink-0 ${isActive ? "text-teal-600" : "text-muted-foreground"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isActive ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {index + 1}
                  </div>
                  <span className="text-xs">{label}</span>
                </div>
                {index < 1 && <div className={`flex-1 h-0.5 mx-2 ${stepIndex > index ? "bg-teal-600" : "bg-muted"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "config" && (
          <motion.div
            key="config"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-lg mx-auto px-6 pb-8 space-y-5"
          >
            {/* Vehicle selector */}
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <MotorbikeIcon className="w-5 h-5 text-teal-600" />
                <h3>Chọn xe</h3>
              </div>
              <div className="space-y-2">
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVehicleId(v.id); setDownPaymentRaw(""); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                      selectedVehicleId === v.id ? "border-teal-500 bg-teal-50" : "border-border hover:border-teal-300"
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-medium ${selectedVehicleId === v.id ? "text-teal-700" : ""}`}>{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.type}</p>
                    </div>
                    <p className={`text-sm ${selectedVehicleId === v.id ? "text-teal-700" : "text-muted-foreground"}`}>
                      {formatCurrency(v.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Down payment */}
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <h3 className="mb-1">Số tiền trả trước</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Tối thiểu {formatCurrency(minDown)} — hạn mức tín dụng {formatCurrency(CREDIT_LIMIT)}
              </p>
              <input
                type="text"
                inputMode="numeric"
                placeholder={formatCurrency(minDown)}
                value={downPaymentRaw ? parseInt(downPaymentRaw).toLocaleString("vi-VN") : ""}
                onChange={(e) => setDownPaymentRaw(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-teal-500 mb-3"
              />
              {quickDownOptions.length > 0 && (
                <div className="flex gap-2">
                  {quickDownOptions.slice(0, 4).map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDownPaymentRaw(String(amt))}
                      className={`flex-1 py-1.5 rounded-lg border text-xs transition-colors ${
                        downPayment === amt ? "border-teal-500 text-teal-700 bg-teal-50" : "border-border hover:border-teal-400"
                      }`}
                    >
                      {amt === 0 ? "Không trả" : `${amt / 1000000}tr`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Term */}
            <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50">
              <h3 className="mb-3">Thời hạn vay</h3>
              <div className="grid grid-cols-5 gap-2">
                {TERM_OPTIONS.map((t) => {
                  const totalInterestForTerm = Math.round(loanAmount * MONTHLY_RATE * t);
                  const dailyForTerm = Math.ceil((loanAmount + totalInterestForTerm) / (t * 30));
                  return (
                    <button
                      key={t}
                      onClick={() => setTermMonths(t)}
                      className={`py-2.5 px-1 rounded-xl border-2 text-center transition-all ${
                        termMonths === t ? "border-teal-500 bg-teal-50 text-teal-700" : "border-border hover:border-teal-300"
                      }`}
                    >
                      <p className={`text-sm font-medium ${termMonths === t ? "text-teal-700" : ""}`}>{t} th</p>
                      <p className={`text-xs mt-0.5 ${termMonths === t ? "text-teal-600" : "text-muted-foreground"}`}>
                        ~{Math.round(dailyForTerm / 1000)}k/ng
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fee preview */}
            <div className="bg-gradient-to-br from-cyan-600 to-teal-700 text-white rounded-2xl p-5 shadow-xl">
              <div className="text-center mb-5">
                <p className="text-white/80 text-sm mb-1">Góp mỗi ngày</p>
                <p className="text-4xl">{formatCurrency(dailyPayment)}</p>
                <p className="text-white/70 text-sm mt-1">trong {termMonths} tháng ({termMonths * 30} ngày)</p>
              </div>
              <div className="space-y-2 text-sm border-t border-white/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-white/80">Số tiền vay:</span>
                  <span>{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Lãi suất:</span>
                  <span>{(MONTHLY_RATE * 100).toFixed(1)}%/tháng</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Tổng lãi ({feePercent}%):</span>
                  <span>+{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between font-medium border-t border-white/20 pt-2">
                  <span>Tổng phải trả:</span>
                  <span>{formatCurrency(totalRepay)}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-2">
                  <span className="text-white/80">Tỷ lệ trích ước tính:</span>
                  <span>~{Math.round((dailyPayment / 350000) * 100)}% doanh thu/ngày</span>
                </div>
              </div>
            </div>

            <button
              disabled={!isValid}
              onClick={() => setStep("otp")}
              className="w-full bg-teal-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-40"
            >
              <span className="text-lg">Ký hợp đồng và nhận xe</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-lg mx-auto px-6 pb-8 space-y-4"
          >
            {/* Summary */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
              <MotorbikeIcon className="w-8 h-8 text-teal-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-teal-800">{vehicle.name}</p>
                <p className="text-sm text-teal-700">Góp {formatCurrency(dailyPayment)}/ngày · {termMonths} tháng</p>
              </div>
            </div>

            {/* OTP */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="mb-2">Xác thực số điện thoại</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Mã OTP đã được gửi đến<br />
                <span className="text-foreground font-medium">0987 654 321</span>
              </p>

              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-xl border-2 rounded-xl focus:outline-none transition-colors ${
                      otpError ? "border-destructive" : digit ? "border-teal-500" : "border-border"
                    }`}
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-sm text-destructive mb-2">Mã OTP không đúng. Vui lòng thử lại.</p>
              )}

              <button className="text-sm text-teal-600 hover:text-teal-700">
                Gửi lại mã OTP
              </button>
            </div>

            <button
              onClick={handleConfirm}
              disabled={otp.some((d) => !d)}
              className="w-full bg-teal-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20 disabled:opacity-40"
            >
              <span className="text-lg">Xác nhận</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
