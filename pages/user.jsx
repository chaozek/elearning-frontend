import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import axios from "axios";
import UserRoute from "../components/routes/UserRoute";
import Link from "next/link";
const user = () => {
  const [courses, setCourses] = useState([]);
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const loadCourses = async () => {
    const { data } = await axios.get(`/api/user-courses`);
    setCourses(data);
  };
  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <UserRoute>
      {" "}
      <thead>
        <th></th>
        <th>Name</th>
        <th>Price</th>
        <th>Link</th>
        <th>Lesson count</th>
      </thead>
      <tbody>
        {courses &&
          courses.map((course, i) => {
            return (
              <tr key={i}>
                {console.log(course)}
                <td>
                  <img
                    src={course.image && course.image.Location}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{course.name}</td>
                <td>{course.price} $</td>
                <td>
                  <Link href={`/user/course/${course.slug}`}>
                    <button>Visit course</button>
                  </Link>
                </td>
                <td>{course.lessons.length} </td>
              </tr>
            );
          })}
      </tbody>
    </UserRoute>
  );
};

export default user;
