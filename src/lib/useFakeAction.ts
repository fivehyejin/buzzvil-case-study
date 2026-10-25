import { useCallback, useState } from "react";

/**
 * 프로토타입용 가짜 비동기 행동.
 * 원본에 없는 "처리 중" 상태를 보여주기 위해 600ms 지연 후 완료.
 */
export function useFakeAction(onDone?: () => void, delay = 600) {
  const [loading, setLoading] = useState(false);
  const run = useCallback(() => {
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onDone?.();
    }, delay);
  }, [loading, onDone, delay]);
  return { loading, run };
}
