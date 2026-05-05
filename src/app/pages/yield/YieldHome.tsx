import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useFinanceStore } from "../../data/financeStore";

export function YieldHome() {
  const { state } = useFinanceStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.yieldStatus === "inactive") {
      navigate("/yield/discovery", { replace: true });
    } else {
      navigate("/yield/detail", { replace: true });
    }
  }, [state.yieldStatus, navigate]);

  return null;
}
