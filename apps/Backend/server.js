import "dotenv/config";
import app from "./index.js";
import { connectToDB } from "./config/database.js";

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server connected to DB and listening to PORT : ${PORT}`);
        });
    } catch (error) {
        console.error("Connection to server Unsuccessful: ", error);
        process.exit(1);
    }
};

startServer();