import mongoose from "mongoose";

const OnboardingOffboardingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
});

export default mongoose.model('OnboardingOffboarding', OnboardingOffboardingSchema);
