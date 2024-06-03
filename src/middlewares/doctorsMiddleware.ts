import express, { Request, Response, NextFunction } from "express-serve-static-core";

export const doctorsMiddleware = ( req: express.Request, res: express.Response,  next: express.NextFunction ) => {
  next();
};