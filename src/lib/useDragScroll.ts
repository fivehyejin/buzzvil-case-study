import { useRef, type PointerEvent } from "react";

/**
 * 마우스로 끌어서 가로 스크롤. 터치는 브라우저 기본 동작 그대로.
 * 끌었으면 click을 막아서 카드 탭과 구분한다.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: PointerEvent<T>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    state.current = { down: true, moved: false, startX: e.clientX, startLeft: ref.current.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent<T>) => {
    const st = state.current;
    if (!st.down || !ref.current) return;
    const dx = e.clientX - st.startX;
    if (Math.abs(dx) > 4) st.moved = true;
    if (st.moved) ref.current.scrollLeft = st.startLeft - dx;
  };

  const end = () => {
    state.current.down = false;
  };

  const onClickCapture = (e: PointerEvent<T> | React.MouseEvent<T>) => {
    if (state.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      state.current.moved = false;
    }
  };

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerLeave: end,
      onClickCapture,
    },
  };
}
