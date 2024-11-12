import React from "react";
import { useSelector } from "react-redux";
import { RadialChart } from "../components/Charts/RadialChart";
import styled from "styled-components";

export const Home = () => {
  const { loading } = useSelector((state) => state.user);
  return (
    <HomeContainer>
      <ChartsContainer>
        <ChartDiv>
          <RadialChart />
        </ChartDiv>
        {/* <ChartDiv>
          <RadialChart />
        </ChartDiv> */}
      </ChartsContainer>

      <ChartsContainer>
        {/* <ChartDiv>
          <RadialChart />
        </ChartDiv>
        <ChartDiv>
          <RadialChart />
        </ChartDiv> */}
      </ChartsContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  /* border: 1px solid blue; */
  width: 100%;
  height: 100%;
`;

const ChartsContainer = styled.div`
  width: 100%;
  display: flex;
  /* border: 1px solid red; */
  /* height: 100%; */
`;

const ChartDiv = styled.div`
  width: 100%;
  /* height:100%; */
  border: 1px solid orange;
`;
