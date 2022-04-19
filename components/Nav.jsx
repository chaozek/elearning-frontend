import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Context } from "../context";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  list-style-type: none;
  padding: 0;
  margin: 0;
  a {
    color: white;
    font-weight: bold;
  }
`;
const Li = styled.li`
  margin-right: 20px;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #bada55;
`;
const Nav = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.get(`/api/logout`);
      dispatch({
        type: "LOGOUT",
      });
      toast.warning(data.data.message, {
        icon: "🚀",
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response, {
        icon: false,
      });
      setLoading(false);
    }
  };

  return (
    <NavBar>
      <Ul>
        <Li>
          {user && user.role && user.role.includes("Instructor") ? (
            <Li>
              <Link href="/instructor/course/create">Create course</Link>
            </Li>
          ) : (
            <Li>
              <Link href="/user/become-instructor">Become Instructor</Link>
            </Li>
          )}
        </Li>
        <Li>
          {!user ? (
            <Link href="/user/become-instructor">Home</Link>
          ) : (
            <Link href="/user">Dashboard</Link>
          )}
        </Li>
        {!user && (
          <>
            <Li>
              <Link href="/register">Register</Link>
            </Li>
            <Li>
              <Link href="/login">login</Link>
            </Li>
          </>
        )}
        {user && (
          <Li onClick={(e) => handleLogout(e)}>
            <Link href="#">Logout</Link>
          </Li>
        )}
      </Ul>
    </NavBar>
  );
};

export default Nav;
