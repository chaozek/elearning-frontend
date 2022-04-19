import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    let { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <InstructorRoute>
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
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{course.name}</td>
                <td>{course.price} $</td>
                <td>
                  <Link href={`/instructor/course/view/${course.slug}`}>
                    <button>Visit course</button>
                  </Link>
                </td>
                <td>{course.lessons.length} </td>
                <td>
                  {course.lessons.length < 5 ? (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      "You need atleast 5 lessons to publish course "
                    </p>
                  ) : course.publish ? (
                    <p
                      style={{ color: "green", fontWeight: "bold" }}
                      onClick={() => handlePublish(e)}
                    >
                      Publish Course
                    </p>
                  ) : (
                    <p
                      style={{ color: "green", fontWeight: "bold" }}
                      onClick={() => handlePublish(e)}
                    >
                      Unpublish Course
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </InstructorRoute>
  );
};

export default InstructorIndex;
