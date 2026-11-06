
"use client";

import { useEffect, useState } from "react";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Intl.DateTimeFormat("bn-BD", {
      dateStyle: "full",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setDate(today);
  }, []);

  return (
    <p className="mt-1 text-xs text-gray-500">
      {date || "তারিখ লোড হচ্ছে..."}
    </p>
  );
};

export default DateDisplay;
