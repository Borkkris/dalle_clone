/* 
used to generate the data from the API 
*/

import express from 'express';

import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

/* this allowes us to pull our environment variables from our .env file 
and makes sure they are getting populated */
dotenv.config();

// new instance of a router
const router = express.Router();

// passing the openai_api_key into a new variable (configuration) with new Configuration
const configuration = new Configuration ({
    apiKey: process.env.OPENAI_API_KEY,
})
// create an instance of openai
const openai = new OpenAIApi(configuration);

// demoroute to test
// router.route('/').get((req, res) => { 
//     res.send('Hello from Dall-E!')
// })

// an async function because it will take some time
router.route('/').post(async(req,res) => {
    try {
        const { prompt } = req.body; // coming from the frontend side

        // generates the image
        const aiResponse = await openai.createImage({
            prompt,
            n: 1, // for one picture
            size: '1024x1024',
            response_format: 'b64_json'
        });
        // gets the image out of the aiResponse
        const image = aiResponse.data.data[0].b64_json;
        // sendingthe image back to the front end
        res.status(200).json({ photo: image })
    }   catch (error) {
            console.log(error);
            res.send(500).send(error?.response.data.error.message)
    }
})

// always export the router like this:
export default router