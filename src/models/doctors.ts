import { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";

@Entity("doctors")
export class Doctors extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  doctorID?: number;
  @Column()
  doctorName!: string;
  @Column("text", { array: true })
  specialities!: string[];
  @Column()
  qualification!: string;
  @Column()
  experience!: string;
  @Column()
  contactInformation!: string;
}