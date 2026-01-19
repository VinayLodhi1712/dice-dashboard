import { useState, useRef, useEffect } from "react";
export default function useOnlineStatus(onChange) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const prev = useRef(isOnline);

  useEffect(() => {
    const check = async () => {
      let status = false;
      try {
        await fetch("https://www.google.com/favicon.ico", {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store",
        });
        status = true;
      } catch {
        status = false;
      }

      if (prev.current !== status) {
        onChange?.(prev.current, status);
        prev.current = status;
        setIsOnline(status);
      }
    };

    check();
    const i = setInterval(check, 3000);

    window.addEventListener("online", check);
    window.addEventListener("offline", check);

    return () => clearInterval(i);
  }, [onChange]);

  return isOnline;
}
