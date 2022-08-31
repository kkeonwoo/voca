import { useRef, useState } from "react";

export default function UseRefComponent() {
  // useState는 상태가 바뀌는 순간, 컴포넌트를 초기화하기 때문에
  // 일반변수도 초기화된다.
  const [count, setCoount] = useState(0);
  const refCount = useRef(0);
  const incCount = () => {
    setCoount(count + 1);
  };
  const incVarCount = () => {
    refCount.current++;
    console.log("varCount===", varCount);
  };
  //useRef는 화면이 다시 렌더링 되더라도
  // 이전에 가지고 있던 값을 가지고 있다.
  const incRefCount = () => {
    refCount.current++;
    console.log("refCount.current===", refCount.current);
  };
  let varCount = 0;
  return (
    <>
      <div>
        <p style={{ color: "#111", fontSize: 30 }}>{count}</p>
        <button style={{ padding: 20 }} onClick={incCount}>
          useStateㄹ로 만드는 counter
        </button>
      </div>
      <div>
        <p style={{ color: "#111", fontSize: 30 }}>{varCount}</p>
        <button style={{ padding: 20 }} onClick={incVarCount}>
          일반변수로 만드는 counter
        </button>
      </div>
      <div>
        <p style={{ color: "#111", fontSize: 30 }}>{refCount.current}</p>
        <button style={{ padding: 20 }} onClick={incRefCount}>
          useRef로 만드는 counter
        </button>
      </div>
    </>
  );
}
