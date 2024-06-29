import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/thunkFunctions";
import "../style/Write.css";

const Write = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ name, price, peple, date, time, place, explan }) => {
    const body = { name, quan, price, peple, date, time, place, explan };
    // try {
    //   await dispatch(registerUser(body));
    //   navigate("/login");
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // const userImg = {
  //   required: "필수 필드입니다.",
  // };
  const userName = {
    required: "필수 필드입니다.",
  };
  const userPrice = {
    required: "필수 필드입니다.",
  };
  const userPeple = {
    required: "필수 필드입니다.",
  };
  const userDate = {
    required: "필수 필드입니다.",
  };
  const userTime = {
    required: "필수 필드입니다.",
  };
  const userPlace = {
    required: "필수 필드입니다.",
  };
  const userExplan = {
    required: "필수 필드입니다.",
  };

  return (
    <div>
      <div className="WritePage">
        <div className="subdiv">
          <div className="title"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputTitle">상품 이미지</div>
              <div className="inputWrite">
                <label className="img">이미지 등록</label>
                <input
                  type="file"
                  className="file"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">상품명</div>
              <div className="inputWrite">
                <input
                  type="text"
                  placeholder="상품명을 입력해주세요"
                  className="input"
                  {...register("name", userName)}
                />
                {errors?.name && (
                  <div className="errMessage">
                    <span>{errors.name.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">가격</div>
              <div className="inputWrite">
                <input
                  type="text"
                  placeholder="가격을 입력해주세요"
                  className="input"
                  {...register("price", userPrice)}
                />
                {errors?.price && (
                  <div className="errMessage">
                    <span>{errors.price.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">인원</div>
              <div className="inputWrite">
                <input
                  type="text"
                  placeholder="명"
                  className="input"
                  {...register("peple", userPeple)}
                />
                {errors?.peple && (
                  <div className="errMessage">
                    <span>{errors.peple.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">수령날짜 / 시간</div>
              <div className="inputWrite">
                <input
                  type="text"
                  className="input"
                  {...register("date", userDate)}
                />
                {errors?.date && (
                  <div className="errMessage">
                    <span>{errors.date.message}</span>
                  </div>
                )}
                <input
                  type="text"
                  className="input"
                  {...register("time", userTime)}
                />
                {errors?.time && (
                  <div className="errMessage">
                    <span>{errors.time.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">수령장소</div>
              <div className="inputWrite">
                <input
                  type="text"
                  placeholder="선택"
                  className="input"
                  {...register("place", userPlace)}
                />
                {errors?.place && (
                  <div className="errMessage">
                    <span>{errors.place.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">설명</div>
              <div className="inputWrite">
                <input
                  type="text"
                  placeholder="설명을 입력해주세요. 식품인 경우 유통기한을 꼭! 작성해주세요."
                  className="input"
                  {...register("explan", userExplan)}
                />
                {errors?.explan && (
                  <div className="errMessage">
                    <span>{errors.explan.message}</span>
                  </div>
                )}
              </div>
            </div>





            <div className="button">
              <button className="btn" type="submit">
                글 등록하기
              </button>
            </div>
          </form>

        
        </div>
      </div>
    </div>
  );
};

export default Write;
