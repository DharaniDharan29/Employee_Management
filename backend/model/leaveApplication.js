import mongoose from "mongoose";

const LeaveApplicationSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  leaveType: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return this.startDate <= value;
      },
      message: "End date must be after start date"
    }
  },
  reason: {
    type: String,
    trim: true,
    required: false
  },
  comments: {
    type: String,
    trim: true,
    required: false
  }
}, { timestamps: true });

export default mongoose.model('LeaveApplication', LeaveApplicationSchema);
