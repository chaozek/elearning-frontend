import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import StudentRoute from "../../../components/routes/StudentRoute";
const SingleCourse = () => {
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [clicked, setClicked] = useState(1);
  const [collapse, setCollapse] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const { slug } = router.query;
  const getCourse = async () => {
    const { data } = await axios.get(`/api/course/user/${slug}`);
    setCourse(data);
  };
  console.log(course, "course");
  useEffect(() => {
    if (slug) {
      getCourse();
    }
  }, [slug]);
  console.log(course);
  const markComplete = async (lessonId) => {
    const { data } = await axios.post(`/api/mark-complete`, {
      courseId: course._id,
      lessonId,
    });
    setCompletedLessons([...completedLessons, lessonId]);
  };

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course, updateState]);

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    setCompletedLessons(data);
  };

  const markIncomplete = async (lessonId) => {
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
  };

  useEffect(() => {
    const collapse = localStorage.getItem("userMenu");
    const parsedCollapse = JSON.parse(collapse);
    setCollapse(parsedCollapse);
  }, []);
  const handleCollapse = (mode) => {
    localStorage.setItem("userMenu", JSON.stringify(mode));
    setCollapse(mode);
  };
  return (
    <StudentRoute>
      {!course.lessons ? (
        "LOADING"
      ) : (
        <div style={{ display: "flex" }}>
          {collapse ? (
            <button onClick={() => handleCollapse(false)}>Open</button>
          ) : (
            <div
              style={{
                width: "100%",
                wordWrap: "break-word",
              }}
            >
              <button onClick={() => handleCollapse(true)}>Close</button>
              <p
                style={{
                  whiteSpace: "initial",
                }}
              >
                <ul>
                  {course?.lessons?.map((lesson, i) => {
                    return (
                      <li key={i} onClick={() => setClicked(i)}>
                        <Link
                          href={`/user/course/${course?.slug}/${lesson?.slug}/${lesson?._id}`}
                        >
                          {lesson.title}
                        </Link>
                        {completedLessons.includes(lesson._id) && (
                          <p>Completed</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </p>
            </div>
          )}
          {/*  <div style={{ width: collapse ? "100%" : "75%" }}>
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  background: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <p
                    onClick={() => markIncomplete(course.lessons[clicked]._id)}
                  >
                    Mark As Incomplete
                  </p>
                ) : (
                  <p onClick={() => markComplete(course.lessons[clicked]._id)}>
                    Mark As Completed
                  </p>
                )}
              </div>
              <ReactPlayer
                url={course.lessons[clicked].video.Location}
                height="100%"
                width="100%"
                controls
                onEnded={() => markComplete(course.lessons[clicked]._id)}
              />
              <p>{course.lessons[clicked].content}</p>
            </>
          </div> */}
        </div>
      )}
    </StudentRoute>
  );
};

export default SingleCourse;
