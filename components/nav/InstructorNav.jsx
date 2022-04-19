import React from "react";
import Link from "next/link";
const InstructorNav = () => {
  return (
    <div style={{ background: "#BADA55", color: "#00000" }}>
      <div style={{ padding: "1rem" }}>
        <ul>
          <li>
            <Link
              style={{ display: "block", backgroundColor: "blue" }}
              href="/instructor/course/create"
            >
              Create Course
            </Link>
          </li>
          <li>
            <Link style={{ display: "block" }} href="/instructor/">
              Instructor dashBoard
            </Link>
          </li>
          <li>
            <Link style={{ display: "block" }} href="/instructor/revenue">
              revenue
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InstructorNav;
