import cron from "node-cron";
import Module from "../schema/module.js";

const everyMinuteCron = "* * * * *";
const midnightCron = "0 0 * * *";

export const resetExercisesCron = () => {
  cron.schedule(
    midnightCron,
    async () => {
      console.log("Reset exercises starting...");

      try {
        await Module.updateMany(
          {},
          {
            $set: {
              progress: 0,
              "exercises.$[].completed": false,
            },
          }
        );

        console.log("Reset exercises complete!");
      } catch (err) {
        console.log("Reset exercises failed");
        console.log(err);
      }
    },
    {
      timezone: "America/New_York",
    }
  );
};
