import express, { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "../db/data-source";
import { Doctors } from "../models/doctors";
import axios from "axios";

export class DoctorsController {
// Controller method for fetching all doctors
static async getAllDoctors(req: Request, res: Response) {
  axios
  .get("https://hospitalmgmt.free.beeceptor.com/doctors")
  .then((response) => {
    const getAllDoctors = response.data;
    res.status(200).send(getAllDoctors);
  })
  .catch((error) => {
    res.status(400).json({
      status: "Error occurred!",
      error: error?.message ? error?.message : error,
    });
  });
}

// Controller method for fetching a single doctor by ID
static async getDoctorById(req: Request, res: Response) {
  const { doctorID } = req.params;
  axios
    .get(`https://hospitalmgmt.free.beeceptor.com/doctors/${doctorID}`)
    .then((response) => {
      const getByID = response.data;
      res.status(200).send(getByID);
    })
    .catch((error) => {
      res.status(400).json({
        status: "Error occurred!",
        error: error?.message ? error?.message : error,
      });
    });
}

// Controller method for creating a new doctor
static async createDoctor(req: Request, res: Response) {
  const { doctorID, doctorName, specialities, qualification, experience, contactInformation } = req.body;
  const newDoctor = {
    doctorID,
    doctorName,
    specialities,
    qualification,
    experience,
    contactInformation
  };

  axios
    .post("https://hospitalmgmt.free.beeceptor.com/doctors", newDoctor)
    .then((response) => {
      const createDoctor = response.data;
      res.status(200).send(createDoctor);
    })
    .catch((error) => {
      res.status(400).json({
        status: "Error occurred!",
        error: error?.message ? error?.message : error,
      });
    });
}

// Controller method for updating a doctor
static async updateDoctor(req: Request, res: Response) {
  const { doctorID } = req.params;
  const { doctorName, specialities, qualification, experience, contactInformation } = req.body;
  const updateDoctor = {
    doctorName,
    specialities,
    qualification,
    experience,
    contactInformation
  };
  axios
    .put(`https://hospitalmgmt.free.beeceptor.com/doctors/${doctorID}`, updateDoctor)
    .then((response) => {
      const updatedDoctor = response.data;
      res.status(200).send(updatedDoctor);
    })
    .catch((error) => {
      res.status(400).json({
        status: "Error occurred!",
        error: error?.message ? error?.message : error,
      });
    });
}

// Controller method for deleting a doctor
static async deleteDoctor(req: Request, res: Response) {
    const { doctorID } = req.params;
    axios
      .delete(`https://hospitalmgmt.free.beeceptor.com/doctors/${doctorID}`)
      .then((response) => {
        const deleteDoctor = response.data;
        res.status(200).send(deleteDoctor);
      })
      .catch((error) => {
        res.status(400).json({
          status: "Error occurred!",
          error: error?.message ? error?.message : error,
        });
      });
  }
}