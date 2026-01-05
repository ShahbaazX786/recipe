import cron from "cron";
import https from "https";
import { ENV } from "./env.js";

// Let's send a request every 14 minutes to keep the server up and running
const renderTickerJob = new cron.CronJob("*/14 * * * *", () => {
  https
    .get(ENV.API_URL!, (res) => {
      if (res.statusCode === 200) console.log("GET Request sent successfully!");
      else console.log("GET Request Failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending a GET Request", e));
});

export default renderTickerJob;
