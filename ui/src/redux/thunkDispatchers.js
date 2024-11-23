import { deleteScan, startScan } from "./nmap";
import { deleteSubfinderScan } from "./subfinder/subfinderThunks";
import { logout } from "./userSlice";

export const thunkDispatchers = {
  deleteScan: deleteScan,
  deleteSubfinderScan: deleteSubfinderScan,
  logout: logout,
  startScan: startScan
};
