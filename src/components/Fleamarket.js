import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../style/Fleamarket.css";

const Fleamarket = () => {

  const reduxItem = useSelector((state) => state.item);

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (reduxItem) {
      fetchItem(reduxItem.id);
    }
  }, [reduxItem]);

  const fetchItem = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/articles/${id}`);
      setItem(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="FleamarketPage">
      {item ? (
      <div className="post"> 
        <div className="image"></div>
        <div className="text">
          <div className="Title">{item.title}</div>
          <div className="price">100,000원</div>
          <div className="town">서울 강남구 도곡동</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">1명 남음</div>
            <div className="time">22:19:50</div>
          </div>
          <div className="Button">
            <button className="Btn">
              7000원으로 참여하기
            </button>
          </div>
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
      

      <div className="post"> 
        <div className="image"></div>
        <div className="text">
          <div className="Title">다이슨 드라이기 정품</div>
          <div className="price">100,000원</div>
          <div className="town">서울 강남구 도곡동</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">1명 남음</div>
            <div className="time">22:19:50</div>
          </div>
          <div className="Button">
            <button className="Btn">
              7000원으로 참여하기
            </button>
          </div>
        </div>
      </div>

      <div className="post"> 
        <div className="image"></div>
        <div className="text">
          <div className="Title">다이슨 드라이기 정품</div>
          <div className="price">100,000원</div>
          <div className="town">서울 강남구 도곡동</div>
        </div>
        <div className="leftover">
          <div className="gray">
            <div className="person">1명 남음</div>
            <div className="time">22:19:50</div>
          </div>
          <div className="Button">
            <button className="Btn">
              7000원으로 참여하기
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Fleamarket;
