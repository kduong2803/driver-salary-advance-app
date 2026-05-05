export type InsuranceDetail = {
  definition: string;
  coverage: string[];
  payout: string[];
  exclusions: string[];
  effective: string;
};

export const productDetails: Record<string, InsuranceDetail> = {
  income: {
    definition: "Gói theo tháng, gia hạn theo chu kỳ tháng nếu tài xế tiếp tục duy trì bảo hiểm.",
    coverage: [
      "Ốm bệnh, tai nạn hoặc xe hỏng dài ngày khiến tài xế không thể chạy xe.",
      "Xác nhận ngừng hoạt động dựa trên dữ liệu chuyến xe và hồ sơ yêu cầu bồi thường.",
    ],
    payout: [
      "Chi trả 70% thu nhập trung bình 3 tháng gần nhất.",
      "Tối đa 15.000.000đ/tháng, tối đa 3 tháng/năm.",
    ],
    exclusions: [
      "Dừng hoạt động tự nguyện không có hồ sơ xác nhận.",
      "Sự kiện xảy ra trước ngày bảo hiểm có hiệu lực.",
    ],
    effective: "Hiệu lực từ 00:00 ngày tiếp theo sau khi đăng ký thành công.",
  },
  "pay-by-hour": {
    definition: "Gói 1.000 giờ mua một lần — số giờ được khấu trừ dần theo thời gian check-in thực tế. Hết giờ trong gói thì bảo hiểm tạm dừng cho đến khi mua gói mới.",
    coverage: [
      "Tai nạn cá nhân trong toàn bộ thời gian check-in còn trong gói giờ.",
      "Trách nhiệm dân sự và bảo vệ hành khách trong giờ hoạt động được ghi nhận.",
    ],
    payout: [
      "Chi phí y tế theo quyền lợi gói, áp dụng cho giờ phát sinh sự kiện.",
      "Hỗ trợ mất thu nhập nếu tai nạn xảy ra trong giờ đang được bảo hiểm.",
    ],
    exclusions: [
      "Thời gian ngoài check-in hoặc khi gói đã hết giờ.",
      "Hành vi gian lận dữ liệu hoặc cố ý tạo sự kiện bảo hiểm.",
    ],
    effective: "Hiệu lực ngay sau khi thanh toán gói thành công.",
  },
  "pay-by-km": {
    definition: "Gói 100.000 km mua một lần — số km được khấu trừ dần theo km ghi nhận thực tế. Hết km trong gói thì bảo hiểm tạm dừng cho đến khi mua gói mới.",
    coverage: [
      "Tai nạn cá nhân trên đoạn đường còn trong gói km được ghi nhận.",
      "Trách nhiệm dân sự và bảo vệ hành khách theo km phát sinh.",
    ],
    payout: [
      "Chi phí y tế theo quyền lợi gói, áp dụng cho km phát sinh sự kiện.",
      "Hỗ trợ mất thu nhập nếu tai nạn xảy ra trong km đang được bảo hiểm.",
    ],
    exclusions: [
      "Km không được hệ thống ghi nhận hoặc khi gói đã hết km.",
      "Hành vi gian lận dữ liệu hoặc cố ý tạo sự kiện bảo hiểm.",
    ],
    effective: "Hiệu lực ngay sau khi thanh toán gói thành công.",
  },
  telematics: {
    definition: "Gói theo tháng chỉ dành cho ô tô điện. Phí 490.000đ/tháng là mức cơ bản — điểm an toàn cao và Tín chỉ Xanh giúp giảm thêm.",
    coverage: [
      "Bảo hiểm thân vỏ xe theo giá trị thực tế được đối tác định giá.",
      "Điểm an toàn và lịch sử vận hành được cập nhật mỗi tháng để điều chỉnh phí kỳ tiếp.",
    ],
    payout: [
      "Bồi thường theo giá trị xe và mức thiệt hại được đối tác bảo hiểm xác nhận.",
      "Tài xế có điểm an toàn cao (≥85) được ưu tiên xét duyệt hồ sơ nhanh.",
    ],
    exclusions: [
      "Không áp dụng cho xe máy điện.",
      "Không áp dụng nếu xe không chia sẻ được dữ liệu vận hành với hệ thống.",
    ],
    effective: "Hiệu lực từ ngày 1 tháng tiếp theo sau khi đăng ký và phí được ghi nhận.",
  },
};

export type ClaimStat = {
  totalPaid: number;
  totalClaimed: number;
  claimCount: number;
  lastClaimDate?: string;
  pending?: boolean;
};

export const mockClaims: Record<string, ClaimStat> = {
  "income":      { totalPaid: 237000,  totalClaimed: 0,       claimCount: 0 },
  "pay-by-hour": { totalPaid: 1500000, totalClaimed: 0,       claimCount: 0 },
  "pay-by-km":   { totalPaid: 1000000, totalClaimed: 0,       claimCount: 0 },
  "telematics":  { totalPaid: 980000,  totalClaimed: 0,       claimCount: 0, pending: true },
};

export type PaymentRecord = {
  id: string;
  productId: string;
  productName: string;
  date: string;
  amount: number;
  period: string;
  status: "completed" | "pending" | "refunded";
};

export const mockHistory: PaymentRecord[] = [
  { id: "h1", productId: "telematics",  productName: "BH telematics",   date: "01/04/2026", amount: 490000,  period: "Tháng 4/2026",   status: "completed" },
  { id: "h2", productId: "income",      productName: "BH thu nhập",      date: "01/04/2026", amount: 79000,   period: "Tháng 4/2026",   status: "completed" },
  { id: "h3", productId: "pay-by-hour", productName: "BH theo giờ chạy", date: "15/03/2026", amount: 1500000, period: "Gói 1.000 giờ",  status: "completed" },
  { id: "h4", productId: "pay-by-km",   productName: "BH theo km chạy",  date: "15/03/2026", amount: 1000000, period: "Gói 100.000 km", status: "completed" },
  { id: "h5", productId: "telematics",  productName: "BH telematics",   date: "01/03/2026", amount: 490000,  period: "Tháng 3/2026",   status: "completed" },
  { id: "h6", productId: "income",      productName: "BH thu nhập",      date: "01/03/2026", amount: 79000,   period: "Tháng 3/2026",   status: "completed" },
  { id: "h7", productId: "telematics",  productName: "BH telematics",   date: "01/02/2026", amount: 490000,  period: "Tháng 2/2026",   status: "completed" },
  { id: "h8", productId: "income",      productName: "BH thu nhập",      date: "01/02/2026", amount: 79000,   period: "Tháng 2/2026",   status: "completed" },
];
