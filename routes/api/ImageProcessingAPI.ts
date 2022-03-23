import express from 'express';
import ImageResize from '../../utilities/imageSharp';
import * as fs from 'fs';

// make routes to be scalable
const images = express.Router();

// get images
images.get('/images', async (req, res) => {

    // to chech fo cache
    if (fs.existsSync(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`)) {
        res.sendFile(`C:/Users/OWNER/Image-Processing-API/assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`);
        console.log("cached image");
    }
    else {
        await ImageResize({   //sharp function is invoked
            src: (req.query.src as string),
            w: Number(req.query.w),
            h: Number(req.query.h),
        });

        //send file to browser
        res.sendFile(`C:/Users/OWNER/Image-Processing-API/assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`);
        console.log('image is successfully got');

    }
});

// delete image
images.delete('/images/delete', async (req, res) => {
    //check if the image exists the delete the file
    if (fs.existsSync(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`)) {
        fs.unlink(`C:/Users/OWNER/Image-Processing-API/assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`, (err) => {
            if (err) throw err;
            console.log('image was deleted');
        });
        res.send('image is deleted successfuly');

    }
});




export default images;