import { LoadingBlink } from "../../components/LoadingBlink";
import { MODULE_TYPE } from "../../constants";
import { parseDate } from "../../utils";

export const CustomPopup = ({ point, loading, error }) => {
  const isNmap = point.type === MODULE_TYPE.NMAP;
  const Display = () => {
    return (
      <pre>
        <p>Target: {point.data?.target || ""}</p>
        <p>Lon/Lat: {point.data?.geoData?.ll.map((x) => x + " ")}</p>
        <p>Country: {point.data?.geoData?.country || ""}</p>
        {isNmap && <p>Command: nmap {point.data?.command || ""}</p>}
        {isNmap && (
          <p>Ports discovered: {point.data?.openPorts.length || "0"}</p>
        )}
        <p>Started: {parseDate(point.data?.startTime) || ""}</p>
        <p>Ended: {parseDate(point.data?.endTime) || ""}</p>
        <p>Scan type: {point.data?.scanType || "N/A"}</p>
        <div>
          IP data -
          {point.data?.ipData.map((ip) => (
            <div key={ip.address}>
              IPv{ip.family} {ip.address}
            </div>
          ))}
        </div>
      </pre>
    );
  };

  return (
    <div className="custom-popup">
      {loading ? (
        <LoadingBlink />
      ) : error ? (
        <div>Error {error.message}</div>
      ) : (
        <Display />
      )}
    </div>
  );
};
