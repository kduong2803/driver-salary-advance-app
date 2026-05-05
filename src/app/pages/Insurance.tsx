import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  Gauge,
  Leaf,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Link } from "react-router";
import { formatCurrency, formatNumber, InsuranceProduct, useFinanceStore } from "../data/financeStore";
import { productDetails } from "../data/insuranceData";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";

export function Insurance() {
  const { state, toggleInsurance, deductGreenSavings } = useFinanceStore();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [productDeductions, setProductDeductions] = useState<Record<string, number>>({});

  const remainingGreenSavings = Math.max(0, state.greenSavings - state.greenSavingsUsed);
  const getDeduction = (productId: string) => productDeductions[productId] ?? 0;

  const visibleProducts = state.insuranceProducts.filter((p) =>
    state.vehicle === "car" ? true : p.id !== "telematics"
  );
  const activeCount = visibleProducts.filter((p) => p.status === "active").length;
  const selectedProduct = visibleProducts.find((p) => p.id === selectedProductId);

  const selectedPrice = selectedProduct
    ? state.vehicle === "car" ? selectedProduct.priceCar : selectedProduct.priceBike
    : 0;
  const selectedDiscount = selectedProduct ? getDeduction(selectedProduct.id) : 0;
  const selectedNetFee = Math.max(0, selectedPrice - selectedDiscount);

  const selectedDetail = useMemo(() => (
    selectedProduct ? productDetails[selectedProduct.id] : null
  ), [selectedProduct]);

  const handleProductAction = (product: InsuranceProduct) => {
    if (product.status === "active") { toggleInsurance(product.id); return; }
    setSelectedProductId(product.id);
  };

  const confirmOptIn = () => {
    if (!selectedProduct) return;
    const deduction = getDeduction(selectedProduct.id);
    if (deduction > 0) deductGreenSavings(deduction);
    toggleInsurance(selectedProduct.id);
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/85">
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Bảo hiểm</h1>
        <p className="mt-2 text-sm text-white/80">
          Mua bảo vệ theo nhu cầu. Sản phẩm micro có thể bật/tắt nhanh theo ca, giờ hoặc km.
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="rounded-3xl border border-primary/20 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Sản phẩm đang bật</p>
              <p className="text-2xl text-primary">{activeCount}/{visibleProducts.length}</p>
              <p className="text-xs text-muted-foreground">
                {state.vehicle === "car" ? "Phiên bản ô tô điện" : "Phiên bản xe máy điện"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Gauge className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Điểm an toàn</p>
              <div className="mt-1 flex items-end gap-2">
                <p className="text-3xl text-primary">{state.safetyScore}</p>
                <p className="pb-1 text-sm text-muted-foreground">/100</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Dựa trên phanh gấp, cua gắt, bám đuôi, vượt tốc và tỷ lệ chạy ban đêm.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-muted-foreground">Phanh gấp/100km</p>
              <p className="mt-1 text-lg text-primary">{state.harshBrakePer100Km}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-muted-foreground">Cua gắt/100km</p>
              <p className="mt-1 text-lg text-primary">{state.sharpTurnPer100Km}</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-muted-foreground">Bám đuôi tốc độ cao</p>
              <p className="mt-1 text-lg text-primary">{state.tailgatingRate}%</p>
            </div>
            <div className="rounded-2xl bg-primary/10 p-3">
              <p className="text-xs text-muted-foreground">Chạy ban đêm</p>
              <p className="mt-1 text-lg text-primary">{state.nightDriveRate}%</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-primary/10 p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Vượt quá tốc độ</p>
                <p className="text-xs text-primary/60">VietMap Live</p>
              </div>
              <p className="mt-1 text-lg text-primary">{state.speedingRate}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <Leaf className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Tín chỉ Xanh khả dụng</p>
              <div className="mt-1 flex items-end gap-2">
                <p className="text-3xl text-emerald-600">{formatNumber(state.greenPoints)}</p>
                <p className="pb-1 text-sm text-muted-foreground">tín chỉ</p>
              </div>
              <p className="text-sm text-emerald-700">
                Còn {formatCurrency(remainingGreenSavings)} có thể dùng giảm phí bảo hiểm
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {visibleProducts.map((product, index) => {
            const price = state.vehicle === "car" ? product.priceCar : product.priceBike;
            const deduction = getDeduction(product.id);
            const isActive = product.status === "active";
            const maxDeduction = Math.min(price, remainingGreenSavings);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="text-lg">{product.name}</h2>
                      {product.micro && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">micro opt-in/out</span>
                      )}
                      {product.id === "telematics" && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">chỉ ô tô</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.summary}</p>
                  </div>
                  <button
                    onClick={() => handleProductAction(product)}
                    className={`rounded-2xl p-2 transition active:scale-95 ${isActive ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"}`}
                  >
                    {isActive ? <ToggleRight className="h-7 w-7" /> : <ToggleLeft className="h-7 w-7" />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Phí gốc</p>
                    <p className="mt-1 text-primary">{price > 0 ? formatCurrency(price) : "Theo báo giá"}</p>
                    <p className="text-xs text-muted-foreground">{product.billing}</p>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-3">
                    <p className="text-xs text-primary">Tài xế dự kiến trả</p>
                    <p className="mt-1 text-primary">{price > 0 ? formatCurrency(Math.max(0, price - deduction)) : "Sau báo giá"}</p>
                    <p className="text-xs text-muted-foreground">Sau quy đổi tín chỉ</p>
                  </div>
                </div>

                {price > 0 && !isActive && remainingGreenSavings > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Khấu trừ từ Tín chỉ Xanh</span>
                      <span className="text-emerald-600">
                        {deduction > 0
                          ? `-${formatCurrency(deduction)} (${formatNumber(Math.round(deduction / 13.5))} điểm)`
                          : "Chưa dùng"}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxDeduction}
                      step={1000}
                      value={deduction}
                      onChange={(e) => setProductDeductions((prev: Record<string, number>) => ({ ...prev, [product.id]: Number(e.target.value) }))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-emerald-100 accent-emerald-600"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0đ</span>
                      <span>{formatCurrency(maxDeduction)}</span>
                    </div>
                  </div>
                )}

                {isActive && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    Đang bật cho phiên bản {state.vehicle === "car" ? "ô tô điện" : "xe máy điện"}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <Drawer open={!!selectedProduct} onOpenChange={(open) => { if (!open) { setSelectedProductId(null); setAgreedToTerms(false); } }}>
        <DrawerContent className="mx-auto max-w-[430px]">
          {selectedProduct && selectedDetail && (
            <>
              <DrawerHeader>
                <DrawerTitle>{selectedProduct.name}</DrawerTitle>
                <DrawerDescription>Xem quyền lợi, phí và phạm vi bảo vệ trước khi bật.</DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[62vh] space-y-4 overflow-y-auto px-4 pb-2">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <p className="text-sm text-muted-foreground">Quy đổi Tín chỉ Xanh</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Phí gốc</p>
                      <p className="text-primary">{selectedPrice > 0 ? formatCurrency(selectedPrice) : "Báo giá"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Giảm</p>
                      <p className="text-primary">-{formatCurrency(selectedDiscount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Thực trả</p>
                      <p className="text-primary">{selectedPrice > 0 ? formatCurrency(selectedNetFee) : "Sau báo giá"}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-secondary-foreground">
                    Đang khấu trừ {formatCurrency(selectedDiscount)} ({formatNumber(Math.round(selectedDiscount / 13.5))} điểm) từ {formatNumber(state.greenPoints)} tín chỉ hiện có.
                  </p>
                </div>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Định nghĩa chu kỳ</h3>
                  <p className="text-sm text-muted-foreground">{selectedDetail.definition}</p>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Cover trường hợp nào?</h3>
                  <div className="space-y-2">
                    {selectedDetail.coverage.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Tiền bảo hiểm</h3>
                  <div className="space-y-2">
                    {selectedDetail.payout.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Hiệu lực</h3>
                  <p className="text-sm text-muted-foreground">{selectedDetail.effective}</p>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Loại trừ chính</h3>
                  <div className="space-y-2">
                    {selectedDetail.exclusions.map((item) => (
                      <p key={item} className="text-sm text-muted-foreground">• {item}</p>
                    ))}
                  </div>
                </section>
              </div>
              <DrawerFooter>
                <label className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 p-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-primary"
                  />
                  <span className="text-xs text-muted-foreground">
                    Tôi đã đọc và đồng ý với <span className="text-primary">điều khoản bảo hiểm</span> và <span className="text-primary">hợp đồng tham gia</span> của sản phẩm này.
                  </span>
                </label>
                <button
                  onClick={confirmOptIn}
                  disabled={!agreedToTerms}
                  className="w-full rounded-xl bg-primary py-3 text-white shadow-lg shadow-primary/20 transition active:scale-[0.98] disabled:opacity-40"
                >
                  Bật bảo hiểm và trả {selectedPrice > 0 ? formatCurrency(selectedNetFee) : "sau báo giá"}
                </button>
                <DrawerClose asChild>
                  <button className="w-full rounded-xl bg-muted py-3 text-muted-foreground">Để sau</button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
