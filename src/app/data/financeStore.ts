import { useEffect, useMemo, useState } from "react";

export type DriverVehicle = "car" | "bike";

export type InsuranceProduct = {
  id: string;
  name: string;
  summary: string;
  billing: string;
  priceCar: number;
  priceBike: number;
  status: "active" | "inactive";
  micro: boolean;
  greenBenefit: string;
};

export type YieldTransaction = {
  id: string;
  type: "deposit" | "withdraw" | "interest";
  amount: number;
  date: string;
  status: "success" | "failed" | "pending";
  note?: string;
};

export type CcqPlan = {
  enabled: boolean;
  mode: "fixed" | "percent";
  fixedPerTrip: number;
  percentPerTrip: number;
  frequency: "weekly" | "monthly";
  fund: string;
  accumulated: number;
  nav: number;
};

export type FinanceState = {
  vehicle: DriverVehicle;
  walletBalance: number;
  todayIncome: number;
  availableAdvance: number;
  driverRating: number;
  customerReviewCount: number;
  completionRate: number;
  safetyScore: number;
  harshBrakePer100Km: number;
  sharpTurnPer100Km: number;
  tailgatingRate: number;
  speedingRate: number;
  nightDriveRate: number;
  monthKmCar: number;
  monthKmBike: number;
  greenPoints: number;
  greenSavings: number;
  greenSavingsUsed: number;
  yieldAnnualRate: number;
  monthYield: number;
  yieldStatus: "inactive" | "active" | "canceling";
  yieldBalance: number;
  yieldTransactions: YieldTransaction[];
  insuranceProducts: InsuranceProduct[];
  ccqPlan: CcqPlan;
};

const STORAGE_KEY = "gsm-financial-services-state-v1";

const defaultState: FinanceState = {
  vehicle: "car",
  walletBalance: 8250000,
  todayIncome: 920000,
  availableAdvance: 640000,
  driverRating: 4.88,
  customerReviewCount: 1264,
  completionRate: 98,
  safetyScore: 86,
  harshBrakePer100Km: 1.8,
  sharpTurnPer100Km: 2.3,
  tailgatingRate: 5,
  speedingRate: 3.2,
  nightDriveRate: 18,
  monthKmCar: 2860,
  monthKmBike: 2140,
  greenPoints: 5720,
  greenSavings: 77220,
  greenSavingsUsed: 0,
  yieldAnnualRate: 0.0575,
  monthYield: 39500,
  yieldStatus: "inactive",
  yieldBalance: 0,
  yieldTransactions: [],
  insuranceProducts: [
    {
      id: "income",
      name: "BH thu nhập",
      summary: "Chi trả thu nhập thay thế khi tài xế phải dừng hoạt động vì ốm, tai nạn hoặc xe hỏng dài ngày.",
      billing: "Theo tháng",
      priceCar: 79000,
      priceBike: 39000,
      status: "inactive",
      micro: false,
      greenBenefit: "Có thể quy đổi Tín chỉ Xanh để giảm phí tháng",
    },
    {
      id: "pay-by-hour",
      name: "BH theo giờ chạy",
      summary: "Gói 1.000 giờ bảo vệ, tính trừ dần theo giờ check-in thực tế. Mua một lần, dùng theo nhu cầu.",
      billing: "Gói 1.000 giờ",
      priceCar: 1500000,
      priceBike: 600000,
      status: "inactive",
      micro: true,
      greenBenefit: "",
    },
    {
      id: "pay-by-km",
      name: "BH theo km chạy",
      summary: "Gói 100.000 km bảo vệ, tính trừ dần theo km ghi nhận thực tế. Mua một lần, dùng theo nhu cầu.",
      billing: "Gói 100.000 km",
      priceCar: 1000000,
      priceBike: 400000,
      status: "inactive",
      micro: true,
      greenBenefit: "",
    },
    {
      id: "telematics",
      name: "BH telematics",
      summary: "Bảo hiểm thân vỏ xe hàng tháng, phí tự động điều chỉnh theo điểm lái an toàn từ dữ liệu vận hành thực tế.",
      billing: "Theo tháng",
      priceCar: 490000,
      priceBike: 0,
      status: "inactive",
      micro: false,
      greenBenefit: "Tín chỉ Xanh và điểm an toàn giúp mở ưu đãi phí",
    },
  ],
  ccqPlan: {
    enabled: true,
    mode: "fixed",
    fixedPerTrip: 5000,
    percentPerTrip: 2,
    frequency: "weekly",
    fund: "VinaCapital - Quỹ cân bằng",
    accumulated: 3750000,
    nav: 3900000,
  },
};

