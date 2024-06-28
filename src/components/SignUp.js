// import React from "react";
// import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux";
// import { loginUser } from "../redux/thunkFunctions"
// import "../style/Login.css";

// const SignUp = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: "onChange" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = async ({ id, auNum, name, password}) => {
//     try {
//       const body = {
//         id,
//         auNum,
//         name,
//         password,
//       };
//       await dispatch(registerUser(body));
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const sendAuNum = async (email) => {
//     console.log(`Sending AuNum to ${email}`);
//   };

//   const userId = {
//     required: "필수 필드입니다.",
//   };
//   const userAuNum = {
//     required: "필수 필드입니다.",
//   }
//   const userName = {
//     required: "필수 필드입니다.",
//   }
//   const userPassword = {
//     required: "필수 필드입니다.",
//     minLength: {
//       value: 6,
//       message: "최소 6자입니다.",
//     },
//   };

//   return (
//     <div>
//       <div className="SignUpPage">
//         <div className="subdiv">
//           <div className="title">Sign Up</div>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="contentTitle">
//               <div className="inputTitle">EMAIL</div>
//               <div className="inputWirte">
//                 <input
//                   type="text"
//                   placeholder="이메일을 입력하세요."
//                   className="input"
//                   {...register("id", userId)}
//                 />
//                 <button
//                   className="sendAuNumBtn"
//                   onClick={() => sendAuNum(watch("id"))}
//                 >
//                   인증번호 전송
//                 </button>
//                 {errors?.id && (
//                   <div>
//                     <span>{errors.id.message}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="contentTitle">
//               <div className="inputTitle">인증번호</div>
//               <div className="inputWirte">
//                 <input
//                   type="auNum"
//                   className="input"
//                   {...register("auNum", userAuNum)}
//                 />
//                 {errors?.auNum && (
//                   <div>
//                     <span>{errors.auNum.message}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="contentTitle">
//               <div className="inputTitle">NAME</div>
//               <div className="inputWirte">
//                 <input
//                   type="name"
//                   className="input"
//                   {...register("name", userName)}
//                 />
//                 {errors?.name && (
//                   <div>
//                     <span>{errors.name.message}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="contentTitle">
//               <div className="inputTitle">PASSWORD</div>
//               <div className="inputWirte">
//                 <input
//                   type="password"
//                   className="input"
//                   {...register("password", userPassword)}
//                 />
//                 {errors?.password && (
//                   <div>
//                     <span>{errors?.password.message}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="button">
//               <button className="btn" type="submit">
//                 회원가입
//               </button>
//             </div>
//           </form>
//           <p className="user">
//             {""}아이디가 있다면?{""}
//             <a href="/login">로그인</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/thunkFunctions";
import "../style/Login.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async ({ id, auNum, name, password }) => {
    try {
      const body = {
        id,
        auNum,
        name,
        password,
      };
      await dispatch(registerUser(body));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const sendAuNum = async (email) => {
    console.log(`Sending AuNum to ${email}`);
  };

  const userId = {
    required: "필수 필드입니다.",
  };
  const userAuNum = {
    required: "필수 필드입니다.",
  };
  const userName = {
    required: "필수 필드입니다.",
  };
  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다.",
    },
  };

  return (
    <div>
      <div className="SignUpPage">
        <div className="subdiv">
          <div className="title">Sign Up</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="contentTitle">
              <div className="inputTitle">EMAIL</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="text"
                    placeholder="이메일을 입력하세요."
                    className="input"
                    {...register("id", userId)}
                  />
                  <button
                    type="button"
                    className="sendAuNumBtn"
                    onClick={() => sendAuNum(watch("id"))}
                  >
                    인증번호 전송
                  </button>
                </div>
                {errors?.id && (
                  <div className="errMessage">
                    <span>{errors.id.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">인증번호</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="input"
                    {...register("auNum", userAuNum)}
                  />
                </div>
                {errors?.auNum && (
                  <div className="errMessage">
                    <span>{errors.auNum.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">NAME</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="input"
                    {...register("name", userName)}
                  />
                </div>
                {errors?.name && (
                  <div className="errMessage">
                    <span>{errors.name.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="contentTitle">
              <div className="inputTitle">PASSWORD</div>
              <div className="inputWrite">
                <div className="inputWrapper">
                  <input
                    type="password"
                    className="input"
                    {...register("password", userPassword)}
                  />
                </div>
                {errors?.password && (
                  <div className="errMessage">
                    <span>{errors.password.message}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="button">
              <button className="btn" type="submit">
                회원가입
              </button>
            </div>
          </form>
          <p className="user">
            아이디가 있다면?
            <a href="/login">로그인</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;