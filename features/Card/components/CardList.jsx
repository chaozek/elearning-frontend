import Link from "next/link";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import styled from "styled-components";
import { devices } from "responsive/devices";

const CardList = ({ courses }) => {
  return (
    <CardListWrapper>
      {courses && courses.map((course, i) => <Card course={course} />)}
    </CardListWrapper>
  );
};
const CardListWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 1rem;
`;
export default CardList;
