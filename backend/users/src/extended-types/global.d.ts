declare namespace Express {
    export interface Request {
      user: {
        _id: string;
        email:  string;
        role: string;
      },
      cookies: {
        token: string
      }
    }
  }
  
declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
    ACCESS_TOKEN: string;
    RABBITMQ_URI: string;
  }
}
  