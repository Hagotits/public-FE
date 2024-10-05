import React, { useRef } from "react";

const PushNotification = () => {
  const notificationRef = useRef(null);
  const timerRef = useRef(null); // 타이머를 저장하기 위한 useRef 추가

  if (!Notification) {
    // Notification 객체 존재하지 않으면 return
    return;
  }

  if (Notification.permission !== "granted") {
    // push 알림을 허용하는지 확인() 기본이 허용: granted
    // 유저에게 푸시 알림 허용 요청
    Notification.requestPermission() // push알림을 허용할지 묻기
      .then((permission) => {
        if (permission !== "granted") return;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault(); // 다른 페이지로 이동 등을 방지
      window.focus(); // 브라우저 창 활성화(화면 전면에 띄움)
      notificationRef.current.close(); // 알림을 닫음
    };
  };

  const setNotificationTimer = (timeout) => {
    // clearTimeout을 위해 timerRef 사용
    timerRef.current = setTimeout(() => {
      // 알림을 추적하고, 동작중인지 확인
      timerRef.current = null;
      notificationRef.current.close();
      notificationRef.current = null;
    }, timeout);
  };

  const fireNotificationWithTimeout = (title, timeout, options = {}) => {
    // 유저가 푸시 알림을 껐다면 실행되지 않도록
    if (Notification.permission !== "granted") return;

    const newOption = {
      badge: "https://babble.gg/img/logos/babble-speech-bubble.png",
      icon: "https://babble.gg/img/logos/babble-speech-bubble.png",
      ...options,
    };

    if (!notificationRef.current) {
      setNotificationTimer(timeout);
      notificationRef.current = new Notification(title, newOption);
      setNotificationClickEvent();
    }
  };

  const fireNotification = (title, options = {}) => {
    const newOption = {
      badge: "",
      icon: "",
      ...options,
    };
    notificationRef.current = new Notification(title, newOption);
    setNotificationClickEvent();
  };

  // 두 가지 알림 함수 반환
  return { fireNotificationWithTimeout, fireNotification };
};

export default PushNotification;
