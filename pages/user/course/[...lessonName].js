import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import StudentRoute from "../../../components/routes/StudentRoute";
const LessonName = () => {
  const router = useRouter();
  const [lesson, setLesson] = useState({});
  /*   const [clicked, setClicked] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [updateState, setUpdateState] = useState(false); */
  const query = router.query.lessonName;
  const lessonSlug = query && query[1];
  const courseSlug = query && query[0];
  console.log(lessonSlug, "F");
  const getLesson = async () => {
    if (lessonSlug && courseSlug) {
      console.log("HIT");
      const { data } = await axios.get(
        `/api/course/user/${courseSlug}/${lessonSlug}`
      );
    }

    setLesson(data);
  };

  useEffect(() => {
    if (lessonSlug && courseSlug) {
      getLesson();
    }
  }, [lessonSlug, courseSlug]);

  /*   const markComplete = async (lessonId) => {
    const { data } = await axios.post(`/api/mark-complete`, {
      courseId: course._id,
      lessonId,
    });
    setCompletedLessons([...completedLessons, lessonId]);
  }; */

  /*   useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course, updateState]); */

  /*   const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    setCompletedLessons(data);
  }; */

  /*   const markIncomplete = async (lessonId) => {
    try {
      const { data } = await axios.post(`/api/mark-incompleted`, {
        courseId: course._id,
        lessonId,
      });

      const all = completedLessons;
      const index = all.indexOf(lessonId);
      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  /*   useEffect(() => {
    const collapse = localStorage.getItem("userMenu");
    const parsedCollapse = JSON.parse(collapse);
    setCollapse(parsedCollapse);
  }, []);

  const handleCollapse = (mode) => {
    localStorage.setItem("userMenu", JSON.stringify(mode));
    setCollapse(mode);
  }; */

  return <StudentRoute>test</StudentRoute>;
};

export default LessonName;
