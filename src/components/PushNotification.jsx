import React, { useRef, useEffect } from "react";
import atom from "./images/atom.png";

const PushNotification = () => {
  const notificationRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // 알림 권한을 한 번만 확인
    if (!Notification) {
      console.error("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission()
        .then((permission) => {
          console.log("알림권한: ", permission);
          if (permission !== "granted") {
            console.warn("알림 권한이 거부되었습니다.");
          }
        })
        .catch((err) => {
          console.error("알림 권한 요청 중 오류 발생:", err);
        });
    }
  }, []);

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };

  const setNotificationTimer = (timeout) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // 이전 타이머 정리
    }
    timerRef.current = setTimeout(() => {
      if (notificationRef.current) {
        notificationRef.current.close();
        notificationRef.current = null;
      }
    }, timeout);
  };

  const fireNotificationWithTimeout = (title, timeout, options = {}) => {
    if (Notification.permission !== "granted") {
      console.log("알림 권한이 없습니다.");
      return;
    }
    console.log("알림 생성", title);

    // `badge`와 `icon`은 이미지 URL이어야 함
    const newOption = {
      badge: atom,
      icon: atom,
      ...options,
    };

    if (!notificationRef.current) {
      notificationRef.current = new Notification(title, newOption);
      setNotificationClickEvent();
      setNotificationTimer(timeout);
    }
  };

  const fireNotification = (title, options = {}) => {
    if (Notification.permission !== "granted") return;

    const newOption = {
      badge: atom,
      icon: atom,
      ...options,
    };

    notificationRef.current = new Notification(title, newOption);
    setNotificationClickEvent();
  };

  return { fireNotificationWithTimeout, fireNotification };
};

export default PushNotification;
