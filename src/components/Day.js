import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Voca from "./Voca";

export default function Day() {
  const { day } = useParams(); // useParams()라는 hook은 상단 네비게이션의 params 값을 받을 때 쓴다.
  const [voca, setVoca] = useState([]);
  // json-server 데이터를 들고 올 땐 queryString
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/voca?day=${day}`).then((res) => {
      setVoca(res.data);
      // console.log(res.data);
    });
  }, []);
  return (
    <>
      <div className="container dayBox">
        <h2 className="title">Day-{day}</h2>
        <ul className="vocas">
          {voca.map((item, idx) => {
            return <Voca kor={item.kor} eng={item.eng} key={idx} isDone={item.isDone} id={item.id} />;
          })}
        </ul>
        <div className="btns">
          <Link to="/" className="btn">
            BACK
          </Link>
        </div>
      </div>
    </>
  );
}
