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

  const onSubmit = async ({ name, price, peple, date, place, explan }) => {
    const body = { name, quan, price, peple, date, place, explan };
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
  const userPlace = {
    required: "필수 필드입니다.",
  };
  const userExplan = {
    required: "필수 필드입니다.",
  };

  return (
    <div>
      <div className="WritePage">
        <div className="Writesubdiv">
          <div className="Writetitle">글 작성</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="WritecontentDiv">
              <div className="WriteinputTitle">상품 이미지</div>
              <div className="WriteinputWrite">
                <label className="img"></label>
                <input
                  type="file"
                  className="file"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">상품명</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                  <input
                    type="text"
                    placeholder=" 상품명을 입력해주세요"
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
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">가격</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                  <input
                    type="text"
                    placeholder=" 가격을 입력해주세요"
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
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">인원</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                <select className="input" {...register("peple", userPeple)}>
                    <option value={""}> 나눠가지길 희망하는 인원수를 선택해주세요</option>
                    <option value={"A"}>1</option>
                    <option value={"B"}>2</option>
                    <option value={"C"}>3</option>
                    <option value={"D"}>4</option>
                  </select>
                  {errors?.peple && (
                    <div className="errMessage">
                      <span>{errors.peple.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">수령날짜 / 시간</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                  <input
                    type="datetime-local"
                    className="input"
                    {...register("date", userDate)}
                  />
                  {errors?.date && (
                    <div className="errMessage">
                      <span>{errors.date.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">수령장소</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                  <select className="input" {...register("place", userPlace)}>
                    <option value={""}> 선택해주세요</option>
                    <option value={"A"}>신촌 세븐 앞</option>
                    <option value={"B"}>신촌 짱돌 앞</option>
                    <option value={"C"}>단월 농협 앞</option>
                    <option value={"D"}>모시래 세븐 앞</option>
                    <option value={"D"}>모시래 기숙사 여동 앞 </option>
                    <option value={"E"}>모시래 기숙사 남동 앞 </option>
                    <option value={"F"}>해오름 기숙사 여동 앞 </option>
                    <option value={"G"}>해오름 기숙사 남동 앞 </option>
                  </select>
                  {errors?.place && (
                    <div className="errMessage">
                      <span>{errors.place.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">설명</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                  <input
                    type="text"
                    placeholder=" 설명을 입력해주세요. 식품인 경우 유통기한을 꼭! 작성해주세요."
                    className="Writeexplaninput"
                    {...register("explan", userExplan)}
                  />
                  {errors?.explan && (
                    <div className="errMessage">
                      <span>{errors.explan.message}</span>
                    </div>
                  )}
                </div>
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
