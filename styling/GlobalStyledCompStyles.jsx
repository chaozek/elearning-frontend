import Link from "next/link";
import styled from "styled-components";

const H4Header = styled.h4`
  font-size: 1.25rem;
  border-radius: 10px;
  text-transform: capitalize;
  margin: 0;
`;

const StyledLink = styled(Link)`
  ${(props) => {
    props.color === "primary" && "--primary-gray";
  }}
  position: relative;
`;
const StyledLinkWrapper = styled.div`
  cursor: pointer;
`;

export { H4Header, StyledLink, StyledLinkWrapper };
