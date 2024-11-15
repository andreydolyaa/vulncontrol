import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Container } from "../components/Container/Container";
import { Empty } from "../components/Empty";

export const Home = () => {

  // const style = {
  //   ol {
  //     list-style-type: decimal;
  //   }
  // }
  return (
  
      <div>
        TODO:
        <ol style={{ listStyleType: "decimal" }}>
          <li> add confirmation modal on logout/delete of scans</li>
          <li> add light theme</li>
          <li> finish topbar</li>
          <li> add manual toggle to sidebar</li>
          <li> add Nikto</li>
          <li> Overview - add recent scans</li>
          <li> Overview - add auto start scan</li>
          <li> add loading to modules in sidebar</li>
          <li> add indication for debounce when searching</li>
          <li> remove leftovers of tailwind and styled components and convert to css</li>
          <li> server - add authorization middleware for jwt</li>
          <li> fix login/register page styles and redirect from reg to login</li>
          <li> add context menu to handle scans actions</li>

          
          
          <li>*) rewrite with ts</li>

        </ol>
      </div>

  );
};
