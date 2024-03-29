import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UserRoute from "../../../components/routes/UserRoute";
const success = () => {
  const router = useRouter();
  const { id } = router.query;
  const successRequest = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stripe-success/${id}`
    );
    console.log(data);
    router.push(`/user/course/${data?.course.slug}`);
  };
  useEffect(() => {
    id && successRequest();
  }, [id]);
  return <UserRoute showNav={false}>PAYMENT OK</UserRoute>;
};

export default success;
