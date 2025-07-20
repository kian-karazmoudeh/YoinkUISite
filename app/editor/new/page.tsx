"use client";

import { useEffect } from "react";

const NewYoinkPage = () => {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (
        event.origin == `${window.location.origin}` &&
        event.data.type == "NEW_YOINK"
      ) {
        console.log("Message from parent:", event.data);
        alert("New Yoink");
      }
    });
  }, []);
  return (
    <div>
      <h1>New Yoink</h1>
    </div>
  );
};

export default NewYoinkPage;
