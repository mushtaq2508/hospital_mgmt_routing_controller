import express, { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../db/data-source";
import { Patients } from "../models/patients";
import { Body, JsonController, Get, Put, Delete, HeaderParam, Param, Post, Req, Res, UseBefore } from "routing-controllers";
import { validate } from "class-validator";

@JsonController('/patients')
export class PatientsController {
// Controller method for fetching all patients
@Get('/')
 async getAllPatients(@Req() req: Request, @Res() res: Response) {
    try{
      const getAllPatients = await AppDataSource.manager.find(Patients);
      return res.status(200).json({
        message: "Details of all patients",
        data: getAllPatients
      });
    }
    catch(err: any) {
      return res.status(400).json({
        message: "Error occurred!",
        error: err.message
      });
    }
};

// Controller method for fetching a single patient by ID
@Get("/:patientID")
 async getPatientById(@Param("patientID") patientID: number, @Req() req: Request, @Res() res: Response) {
  try {
    const getByID = await AppDataSource.manager.findOneBy(Patients, {
      patientID: patientID as any
    });
    if (!getByID) {
      res.status(404).json({
        message: "Patient not found"
      });
      return;
    }
    res.status(200).json({
      message: "patient fetched!",
      data: getByID,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};

// Controller method for creating a new patient
@Post('/')
 async createPatient(@Body() patient: Patients, @Res() res: Response) {
  const { patientID, patientName, patientAge, patientGender, patientMedicalRecord, insured, contactInformation } = patient;
  try {
    const newPatient = await AppDataSource.manager.create(Patients, {
    patientID,
    patientName,
    patientAge,
    patientGender,
    patientMedicalRecord,
    insured,
    contactInformation
    });
    const errors = await validate(patient, {
      validationError: { target: false },
    });

    if (errors.length > 0) {
      errors.map((error) => {
        return {
          constraints: error.constraints,
        };
      });
    }
    await AppDataSource.manager.save(newPatient);
     return res.status(200).json(newPatient);
  } catch(err: any) {
    return res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};

// Controller method for updating a patient
@Put("/:patientID")
 async updatePatient(@Param("patientID") patientID: number, @Req() req: Request, @Res() res: Response){
  try {
    await AppDataSource.manager.update( Patients,
      { patientID: patientID },
      req.body
    );
    const getByID = await AppDataSource.manager.findOneBy(Patients, {
      patientID: patientID as any,
    });
    if (!getByID) {
      res.status(404).json({
        message: "Patient not found"
      });
    }
    res.status(200).json({
      message: "patient updated!",
      data: getByID,
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};

// Controller method for deleting a patient
@Delete("/:patientID")
static async deletePatient(@Param("patientID") patientID: number, @Req() req: Request, @Res() res: Response){
  try {
    const deletePatient = await AppDataSource.manager.delete(Patients, {
      patientID: patientID,
    });
    if (!deletePatient) {
      res.status(404).json({
        message: "Patient not found"
      });
    }
    res.status(200).json({
      message: "patient deleted!"
    });
  } catch (err: any) {
    res.status(400).json({
      message: "Error occurred!",
      error: err.message,
    });
  }
};
}