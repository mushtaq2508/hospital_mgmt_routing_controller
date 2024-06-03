import { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

@Entity("user")
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  userID?: number;
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
}