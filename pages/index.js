import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Index = ({ courses }) => {
  // console.log(courses, "COURSES");
  return (
    <ul>
      {courses &&
        courses.map((course) => (
          <Link style={{ cursor: "pointer" }} href={`/course/${course.slug}`}>
            <div>
              <li style={{ color: "green" }}>{course.name}</li>
              <img
                style={{ width: "100", height: "50" }}
                src={course?.image?.Location}
              />
            </div>
          </Link>
        ))}
    </ul>
  );
};
export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const { data } = await axios.get("http://localhost:3000/api/courses");
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
