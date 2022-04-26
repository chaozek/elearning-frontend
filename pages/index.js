import React from "react";
import axios from "axios";
import { Homepage } from "../features/pages/Homepage_page";
import Layout from "../Layouts/Layout";
const Index = ({ courses }) => {
  return (
    <Layout>
      <Homepage courses={courses} />;
    </Layout>
  );
};
export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const { data } = await axios.get(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/courses"
      : "/api/courses"
  );
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
