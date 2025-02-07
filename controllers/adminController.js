const doctorModel = require('../models/doctorModel');
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({
      success: true,
      message: "Users Data List",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching users",
      error: error.message,
    });
  }
};

// GET ALL DOCTORS
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).json({
      success: true,
      message: "Doctors Data List",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Error while getting doctors data",
      error: error.message,
    });
  }
};

// CHANGE DOCTOR ACCOUNT STATUS
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    
    if (!doctorId || !status) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and status are required",
      });
    }
    
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }
    
    const user = await userModel.findById(doctor.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User associated with this doctor not found",
      });
    }
    
    user.notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request has been ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved";
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Account status updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error updating account status:", error);
    res.status(500).json({
      success: false,
      message: "Error in account status update",
      error: error.message,
    });
  }
};

module.exports = { getAllDoctorsController, getAllUsersController, changeAccountStatusController };