import { connect } from "mongoose";
export const dbConfig = async () => {
  try {
    await connect(process.env.MONGO_DB as string).then(() => {
      console.clear();
      console.log("Connected Successfully❤️❤️🚀❤️");
    });
  } catch (error) {
    console.log(error);
  }
};
