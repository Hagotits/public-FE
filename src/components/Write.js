import React from "react";
import { useForm } from "react-hook-form";
import "../style/Write.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user?.userData.id);
  console.log(userId);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "img") {
          Array.from(data[key]).forEach((file) => {
            formData.append("img", file);
          });
        }
      }

      // 1. 이미지 업로드 요청
      const imgResponse = await axios.post(
        "http://localhost:4000/article/img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (imgResponse.status === 200) {
        const imgPaths = imgResponse.data.filePath;

        // 2. 게시물 업로드 요청
        const articleData = {
          userId,
          title: data.title,
          img: imgPaths.join(","), // 이미지 경로를 콤마로 구분된 문자열로 저장
          content: data.content,
          price: data.price,
          place: data.place,
          attend: data.attend,
          receptTime: data.receptTime,
        };

        const articleResponse = await axios.post(
          "http://localhost:4000/article",
          articleData
        );

        if (articleResponse.status === 200) {
          alert("게시글이 등록되었습니다.");
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      alert("게시글 작성에 실패했습니다.");
    }
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
                  accept="image/*"
                  multiple
                  {...register("img")}
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
                    {...register("title", { required: "필수 필드입니다." })}
                  />
                  {errors?.title && (
                    <div className="errMessage">
                      <span>{errors.title.message}</span>
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
                    {...register("price", { required: "필수 필드입니다." })}
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
                  <select
                    className="input"
                    {...register("attend", { required: "필수 필드입니다." })}
                  >
                    <option value={""}>
                      나눠가지길 희망하는 인원수를 선택해주세요
                    </option>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                  </select>
                  {errors?.attend && (
                    <div className="errMessage">
                      <span>{errors.attend.message}</span>
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
                    {...register("receptTime", {
                      required: "필수 필드입니다.",
                    })}
                  />
                  {errors?.receptTime && (
                    <div className="errMessage">
                      <span>{errors.receptTime.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="WritecontentDiv">
              <div className="WriteinputTitle">수령장소</div>
              <div className="WriteinputWrite">
                <div className="Writeexplandiv">
                  <select
                    className="input"
                    {...register("place", { required: "필수 필드입니다." })}
                  >
                    <option value={""}>선택해주세요</option>
                    <option value={"신촌 세븐 앞"}>신촌 세븐 앞</option>
                    <option value={"신촌 짱돌 앞"}>신촌 짱돌 앞</option>
                    <option value={"단월 농협 앞"}>단월 농협 앞</option>
                    <option value={"모시래 세븐 앞"}>모시래 세븐 앞</option>
                    <option value={"모시래 기숙사 여동 앞"}>
                      모시래 기숙사 여동 앞
                    </option>
                    <option value={"모시래 기숙사 남동 앞"}>
                      모시래 기숙사 남동 앞
                    </option>
                    <option value={"해오름 기숙사 여동 앞"}>
                      해오름 기숙사 여동 앞
                    </option>
                    <option value={"해오름 기숙사 남동 앞"}>
                      해오름 기숙사 남동 앞
                    </option>
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
                    {...register("content", { required: "필수 필드입니다." })}
                  />
                  {errors?.content && (
                    <div className="errMessage">
                      <span>{errors.content.message}</span>
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
