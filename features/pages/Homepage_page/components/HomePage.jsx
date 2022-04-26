// @flow
import Link from "next/link";
import React from "react";
import { CardList } from "../../../Card";
const Homepage = ({ courses }) => {
  return <CardList courses={courses} />;
};

export default Homepage;
