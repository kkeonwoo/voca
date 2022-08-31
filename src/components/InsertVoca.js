import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InsertVoca() {
  // react에서 dom에 접근할 땐 useRef라는 Hook을 사용
  const navigate = useNavigate();
  const eng = useRef();
  const kor = useRef();
  const day = useRef();

  const [days, setDays] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("form에 있는 data전송");
    axios
      .post(`http://127.0.0.1:5000/voca/`, {
        day: parseInt(day.current.value),
        eng: eng.current.value,
        kor: kor.current.value,
        isDone: false,
      })
      .then((res) => {
        // console.log("입력되었습니다.");
        alert("입력되었습니다.");
        if (res.statusText === "Created") {
          navigate(`/day/${day.current.value}`);
        }
      });
  };
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/days`).then((res) => {
      console.log(res.data);
      setDays(res.data);
    });
  }, []);
  return (
    <>
      {/* 여기에 영어단어 한국어 뜻 입력하는 폼 만들기 */}
      <div className="container dayBox">
        <h2 className="title">INSERT VOCA</h2>
        <form className="vocaBox" onSubmit={onSubmit}>
          <div className="inputBox">
            <label>
              ENG
              <input type="text" placeholder="write english ex) dog" ref={eng} />
            </label>
            <label>
              KOR
              <input type="text" placeholder="뜻을 적으세요. ex) 강아지" ref={kor} />
            </label>
          </div>
          <div className="inputBox">
            <select name="" id="" ref={day}>
              {/* option 태그를 반복 */}
              {days.map((item, idx) => {
                return (
                  <option value={item.day} key={idx}>
                    {item.day}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btns">
            <button className="btn">SEND</button>
          </div>
        </form>
      </div>
    </>
  );
}
