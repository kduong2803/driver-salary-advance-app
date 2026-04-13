import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Car, ChevronRight } from "lucide-react";

const CREDIT_LIMIT = 30000000;
const MONTHLY_RATE = 0.008;
const TERM_OPTIONS = [12, 18, 24, 36];

const VEHICLES = [
  { id: "klara", name: "VinFast Klara S", type: "Xe máy điện", price: 32900000 },
  { id: "selex", name: "Selex Camel", type: "Xe máy điện", price: 24900000 },
  { id: "evo", name: "VinFast Evo200", type: "Xe máy điện", price: 19900000 },
];

export function LoanRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const initVehicleId = (location.state as any)?.vehicleId || "selex";

  const [selectedVehicleId, setSelectedVehicleId] = useState(initVehicleId);
  const [termMonths, setTermMonths] = useState(24);
  const [downPaymentRaw, setDownPaymentRaw] = useState("");

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

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-violet-500 to-purple-700 text-white px-6 pt-12 pb-8">
        <Link to="/loan/discovery" className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
        <h1 className="text-2xl mb-1">Cấu hình khoản vay</h1>
        <p className="text-white/80">Hạn mức được duyệt: {formatCurrency(CREDIT_LIMIT)}</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-5">

        {/* Vehicle selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-violet-600" />
            <h3>Chọn xe</h3>
          </div>
          <div className="space-y-2">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => { setSelectedVehicleId(v.id); setDownPaymentRaw(""); }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                  selectedVehicleId === v.id ? "border-violet-500 bg-violet-50" : "border-border hover:border-violet-300"
                }`}
              >
                <div>
                  <p className={`text-sm font-medium ${selectedVehicleId === v.id ? "text-violet-700" : ""}`}>{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.type}</p>
                </div>
                <p className={`text-sm ${selectedVehicleId === v.id ? "text-violet-700" : "text-muted-foreground"}`}>
                  {formatCurrency(v.price)}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Down payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <h3 className="mb-1">Số tiền trả trước</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {minDown > 0
              ? `Tối thiểu ${formatCurrency(minDown)} do giá xe vượt hạn mức`
              : "Trả trước để giảm số tiền góp hàng ngày — không bắt buộc"}
          </p>
          <input
            type="text"
            inputMode="numeric"
            placeholder={minDown > 0 ? formatCurrency(minDown) : "0đ (không bắt buộc)"}
            value={downPaymentRaw ? parseInt(downPaymentRaw).toLocaleString("vi-VN") : ""}
            onChange={(e) => setDownPaymentRaw(e.target.value.replace(/\D/g, ""))}
            className="w-full border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-violet-500 mb-3"
          />
          {quickDownOptions.length > 0 && (
            <div className="flex gap-2">
              {quickDownOptions.slice(0, 4).map((amt) => (
                <button
                  key={amt}
                  onClick={() => setDownPaymentRaw(String(amt))}
                  className={`flex-1 py-1.5 rounded-lg border text-xs transition-colors ${
                    downPayment === amt ? "border-violet-500 text-violet-700 bg-violet-50" : "border-border hover:border-violet-400"
                  }`}
                >
                  {amt === 0 ? "Không trả" : `${amt / 1000000}tr`}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Term */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-5 shadow-sm border border-border/50"
        >
          <h3 className="mb-3">Thời hạn vay</h3>
          <div className="grid grid-cols-4 gap-2">
            {TERM_OPTIONS.map((t) => (
              <button
                key={t}
                onClick={() => setTermMonths(t)}
                className={`py-3 rounded-xl border-2 text-sm transition-all ${
                  termMonths === t ? "border-violet-500 bg-violet-50 text-violet-700 font-medium" : "border-border hover:border-violet-300"
                }`}
              >
                {t} th
              </button>
            ))}
          </div>
        </motion.div>

        {/* Fee preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-violet-500 to-purple-700 text-white rounded-2xl p-5 shadow-xl"
        >
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
              <span>Tổng hoàn trả:</span>
              <span>{formatCurrency(totalRepay)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <button
            disabled={!isValid}
            onClick={() =>
              navigate("/loan/success", {
                state: {
                  vehicleName: vehicle.name,
                  vehicleType: vehicle.type,
                  loanAmount,
                  downPayment,
                  termMonths,
                  dailyPayment,
                  totalRepay,
                  totalInterest,
                },
              })
            }
            className="w-full bg-violet-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20 disabled:opacity-40"
          >
            <span className="text-lg">Ký hợp đồng và nhận xe</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
