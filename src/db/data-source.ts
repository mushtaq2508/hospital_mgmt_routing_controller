import "reflect-metadata";
import { DataSource } from "typeorm";
import { Doctors } from "../models/doctors";
import { Patients } from "../models/patients";
import { User } from "../models/user";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb+srv://mushtaqahamed8996:AtKhVtFHgcKykAwZ@mushtaq.axcuxbt.mongodb.net/?retryWrites=true&w=majority&appName=mushtaq",
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [Doctors, Patients, User]
});