import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios"; // axiosInstance 추가

const SendReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const [deal, setDeal] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const onSubmit = async (data) => {
    const { score, review } = data;
    const body = { score, selectedOptions, review };
    try {
      const response = await axiosInstance.post(
        `/reviews/submit/${productId}`,
        body
      );
      navigate("/mypage"); // 성공 시 마이페이지로 이동
      reset();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await axiosInstance.get(`/deals/${productId}`);
        setDeal(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDeal();
  }, [productId]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    // 이미 선택된 옵션이면 제거, 없으면 추가
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="text-center m-7">
      <h2 className="text-xl font-bold mb-5">거래후기 작성</h2>
      {deal.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-left flex flex-col space-y-4">
            {/* 별점 */}
            <div>
              <label className="block font-semibold">거래 만족도</label>
              <select
                className="border rounded px-3 py-2 w-full"
                {...register("score", { required: "별점을 선택해주세요" })}
              >
                <option value="">선택하세요</option>
                <option value="1">1점</option>
                <option value="2">2점</option>
                <option value="3">3점</option>
                <option value="4">4점</option>
                <option value="5">5점</option>
              </select>
              {errors?.score && (
                <div className="mt-1 text-red-500 text-sm">
                  <span>{errors.score.message}</span>
                </div>
              )}
            </div>

            {/* 선택사항 */}
            <div>
              <label className="text-xl">해당되는 부분을 선택해 주세요.</label>
              <div>
                <input
                  type="checkbox"
                  value="시간 약속을 잘 지켜요."
                  onChange={handleOptionChange}
                />
                <label className="mx-2">시간 약속을 잘 지켜요.</label>
                <br />
                <input
                  type="checkbox"
                  value="다음번에도 거래하고 싶어요."
                  onChange={handleOptionChange}
                />
                <label className="mx-2">다음번에도 거래하고 싶어요.</label>
                <br />
                <input
                  type="checkbox"
                  value="답장이 빨라요."
                  onChange={handleOptionChange}
                />
                <label className="mx-2">답장이 빨라요.</label>
                <br />
                <input
                  type="checkbox"
                  value="친절해요."
                  onChange={handleOptionChange}
                />
                <label className="mx-2">친절해요.</label>
              </div>
            </div>

            {/* 후기 */}
            <div>
              <label className="block font-semibold">후기 작성하기</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                placeholder="후기를 작성해주세요"
                {...register("review")}
              ></textarea>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              후기 보내기
            </button>
          </div>
        </form>
      ) : (
        <p>진행한 거래가 없습니다.</p>
      )}
    </div>
  );
};

export default SendReview;
