import React, { useEffect, useState, useContext } from "react";
import ProfileSection from "../components/Profile/ProfileSection";
import Wishlist from "../components/Profile/Wishlist"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import userData from "../components/Profile/userData";
import Articles from "../views/Articles";

function MyPage( { match, history }) {

  const userId = useSelector((state) => state.user?.userData.id); // 현재 로그인한 사용자의 ID 가져오기
  
  const { id } = useParams();
  const [active, setActive] = useState(true);
  const [archived, setArchived] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [soldout, setSoldout] = useState(false);
  const [review, setReview] = useState(false); // 위 네가지는 각 섹션의 활성 상태 관리하는 state
  const [user, setUser] = useState([]); // 현재 프로필의 사용자 정보 저장하는 state

  const isCurrentUserSeller = userId && id === userId._id; // 현재 프로필이 로그인 한 사용자의 것인지 확인하는 변수

  const handleActive = () => {
    setActive(true);
    setArchived(false);
    setWishlist(false);
    setSoldout(false);
    setReview(false);
  };

  const handleArchived = () => {
    setActive(false);
    setArchived(true);
    setWishlist(false);
    setSoldout(false);
    setReview(false);
  };

  const handleWish = () => {
    setActive(false);
    setArchived(false);
    setWishlist(true);
    setSoldout(false);
    setReview(false);
  };

  const handleSoldout = () => {
    setActive(false);
    setArchived(false);
    setWishlist(false);
    setSoldout(true);
    setReview(false);
  };

  const handleReview = () => {
    setActive(false);
    setArchived(false);
    setWishlist(false);
    setSoldout(false);
    setReview(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 가장 위로 스크롤
    Articles.userId(match.params.id)
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err)); // userId 호출해 사용자 정보 가져오고, setUser로 상태 업데이트
  }, [id]);
  // 컴포넌트가 처음 렌더링될 때, match.params.id가 변결될 때 실행됨

  
  return(
    <>
      {userData && isCurrentUserSeller ? (
        <>
          <ProfileSection params={user} />
          <div className="container">
            <div className="sidenbar">
              <button
                className={`sidebar-button ${active ? "active" : ""}`}
                onClick={handleActive}
              >
                판매 물품
              </button>

              <button
                className={`sidebar-button ${archived ? "active" : ""}`}
                onClick={handleArchived}
              >
                보관함
              </button>

              <button
                className={`sidebar-button ${wishlist ? "active" : ""}`}
                onClick={handleWish}
              >
                관심 목록
              </button>

              <button
                className={`sidebar-button ${soldout ? "active" : ""}`}
                onClick={handleSoldout}
              >
                판매 완료
              </button>

              <button
                className={`sidebar-button ${review ? "active" : ""}`}
                onClick={handleReview}
              >
                거래 후기
              </button>
            </div>
            <div className="profile-main-contents">
              {active && <ActiveSells params={user} />}
              {archived && <ArchivedSells params={history} />}
              {wishlist && <Wishlist />}
              {soldout && <Soldout />}
              {review && <Review />}
            </div>
          </div>
        </>
      ) : ((
        <>
          <SellerProfile params={user} history={history} />
          <div className="container">
            <div className="sidebar">
              <button
                className={`sidebar-button ${active ? "active" : ""}`}
                onClick={handleActive}
              >
                판매 물품
              </button>

              <button
                className={`sidebar-button ${soldout ? "active" : ""}`}
                onClick={handleSoldout}
              >
                판매 완료
              </button>

              <button
                className={`sidebar-button ${review ? "active" : ""}`}
                onClick={handleReview}
              >
                거래 후기
              </button>
            </div>
            <div className="profile-main-contents">
              {review && <Review />}
              {active && <ActiveSells params={user} />}
              {soldout && <Soldout />}
            </div>
          </div>
        </>
      ))}
    </>
  );
}

export default MyPage;