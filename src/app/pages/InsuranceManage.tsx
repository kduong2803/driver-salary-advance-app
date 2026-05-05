import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, ArrowLeft, CheckCircle2, FileText, Plus } from "lucide-react";
import { Link } from "react-router";
import { formatCurrency, useFinanceStore } from "../data/financeStore";
import { mockClaims, productDetails } from "../data/insuranceData";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer";

export function InsuranceManage() {
  const { state } = useFinanceStore();
  const [termsProductId, setTermsProductId] = useState<string | null>(null);
  const [claimProductId, setClaimProductId] = useState<string | null>(null);
  const [claimDesc, setClaimDesc] = useState("");
  const [claimDate, setClaimDate] = useState("");

  const visibleProducts = state.insuranceProducts.filter((p) =>
    state.vehicle === "car" ? true : p.id !== "telematics"
  );
  const managedProducts = visibleProducts.filter((p) => p.status === "active");

  const totalPaid = managedProducts.reduce((s, p) => s + (mockClaims[p.id]?.totalPaid ?? 0), 0);
  const totalClaimed = managedProducts.reduce((s, p) => s + (mockClaims[p.id]?.totalClaimed ?? 0), 0);

  const termsProduct = managedProducts.find((p) => p.id === termsProductId);
  const claimProduct = managedProducts.find((p) => p.id === claimProductId);
  const termsDetail = useMemo(() => termsProduct ? productDetails[termsProduct.id] : null, [termsProduct]);

  const submitClaim = () => {
    setClaimProductId(null);
    setClaimDesc("");
    setClaimDate("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-6 pb-8 pt-12 text-white">
        <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm text-white/85">
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ ví
        </Link>
        <p className="text-sm text-white/75">GSM Financial Services</p>
        <h1 className="mt-1 text-3xl">Quản lý bảo hiểm</h1>
        <p className="mt-2 text-sm text-white/80">Xem hợp đồng, điều khoản và gửi yêu cầu bồi thường.</p>
      </div>

      <div className="mx-auto max-w-lg space-y-5 px-6 py-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Tổng phí đã đóng</p>
            <p className="mt-1 text-xl text-primary">{formatCurrency(totalPaid)}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">Đã được bồi thường</p>
            <p className="mt-1 text-xl text-emerald-600">{formatCurrency(totalClaimed)}</p>
          </div>
        </div>

        <div className="space-y-3">
          {managedProducts.map((product, index) => {
            const claim = mockClaims[product.id] ?? { totalPaid: 0, totalClaimed: 0, claimCount: 0 };
            const isActive = product.status === "active";
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.billing}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {isActive ? "Đang bảo vệ" : "Chưa bật"}
                    </span>
                    {claim.pending && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-700">
                        <AlertCircle className="h-3 w-3" />
                        Đang xử lý
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Phí đã đóng</p>
                    <p className="mt-0.5 text-primary">{formatCurrency(claim.totalPaid)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Đã claim</p>
                    <p className={`mt-0.5 ${claim.totalClaimed > 0 ? "text-emerald-600" : "text-muted-foreground"}`}>
                      {formatCurrency(claim.totalClaimed)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Số lần</p>
                    <p className="mt-0.5 text-primary">{claim.claimCount} lần</p>
                  </div>
                </div>

                {claim.lastClaimDate && (
                  <p className="mb-3 text-xs text-muted-foreground">Claim gần nhất: {claim.lastClaimDate}</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setTermsProductId(product.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-muted py-2.5 text-sm text-muted-foreground transition active:scale-[0.98]"
                  >
                    <FileText className="h-4 w-4" />
                    Điều khoản
                  </button>
                  <button
                    onClick={() => setClaimProductId(product.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm text-white shadow-sm shadow-primary/20 transition active:scale-[0.98]"
                  >
                    <Plus className="h-4 w-4" />
                    Yêu cầu bồi thường
                  </button>
                </div>
              </motion.div>
            );
          })}

          {managedProducts.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <FileText className="mb-4 h-14 w-14 text-muted-foreground/30" />
              <p className="text-muted-foreground">Chưa có hợp đồng nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Drawer: điều khoản */}
      <Drawer open={!!termsProduct} onOpenChange={(open) => !open && setTermsProductId(null)}>
        <DrawerContent className="mx-auto max-w-[430px]">
          {termsProduct && termsDetail && (
            <>
              <DrawerHeader>
                <DrawerTitle>Điều khoản — {termsProduct.name}</DrawerTitle>
                <DrawerDescription>Hợp đồng bảo hiểm đang có hiệu lực.</DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[65vh] space-y-4 overflow-y-auto px-4 pb-2">
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Phạm vi bảo hiểm</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{termsDetail.definition}</p>
                  <div className="space-y-2">
                    {termsDetail.coverage.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Quyền lợi bồi thường</h3>
                  <div className="space-y-2">
                    {termsDetail.payout.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Hiệu lực hợp đồng</h3>
                  <p className="text-sm text-muted-foreground">{termsDetail.effective}</p>
                </section>
                <section className="rounded-2xl border border-border/50 p-4">
                  <h3 className="mb-2 text-base">Loại trừ bảo hiểm</h3>
                  <div className="space-y-2">
                    {termsDetail.exclusions.map((item) => (
                      <p key={item} className="text-sm text-muted-foreground">• {item}</p>
                    ))}
                  </div>
                </section>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <button className="w-full rounded-xl bg-muted py-3 text-muted-foreground">Đóng</button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Drawer: yêu cầu bồi thường */}
      <Drawer open={!!claimProduct} onOpenChange={(open) => !open && setClaimProductId(null)}>
        <DrawerContent className="mx-auto max-w-[430px]">
          {claimProduct && (
            <>
              <DrawerHeader>
                <DrawerTitle>Yêu cầu bồi thường</DrawerTitle>
                <DrawerDescription>{claimProduct.name}</DrawerDescription>
              </DrawerHeader>
              <div className="space-y-4 px-4 pb-2">
                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">Ngày xảy ra sự kiện</label>
                  <input
                    type="date"
                    value={claimDate}
                    onChange={(e) => setClaimDate(e.target.value)}
                    className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-muted-foreground">Mô tả sự kiện</label>
                  <textarea
                    rows={4}
                    value={claimDesc}
                    onChange={(e) => setClaimDesc(e.target.value)}
                    placeholder="Mô tả ngắn gọn sự kiện xảy ra, địa điểm và thiệt hại..."
                    className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 text-center">
                  <p className="text-sm text-muted-foreground">Đính kèm ảnh / tài liệu</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">Ảnh hiện trường, hoá đơn viện phí, biên bản...</p>
                  <button className="mt-2 rounded-lg bg-muted px-4 py-1.5 text-xs text-muted-foreground">Chọn file</button>
                </div>
                <div className="rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
                  Sau khi gửi, đội hỗ trợ sẽ liên hệ trong vòng 24 giờ làm việc để xác nhận hồ sơ.
                </div>
              </div>
              <DrawerFooter>
                <button
                  onClick={submitClaim}
                  disabled={!claimDate || !claimDesc}
                  className="w-full rounded-xl bg-primary py-3 text-white shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
                >
                  Gửi yêu cầu bồi thường
                </button>
                <DrawerClose asChild>
                  <button className="w-full rounded-xl bg-muted py-3 text-muted-foreground">Huỷ</button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
