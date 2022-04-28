import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import styled from "styled-components";
import { devices } from "responsive/devices";

const CardList = ({ courses, header = "Header" }) => {
  return (
    <>
      <CardHeader className="mt-5">{header}</CardHeader>
      <CardListWrapper>
        {courses &&
          courses.map((course, i) => <Card key={i} course={course} />)}
      </CardListWrapper>
    </>
  );
};
const CardListWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 1rem;
`;
const CardHeader = styled.h2`
  text-align: center;
  font-style: italic;
  font-weight: 100;
`;
export default CardList;
