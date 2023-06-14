import cron from "node-cron";
import User from "../models/user";

// Schedule a task to run every night at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
     try {
          const batchSize = 100; // Limit the number of documents per query
          const cursor = User.find({deactivate: true, deactivateUntil: { $lte: Date.now() }})
              .lean().batchSize(batchSize).cursor();

          for (let user = await cursor.next(); user != null; user = await cursor.next()) {
               user.deactivate = false, user.deactivateUntil = null;
               await user.save()
          }
     }catch(error){
          console.log(error)
     }
}, { timezone: 'Etc/UTC'});
