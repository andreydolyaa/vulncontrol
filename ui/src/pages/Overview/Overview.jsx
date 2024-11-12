import { LineChartCustom } from "../../components/Charts/LineChartCustom";
import { Container } from "../../components/Container/Container";
import {
  NmapScans,
  OverviewBaseStyles,
  OverviewLeft,
  OverviewRight,
  RecentScans,
  SubfinderScans,
  TotalData,
} from "./styles";

export const Overview = () => {
  return (
    <Container>
      <OverviewBaseStyles>
        <OverviewLeft>
          <TotalData>
            <LineChartCustom />
          </TotalData>
          <RecentScans></RecentScans>
        </OverviewLeft>

        <OverviewRight>
          <NmapScans></NmapScans>
          <SubfinderScans></SubfinderScans>
        </OverviewRight>
      </OverviewBaseStyles>
    </Container>
  );
};
