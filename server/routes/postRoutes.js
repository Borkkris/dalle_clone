import express from 'express';
import * as dotenv from 'dotenv';

/*
Cloudinary is an end-to-end image- and video-management solution 
for websites and mobile apps, covering everything from image and 
video uploads, storage, manipulations, optimizations to delivery. 
*/
import { v2 as cloudinary  } from 'cloudinary';

import Post from '../mongodb/models/post.js';

/* this allowes us to pull our environment variables from our .env file 
and makes sure they are getting populated 
*/
dotenv.config();

// new instance of a router
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET ALL POSTS
router.route('/').get(async (req, res) => {
  try {
    // pass an empty obhject as the first and only oarameter
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

// CREATE A POST
router.route('/').post(async (req, res) => {
  try {
    // destructs the data and sending it from the frontend
    const { name, prompt, photo } = req.body;
    // upload photo url to cloudinary from the frontend
    const photoUrl = await cloudinary.uploader.upload(photo);
    // create a new post in our database
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;