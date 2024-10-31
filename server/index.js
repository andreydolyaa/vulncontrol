import dotenv from "dotenv";
import { HttpServer } from "./src/core/HttpServer.js";
import { Database } from "./src/core/Database.js";
import router from "./src/router.js";
import logger from "./src/core/logger.js";
import { Nmap } from "./src/modules/Nmap/Nmap.js";
import { removeAll } from "./src/modules/db-actions/db-actions.js";
import { NmapScan } from "./src/models/nmap-model.js";

dotenv.config();

const server = new HttpServer({
  port: Number(process.env.SERVER_PORT),
  router,
});

const database = new Database(process.env.DB_URL);

server
  .run()
  .then(async () => {
    await database.connect();
  })
  .then(async () => {
    // TESTING:
    // const nmap = new Nmap({
    //   userId: "670f918c18444c7f0002e09e",
    //   scanType: "X",
    //   args: ["-sV","-p-", "192.168.178.241"],
    // });
    // const proc = await nmap.start();
    // setTimeout(() => {
    //   console.log('Main process will now send SIGKILL to itself...');
    //   proc.kill('SIGKILL'); // This kills the main process with SIGKILL
    // }, 2000);
    // await removeAll(NmapScan);

    // setInterval(() => {
    //   server.websocketServer.updateSubsAtSubscription("/nmap/updates", {
    //     _id: {
    //       $oid: "6722cfc27862eb3f38078028",
    //     },
    //     stdout: [
    //       "server: starting nmap docker image...\n",
    //       "server: starting nmap scan...\n",
    //       "server: nmap nmap -sV 192.168.178.241 -v\n",
    //       "Starting Nmap 7.95 ( https://nmap.org ) at 2024-10-31 00:30 UTC\n",
    //       "NSE: Loaded 47 scripts for scanning.\n",
    //       'Failed to resolve "nmap".\n',
    //       "Initiating Ping Scan at 00:30\n",
    //       "Scanning 192.168.178.241 [4 ports]\nCompleted Ping Scan at 00:30, 0.01s elapsed (1 total hosts)\n",
    //       "Initiating Parallel DNS resolution of 1 host. at 00:30\n",
    //       "Completed Parallel DNS resolution of 1 host. at 00:30, 0.00s elapsed\nInitiating SYN Stealth Scan at 00:30\n",
    //       "Scanning 192.168.178.241 [1000 ports]\nDiscovered open port 3000/tcp on 192.168.178.241\n",
    //       "Completed SYN Stealth Scan at 00:30, 0.05s elapsed (1000 total ports)\n",
    //       "Initiating Service scan at 00:30\n",
    //       "Scanning 1 service on 192.168.178.241\nCompleted Service scan at 00:31, 11.05s elapsed (1 service on 1 host)\nNSE: Script scanning 192.168.178.241.\nInitiating NSE at 00:31\n",
    //       "Completed NSE at 00:31, 0.01s elapsed\nInitiating NSE at 00:31\n",
    //       "Completed NSE at 00:31, 0.00s elapsed\n",
    //       "Nmap scan report for 192.168.178.241\n",
    //       "Host is up (0.00095s latency).\nNot shown: 999 closed tcp ports (reset)\nPORT     STATE SERVICE VERSION\n3000/tcp open  http    Node.js Express framework\n\nRead data files from: /usr/bin/../share/nmap\nService detection performed. Please report any incorrect results at https://nmap.org/submit/ .\nNmap done: 1 IP address (1 host up) scanned in 11.39 seconds\n           Raw packets sent: 1004 (44.152KB) | Rcvd: 1001 (40.044KB)\n",
    //       "server: scan done111111111111111111111111111111!\n",
    //     ],
    //     userId: {
    //       $oid: "670f918c18444c7f0002e09e",
    //     },
    //     target: "192.168.178.241",
    //     scanType: "BRO",
    //     status: "done",
    //     startTime: {
    //       $date: "2024-10-31T00:30:58.306Z",
    //     },
    //     command: "nmap -sV 192.168.178.241",
    //     openPorts: [3000],
    //     id: "6722cfc27862eb3f38078028",
    //   });
    // }, 3000);
  });

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await database.disconnect();
  process.exit(0);
});
