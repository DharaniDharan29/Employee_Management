import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating value
        max: 5  // Maximum rating value
    },
    comments: {
        type: String,
        trim: true,
        required: false // Optional field for additional feedback
    }
});

export default mongoose.model('Feedback', FeedbackSchema);
