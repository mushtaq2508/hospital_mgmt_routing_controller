import express, { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../db/data-source";
import axios from "axios";
import { Body, Controller, Get, HeaderParam, Param, Post, Req, Res, UseBefore } from "routing-controllers";

export class User {
  firstName: string;
  lastName: string;

  getName(): string {
    return this.lastName + ' ' + this.firstName;
  }
}

@Controller("/user")
export class UserController {
  post(@Body() user: User) {
    console.log('saving user ' + user.getName());
  }
}