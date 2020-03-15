declare namespace Express {
  export interface Request {
    userId: number;
    storeId: number;
  }

  export interface Response {
    sendError: any;
  }
}
