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
const SimpleButton = styled.p`
  color: var(--text-blue);
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;
`;
const AlignPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Button = styled.button`
  background-color: white;
  color: black;
  border: 2px solid #555555;
  padding: 8px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  :hover {
    background-color: #555555;
    color: white;
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:focus {
    outline: none;
  }
`;
const Input = styled.input`
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
export {
  H4Header,
  StyledLink,
  StyledLinkWrapper,
  SimpleButton,
  AlignPage,
  Button,
  Form,
  Input,
};
