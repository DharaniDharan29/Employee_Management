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
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Email format validation
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Phone number validation
    },
    onboardingDate: {
        type: Date,
        default: Date.now
    },
    offboardingDate: {
        type: Date,
        required: false // Optional for onboarding
    }
}, { timestamps: true });

export default mongoose.model('OnboardingOffboarding', OnboardingOffboardingSchema);
