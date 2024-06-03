import { ObjectId } from "mongodb";
import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";
import { IsBoolean, Length, MaxLength, MinLength, Validate, ValidationArguments } from "class-validator";

@Entity("patients")
export class Patients extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  patientID?: number;
  @Column()
  @Length(5, 25)
  patientName!: string;
  @Column()
  patientAge!: string;
  @Column()
  patientGender!: string;
  @Column("text", { array: true })
  @MinLength(5, {
    // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    each: true,
    message: 'Title is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    each: true,
    message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  patientMedicalRecord!: string[];
  @Column()
  @IsBoolean()
  insured!: boolean;
  @Column()
  contactInformation!: string;
}