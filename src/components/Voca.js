import axios from "axios";
import { useState } from "react";

export default function Voca(props) {
  // react는 컴포넌트 단위로 모든게 움직인다.
  const [info, setInfo] = useState(props);
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(props.isDone);
  const toggleDone = () => {
    // console.log("toggleDone");
    // 값을 가져올땐 보통 axios.get     read
    // 값을 처음에 생성할땐 axios.post  create
    // axios.put()            update
    // axios.delete()         delete
    axios
      .put(`http://127.0.0.1:5000/voca/${props.id}`, {
        // eng: props.eng,
        // kor: props.kor,
        // id: props.id,
        // day: props.day,
        ...props,
        isDone: !isDone,
      })
      .then((res) => {
        // console.log(res);
        if (res.statusText === "OK") {
          setIsDone(!isDone);
        }
      });
  };
  const toggleKor = () => {
    setIsVisible(!isVisible);
  };
  const deleteVoca = () => {
    if (window.confirm("다외웠나요?")) {
      // console.log("delete");
      axios.delete(`http://127.0.0.1:5000/voca/${props.id}`).then((res) => {
        if (res.statusText === "OK") {
          // db에서 값을 지웠다는 결과를 받았기 때문에
          setInfo({ id: -1 }); // -1을 세팅하고
        }
      });
    }
  };
  if (info.id === -1) {
    return false; // 화면에서 렌더링 안되게 만듦
  }
  return (
    <li className={isDone ? "done" : ""} data-idx={props.id}>
      <div className="check">
        <label className="checkBox">
          <input type="checkbox" onChange={toggleDone} />
          <span className="label"></span>
        </label>
      </div>
      <div className="eng word">{props.eng}</div>
      <div className="kor word">{isVisible && props.kor}</div>
      <div className="btns">
        <button className="btn hidden" onClick={toggleKor}>
          CHECK
        </button>
        <button className="btn del" onClick={deleteVoca}>
          DEL
        </button>
      </div>
    </li>
  );
}
