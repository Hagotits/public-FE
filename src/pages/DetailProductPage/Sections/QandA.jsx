// import React, { useState } from 'react';
// import axios from 'axios'; // axios를 가져옵니다.
// import { FiSend } from "react-icons/fi"; // 전송 아이콘

// const QandA = ({ productId, userId, isPostOwner }) => {
//   const [question, setQuestion] = useState(""); // 질문을 저장할 상태
//   const [questions, setQuestions] = useState([]); // 질문 목록을 저장할 상태
//   const [answers, setAnswers] = useState({}); // 질문에 대한 답변 상태

//   const getValue = (e) => {
//     setQuestion(e.target.value); // question을 단순 문자열로 저장
//   };
  
//   const submit = () => {
//     let comment = question.concat(question); // 이 부분은 기존의 question과 새로운 question을 합치는 로직인 듯 합니다.
//     setQuestion(comment);
//     console.log(question);
//   };

//   const handleSendAnswer = (id, answers) => {
//     if (answers.trim()) {
//       setAnswers({ ...answers, [id]: answers }); // 특정 질문 id에 대한 답변 추가
//     }
//   };

//   return (
//     <div className="w-full mt-10">
//       <div className="text-lg text-gray-800 font-semibold mb-10">상품에 대해 궁금한 점이 있다면 판매자에게 질문하세요!</div>

//       <div>
//         {questions.length > 0 ? (
//           <ul>
//             {questions.map((q) => (
//               <li key={q.id} className="mt-2 text-gray-700">
//                 {q.content} {/* 질문 내용 표시 */}
//                 {answers[q.id] && (
//                   <div className="ml-4 mt-1 text-blue-600">답변: {answers[q.id]}</div>
//                 )}
//                 {isPostOwner && !answers[q.id] && ( // 게시글 작성자만 답변 가능한 입력란 표시
//                   <div className="flex items-center mt-2">
//                     <input
//                       className="w-[80%] bg-blue-100 p-1"
//                       placeholder="답변을 입력하세요"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           handleSendAnswer(q.id, e.target.value);
//                           e.target.value = ""; // 답변 후 입력란 초기화
//                         }
//                       }}
//                     />
//                     <button
//                       onClick={() => handleSendAnswer(q.id, document.querySelector(`#answer-${q.id}`).value)}
//                       className="ml-2 cursor-pointer"
//                     >
//                       <FiSend />
//                     </button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div>질문 없음</div>
//         )}
//       </div>

//       <div className="w-full flex items-center mt-5">
//         <input
//           name="comment"
//           className="w-[90%] bg-gray-100 p-2 rounded-md"
//           placeholder="내용을 입력하세요."
//           // value={question} //입력 값을 상태와 연결
//           // onChange={(e) => setQuestion(e.target.value)} // 입력 변경 시 상태 업데이트
//           onChange={getValue}
//         />
//         {/* <button onClick={handleSendQuestion} className="ml-2 cursor-pointer"> */}
//         <button onClick={submit} className="ml-2 cursor-pointer">
//           <FiSend />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QandA;








// import React, { useState } from 'react';
// import { FiSend } from "react-icons/fi"; // 전송 아이콘
// // import axiosInstance from "../../../utils/axios";

// const QandA = ({ productId, userId, isPostOwner }) => {
//   const [question, setQuestion] = useState(""); // 질문을 저장할 상태
//   const [questions, setQuestions] = useState([]); // 질문 목록을 저장할 상태
//   const [answers, setAnswers] = useState({}); // 질문에 대한 답변 상태

//   const getValue = (e) => {
//     setQuestion(e.target.value); // question을 단순 문자열로 저장
//   };
  
//   const submit = () => {
//     if (question.trim()) { // 질문이 비어 있지 않을 때만
//       const newQuestion = { id: questions.length + 1, content: question }; // 질문 객체 생성
//       setQuestions([...questions, newQuestion]); // 질문 목록에 추가
//       setQuestion(""); // 질문 입력란 초기화
//     }
//   };

//   const handleSendAnswer = (id, answer) => {
//     if (answer.trim()) {
//       setAnswers({ ...answers, [id]: answer }); // 특정 질문 id에 대한 답변 추가
//     }
//   };

//   return (
//     <div className="w-full mt-10">
//       <div className="text-lg text-gray-800 font-semibold mb-10">상품에 대해 궁금한 점이 있다면 판매자에게 질문하세요!</div>

//       <div>
//         {questions.length > 0 ? (
//           <ul>
//             {questions.map((q) => (
//               <li key={q.id} className="mt-2 text-gray-700">
//                 {q.content} {/* 질문 내용 표시 */}
//                 {answers[q.id] && (
//                   <div className="ml-4 mt-1 text-blue-600">답변: {answers[q.id]}</div>
//                 )}
//                 {isPostOwner && !answers[q.id] && ( // 게시글 작성자만 답변 가능한 입력란 표시
//                   <div className="flex items-center mt-2">
//                     <input
//                       className="w-[80%] bg-blue-100 p-1"
//                       placeholder="답변을 입력하세요"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           handleSendAnswer(q.id, e.target.value);
//                           e.target.value = ""; // 답변 후 입력란 초기화
//                         }
//                       }}
//                     />
//                     <button
//                       onClick={() => handleSendAnswer(q.id, document.querySelector(`#answer-${q.id}`).value)}
//                       className="ml-2 cursor-pointer"
//                     >
//                       <FiSend />
//                     </button>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div>질문 없음</div>
//         )}
//       </div>

//       <div className="w-full flex items-center mt-5">
//         <input
//           name="comment"
//           className="w-[90%] bg-gray-100 p-2 rounded-md"
//           placeholder="내용을 입력하세요."
//           value={question} //입력 값을 상태와 연결
//           onChange={getValue} // 입력 변경 시 상태 업데이트
//         />
//         <button onClick={submit} className="ml-2 cursor-pointer">
//           <FiSend />
//         </button>
//       </div>

//       {/* {questions.length === 0 && <div>질문 없음</div>} */}
//     </div>
//   );
// };

// export default QandA;




import React, { useState, useEffect } from 'react';
import { FiSend } from "react-icons/fi"; // 전송 아이콘

const QandA = ({ productId, userId, isPostOwner }) => {
  const [question, setQuestion] = useState(""); // 질문을 저장할 상태
  const [questions, setQuestions] = useState([]); // 질문 목록을 저장할 상태
  const [answers, setAnswers] = useState({}); // 질문에 대한 답변 상태

  // 컴포넌트가 마운트될 때 localStorage에서 질문 불러오기
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);
  }, []);

  // 질문 목록이 변경될 때마다 localStorage에 저장하기
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

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

  const handleSendAnswer = (id, answer) => {
    if (answer.trim()) {
      setAnswers({ ...answers, [id]: answer }); // 특정 질문 id에 대한 답변 추가
    }
  };

  return (
    <div className="w-full mt-10">
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
          <div>질문 없음</div>
        )}
      </div>

      <div className="w-full flex items-center mt-5">
        <input
          name="comment"
          className="w-[90%] bg-gray-100 p-2 rounded-md"
          placeholder="내용을 입력하세요."
          value={question} //입력 값을 상태와 연결
          onChange={getValue} // 입력 변경 시 상태 업데이트
        />
        <button onClick={submit} className="ml-2 cursor-pointer">
          <FiSend />
        </button>
      </div>

      {/* {questions.length === 0 && <div>질문 없음</div>} */}
    </div>
  );
};

export default QandA;