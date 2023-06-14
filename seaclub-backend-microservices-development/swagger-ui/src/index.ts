import * as dotenv from "dotenv";
import { app } from "./app";

const path = ".env"
dotenv.config({ path });

  
app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
