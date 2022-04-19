import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Context } from "../../context";
import { loadStripe } from "@stripe/stripe-js";

const CoursePageView = ({ course }) => {
  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);
  const [enroll, setEnroll] = useState("");
  const [clicked, setClicked] = useState(-1);

  const handlePaidEnrollment = async (e) => {
    try {
      if (!user) {
        router.push("/login");
      }
      if (enroll.status)
        return router.push(`/user/course/${enroll.course.slug}`);

      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (error) {
      console.log(error.response, "ERR");
    }
  };
  const handleFreeEnrollment = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        Router.push("/login");
      }
      if (enroll.status)
        return router.push(`/user/course/${enroll.course.slug}`);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      return router.push(`/user/course/${data.course.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    setEnroll(data);
  };
  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);
  return (
    <div>
      <h1>{course.name}</h1>
      <h2>{course.price}</h2>
      <h2>{course.paid ? "PAID" : "FREE"}</h2>
      <div>
        <button
          onClick={course.paid ? handlePaidEnrollment : handleFreeEnrollment}
        >
          {user
            ? enroll.status
              ? "GO to Course"
              : "enroll"
            : "login to enroll"}
        </button>
      </div>
      {course.lessons[0].free_preview ? (
        <ReactPlayer
          url={course.lessons[0].video.Location}
          width="410px"
          height="240px"
          controls
          light={course?.image?.Location}
        />
      ) : (
        <img src={course?.image?.Location} />
      )}
      {course.lessons.map((lesson) => {
        return (
          <div>
            <h4>{lesson.title}</h4>
            {lesson.free_preview && (
              <ReactPlayer
                url={course.lessons[0].video.Location}
                width="140px"
                height="140px"
                controls
                light={course.image.Location}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);

  return {
    props: {
      course: data,
    },
  };
}
export default CoursePageView;
