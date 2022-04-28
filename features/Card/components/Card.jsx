import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { H4Header, StyledLink } from "../../../styling/GlobalStyledCompStyles";
import { SimpleButton } from "@/styling/GlobalStyledCompStyles";
const Card = ({ course }) => {
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
            {course.paid && !course.bought && (
              <CardPrice>{course.price} $</CardPrice>
            )}
            {!course.paid && !course.bought ? (
              <CardFreeBadge>Free</CardFreeBadge>
            ) : (
              course.bought && <CardFreeBadge orange>Enrolled</CardFreeBadge>
            )}
          </AlignCenter>
          <SimpleButton>Go to course</SimpleButton>
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
const CardPrice = styled.p`
  color: var(--text-gray);
  text-transform: capitalize;
  font-weight: bold;
`;
const Row = styled.div`
  display: flex;
`;
const CardFreeBadge = styled.div`
  display: flex;
  background-color: ${(props) => (props.orange ? "#f05400" : "#026d21")};
  color: white;
  padding: 1px 10px;
  border-radius: 3px;
`;
const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export default Card;