const getVehicleMetrics = (state: FinanceState) => {
  const monthKm = state.vehicle === "car" ? state.monthKmCar : state.monthKmBike;
  const pointsPerKm = state.vehicle === "car" ? 2 : 1;
  const co2GramPerKm = state.vehicle === "car" ? 100 : 50;
  const greenPoints = monthKm * pointsPerKm;
  const greenSavings = Math.round(greenPoints * 13.5);
  const co2Kg = Math.round((monthKm * co2GramPerKm) / 100) / 10;
  const treeEquivalent = Math.max(1, Math.round(co2Kg / 21));

  return {
    monthKm,
    pointsPerKm,
    greenPoints,
    greenSavings,
    co2Kg,
    treeEquivalent,
  };
};

const normalizeState = (state: FinanceState): FinanceState => {
  const metrics = getVehicleMetrics(state);
  const dailyYield = state.walletBalance * state.yieldAnnualRate / 365;
  const storedProducts = new Map(state.insuranceProducts.map((product) => [product.id, product]));

  return {
    ...state,
    greenPoints: metrics.greenPoints,
    greenSavings: metrics.greenSavings,
    monthYield: Math.round(dailyYield * 18),
    insuranceProducts: defaultState.insuranceProducts.map((defaultProduct) => ({
      ...defaultProduct,
      status: storedProducts.get(defaultProduct.id)?.status ?? defaultProduct.status,
    })),
  };
};

export const formatCurrency = (value: number) => value.toLocaleString("vi-VN") + "đ";

export const formatNumber = (value: number) => value.toLocaleString("vi-VN");

export const useFinanceStore = () => {
  const [state, setState] = useState<FinanceState>(() => {
    if (typeof window === "undefined") {
      return normalizeState(defaultState);
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return normalizeState(defaultState);
      }

      return normalizeState({ ...defaultState, ...JSON.parse(stored) });
    } catch {
      return normalizeState(defaultState);
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const metrics = useMemo(() => getVehicleMetrics(state), [state]);

  const setVehicle = (vehicle: DriverVehicle) => {
    setState((current) => normalizeState({ ...current, vehicle }));
  };

  const deductGreenSavings = (amount: number) => {
    setState((current) => normalizeState({
      ...current,
      greenSavingsUsed: current.greenSavingsUsed + amount,
    }));
  };

  const toggleInsurance = (id: string) => {
    setState((current) => normalizeState({
      ...current,
      insuranceProducts: current.insuranceProducts.map((product) => (
        product.id === id
          ? { ...product, status: product.status === "active" ? "inactive" : "active" }
          : product
      )),
    }));
  };

  const updateCcqPlan = (patch: Partial<CcqPlan>) => {
    setState((current) => normalizeState({
      ...current,
      ccqPlan: { ...current.ccqPlan, ...patch },
    }));
  };

  const registerYield = () => {
    const seedTxns: YieldTransaction[] = [
      { id: "yi-001", type: "interest", amount: 13200, date: "2026-04-30T23:59:00", status: "success", note: "Tiền lời kỳ tháng 4/2026" },
      { id: "yi-002", type: "deposit", amount: 3000000, date: "2026-04-15T09:12:00", status: "success" },
      { id: "yi-003", type: "deposit", amount: 5000000, date: "2026-04-10T14:30:00", status: "success" },
    ];
    setState((current) => normalizeState({
      ...current,
      yieldStatus: "active",
      yieldBalance: 8000000,
      walletBalance: current.walletBalance - 8000000,
      yieldTransactions: seedTxns,
    }));
  };

  const depositYield = (amount: number) => {
    const txn: YieldTransaction = {
      id: `yd-${Date.now()}`,
      type: "deposit",
      amount,
      date: new Date().toISOString(),
      status: "success",
    };
    setState((current) => normalizeState({
      ...current,
      walletBalance: current.walletBalance - amount,
      yieldBalance: current.yieldBalance + amount,
      yieldTransactions: [txn, ...current.yieldTransactions],
    }));
  };

  const withdrawYield = (amount: number) => {
    const txn: YieldTransaction = {
      id: `yw-${Date.now()}`,
      type: "withdraw",
      amount,
      date: new Date().toISOString(),
      status: "success",
    };
    setState((current) => normalizeState({
      ...current,
      yieldBalance: current.yieldBalance - amount,
      walletBalance: current.walletBalance + amount,
      yieldTransactions: [txn, ...current.yieldTransactions],
    }));
  };

  const cancelYield = () => {
    setState((current) => normalizeState({
      ...current,
      yieldStatus: "inactive",
      walletBalance: current.walletBalance + current.yieldBalance,
      yieldBalance: 0,
      yieldTransactions: [],
    }));
  };

  return {
    state,
    metrics,
    setVehicle,
    toggleInsurance,
    deductGreenSavings,
    updateCcqPlan,
    registerYield,
    depositYield,
    withdrawYield,
    cancelYield,
  };
};
