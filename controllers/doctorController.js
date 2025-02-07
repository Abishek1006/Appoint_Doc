const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Doctor Data Fetch Success",
      data: doctor,
    });
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching doctor details",
      error: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating doctor profile",
      error: error.message,
    });
  }
};

const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.body.doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Single Doctor Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.error("Error fetching single doctor info:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching single doctor info",
      error: error.message,
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    const appointments = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).json({
      success: true,
      message: "Doctor Appointments Fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching doctor appointments",
      error: error.message,
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    if (!appointmentsId || !status) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID and status are required",
      });
    }
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    const user = await userModel.findById(appointment.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User associated with this appointment not found",
      });
    }
    user.notification.push({
      type: "status-updated",
      message: `Your Appointment Has Been Updated to ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({
      success: false,
      message: "Error in updating appointment status",
      error: error.message,
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
