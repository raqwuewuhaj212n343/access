import cron from "node-cron";
import File from "../models/file";

function addHours(date: Date, hours: number) {
     date.setTime(date.getTime() + hours * 60 * 60 * 1000);

     return date;
}

// Schedule a task to run 3 times a day starting at (00:00)
export function runSchedule() {
     cron.schedule('0 */8 * * *', async () => {
          try {
               const batchSize = 100; // Limit the number of documents per query

               File.find({}).lean().batchSize(batchSize).cursor().eachAsync((docs, i) => {
                    const toBeDeleted = docs.filter(doc => {
                         const expire = addHours(new Date(doc.createdAt), doc.hoursToExpiry || 2);
                         const now = new Date();

                         if (now.getTime() > expire.getTime()) return true;
                         else return false;
                    });

                    File.deleteMany({ _id: { $in: toBeDeleted.map(doc => doc._id) } });
               }, { batchSize });
          } catch (error) {
               console.log(error)
          }
     }, { timezone: 'Etc/UTC' });
}
