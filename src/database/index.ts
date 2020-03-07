import mongoose from 'mongoose';


class Database {

  public connection: any;

  constructor() {
    this.mongo();
  }

  
  private mongo(): void {
    let MONGO_URL: string | any;

    if (process.env.NODE_ENV !== 'test') {
      MONGO_URL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
    } else {
      MONGO_URL = process.env.MONGO_URL;
    }

    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default Database;
