import { ScanWrapper } from "../styles";
import { Subdomains } from "../Subdomains/Subdomains";
import { ScansList } from "./ScansList";

export const Scans = ({ scans }) => {
  return (
    <ScanWrapper>
      <ScansList scans={scans} />
      <Subdomains />
    </ScanWrapper>
  );
};
