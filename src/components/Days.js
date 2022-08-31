import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Days() {
  const [days, setDays] = useState([]);
  // state가 변경될때마다 감지를 해서 실행한다.
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/days").then((res) => {
      setDays(res.data);
    });
  }, []);
  return (
    <>
      <div className="container">
        <ul className="days">
          {days.map((item, idx) => {
            return (
              <li>
                <Link to={`/day/${item.day}`}>day{item.day}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}