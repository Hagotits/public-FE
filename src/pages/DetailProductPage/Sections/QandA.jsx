import React, { useState } from 'react';

import { FiSend } from "react-icons/fi"; // 전송 아이콘

const QandA = ({ isPostOwner }) => {
  const [question, setQuestion] = useState(""); // 질문을 저장할 상태
  const [questions, setQuestions] = useState([]); // 질문 목록을 저장할 상태
  const [answers, setAnswers] = useState({}); // 질문에 대한 답변 상태

  const handleSendQuestion = () => {
    if (question.trim()) { // 질문이 공백이 아니면 전송
      setQuestions([...questions, { text: question, id: questions.length }]); // 새로운 질문 추가
      setQuestion(""); // 입력 필드 초기화
    }
  }

  const handleSendAnswer = (id, answers) => {
    if (answers.trim()) {
      setAnswers({...answers, [id]: answers }); // 특정 질문 id에 대한 답변 추가
    }
  };

  return (
    <div className="w-full mt-10">
      <div className="text-lg text-gray-800 font-semibold mb-10">상품에 대해 궁금한 점이 있다면 판매자에게 질문하세요!</div>

      <div>
        { questions.length > 0 ? (
          <ul>
            {questions.map((q) => (
              <li key={q.id} className="mt-2 text-gray-700">
                {q.text}
                {answers[q.id] && (
                  <div className="ml-4 mt-1 text-blue-600">답변: {answers[q.id]}</div>
                )}
                {isPostOwner && !answers[q.id] && ( // 게시글 작성자만 답변 가능한 입력란 표시
                  <div className="flex items-center mt-2">
                    <input
                      className="w-[80%] bg-blue-100 p-1"
                      placeholder="답변을 입력하세요"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendAnswer(q.id, e.target.value);
                          e.target.value = ""; // 답변 후 입력란 초기화
                        }
                      }}
                    />
                    <button
                      onClick={() => handleSendAnswer(q.id, document.querySelector(`#answer-${q.id}`).value)}
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
          <div>질문이 없습니다.</div>
        )}
      </div>

      <div className="w-full flex items-center mt-5">
        <input
          className="w-[90%] bg-gray-100 p-2 rounded-md"
          placeholder="내용을 입력하세요."
          value={question} //입력 값을 상태와 연결
          onChange={(e) => setQuestion(e.target.value)} // 입력 변경 시 상태 업데이트
        />
        <button onClick={handleSendQuestion} className="ml-2 cursor-pointer">
          <FiSend />
        </button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default QandA;
