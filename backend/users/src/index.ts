import * as dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/mongodb";
import { rabbitmqWrapper } from "@seaclub/common";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const path = ".env"
dotenv.config({ path });

connectDB();

const start = async () => {
    if (!process.env.ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN must be defined");
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }
    if (!process.env.RABBITMQ_URI) {
        throw new Error("RABBITMQ_URI must be defined");
    }

    await rabbitmqWrapper.connect(process.env.RABBITMQ_URI);
    await new OrderCreatedListener(rabbitmqWrapper.channel).listen();
}
  
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});

start();