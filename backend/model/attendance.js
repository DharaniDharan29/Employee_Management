import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now 
    },
    status: {
        type: String,
        required: true 
    }
}, { timestamps: true });

export default mongoose.model('Attendance', AttendanceSchema);
