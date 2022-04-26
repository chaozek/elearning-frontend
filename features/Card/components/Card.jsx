import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { H4Header, StyledLink } from "../../../styling/GlobalStyledCompStyles";

const Card = ({ course }) => {
  {
    console.log(course);
  }
  return (
    <StyledLink href={`course/${course.slug}`}>
      <CardStyled>
        <div>
          <Row>
            <Image src={course.image.Location} />
            <AlignCenter className="ml-10">
              <H4Header>{course.name}</H4Header>
            </AlignCenter>
          </Row>
          <Text className="mt-10 fw-light">{course.description}</Text>
          <AlignCenter className="my-10 space-between">
            <div>{course.lessons.length} Lekcí</div>
            <div>XXX</div>
          </AlignCenter>
          <SimpleButton>Jít na kurz</SimpleButton>
        </div>
      </CardStyled>
    </StyledLink>
  );
};

const CardStyled = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  padding: 1rem;
  height: 100%;
  cursor: pointer;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 15px;
`;
const Text = styled.p`
  color: var(--text-gray);
  text-transform: capitalize;
`;
const Row = styled.div`
  display: flex;
`;
const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
const SimpleButton = styled.p`
  color: var(--text-blue);
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
`;
export default Card;
