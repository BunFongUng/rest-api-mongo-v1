import mongoose, {Schema} from 'mongoose';

const CourseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedTime: String,
    materialsNeeded: String
});

export default mongoose.model('Courses', CourseSchema);