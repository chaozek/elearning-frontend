import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context";
const Callback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-account-status`)
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/instructor";
        });
    }
  }, [user]);
  return <>Loading...</>;
};

export default Callback;
