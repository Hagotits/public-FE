import React, { useState, useEffect } from 'react';
import { FiSend } from "react-icons/fi"; // 전송 아이콘

const QandA = ({ productId, userId, isPostOwner }) => {
  const [question, setQuestion] = useState(""); // 질문을 저장할 상태
  const [questions, setQuestions] = useState([]); // 질문 목록을 저장할 상태
  const [answers, setAnswers] = useState({}); // 질문에 대한 답변 상태
  const [currentAnswer, setCurrentAnswer] = useState({}); // 각 질문에 대한 현재 답변을 상태로 관리

  // 게시물별로 localStorage에서 질문과 답변 불러오기
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem(`questions_${productId}`)) || [];
    const storedAnswers = JSON.parse(localStorage.getItem(`answers_${productId}`)) || {};
    setQuestions(storedQuestions);
    setAnswers(storedAnswers);
  }, [productId]);

  // 질문 목록이 변경될 때마다 localStorage에 저장하기
  useEffect(() => {
    localStorage.setItem(`questions_${productId}`, JSON.stringify(questions));
  }, [questions, productId]);

  // 답변이 변경될 때마다 해당 게시물의 답변을 localStorage에 저장하기
  useEffect(() => {
    localStorage.setItem(`answers_${productId}`, JSON.stringify(answers));
  }, [answers, productId]);

  const getValue = (e) => {
    setQuestion(e.target.value); // question을 단순 문자열로 저장
  };
  
  const submit = () => {
    if (question.trim()) { // 질문이 비어 있지 않을 때만
      const newQuestion = { id: questions.length + 1, content: question }; // 질문 객체 생성
      setQuestions([...questions, newQuestion]); // 질문 목록에 추가
      setQuestion(""); // 질문 입력란 초기화
    }
  };

  const handleAnswerChange = (id, answer) => {
    setCurrentAnswer({ ...currentAnswer, [id]: answer }); // 특정 질문 id에 대한 현재 답변 상태 업데이트
  };

  const handleSendAnswer = (id) => {
    if (currentAnswer[id]?.trim()) {
      const updatedAnswers = { ...answers, [id]: currentAnswer[id] };
      setAnswers(updatedAnswers); // 특정 질문 id에 대한 답변 추가
      setCurrentAnswer({ ...currentAnswer, [id]: "" }); // 입력란 초기화
    }
  };

  return (
    <div className="w-full mt-1 border-b border-gray-300 py-[40px]">
      <div className="text-lg text-gray-800 font-semibold mb-10">상품에 대해 궁금한 점이 있다면 판매자에게 질문하세요!</div>

      <div>
        {questions.length > 0 ? (
          <ul>
            {questions.map((q) => (
              <li key={q.id} className="mt-2 text-gray-700">
                {q.content} {/* 질문 내용 표시 */}
                {answers[q.id] && (
                  <div className="ml-4 mt-1 text-blue-600">답변: {answers[q.id]}</div>
                )}
                {isPostOwner && !answers[q.id] && ( // 게시글 작성자만 답변 가능한 입력란 표시
                  <div className="flex items-center mt-2">
                    <input
                      className="w-[80%] bg-blue-100 p-1"
                      placeholder="답변을 입력하세요"
                      value={currentAnswer[q.id] || ""} // 각 질문의 현재 답변 상태와 연결
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    />
                    <button
                      onClick={() => handleSendAnswer(q.id)}
                      className="ml-2 cursor-pointer"
                    >
                      <FiSend />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>질문 없음</div>
        )}
      </div>

      <div className="w-full flex items-center mt-5">
        <input
          name="comment"
          className="w-[90%] bg-gray-100 p-2 rounded-md mt-5"
          placeholder="내용을 입력하세요."
          value={question} // 입력 값을 상태와 연결
          onChange={getValue} // 입력 변경 시 상태 업데이트
        />
        <button onClick={submit} className="ml-2 cursor-pointer mt-5">
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default QandA;