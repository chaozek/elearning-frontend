import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/styles.scss";
import React from "react";
import Nav from "./../components/Nav";
import Hero from "./../components/Hero";
import Layout from "../containers/Layout";
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "../context/index";
import "../public/styles.scss";
const GlobalStyle = createGlobalStyle`
 h1 {
   font-size: 4rem;
 }
 td, th, tr{
    margin: 10px;
    padding: 10x
}
`;
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Head>
        <title>SSR styled-components with Next.js Starter</title>
        <link rel="shortcut icon" href="../favicon.ico" />
      </Head>
      <GlobalStyle />
      <ToastContainer />
      <Nav />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
