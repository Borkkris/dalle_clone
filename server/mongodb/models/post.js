import mongoose from 'mongoose';

// we can use it when generating new posts

const Post = new mongoose.Schema({
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: String, required: true }

})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema