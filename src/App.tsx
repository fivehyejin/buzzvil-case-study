import { Offerwall } from "@/screens/Offerwall";
import s from "./App.module.css";

/** 375px 폰 프레임 안에 오퍼월 TO-BE 화면 하나. 모바일에서는 프레임 없이 꽉 채움. */
export default function App() {
  return (
    <div className={s.stage}>
      <div className={s.phone}>
        <Offerwall />
      </div>
    </div>
  );
}
