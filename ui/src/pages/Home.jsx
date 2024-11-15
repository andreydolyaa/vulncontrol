import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "../components/Container/Container";
import { Empty } from "../components/Empty";

export const Home = () => {
  return (
    <Container>
      <pre>
        TODO:
        <ol>
          <li>1) add confirmation modal on logout/delete of scans</li>
          <li>2) add light theme</li>
          <li>3) finish topbar</li>
          <li>4) add manual toggle to sidebar</li>
          <li>5) add Nikto</li>
          <li>6) Overview - add recent scans</li>
          <li>7) Overview - add auto start scan</li>
          <li>8) add loading to modules in sidebar</li>
          <li>9) add indication for debounce when searching</li>
          <li>10) remove leftovers of tailwind and styled components and convert to css</li>
          <li>11) server - add authorization middleware for jwt</li>
          <li>12) fix login/register page styles and redirect from reg to login</li>
          <li>13) add context menu to handle scans actions</li>

          
          
          <li>*) rewrite with ts</li>

        </ol>
      </pre>
    </Container>
  );
};
