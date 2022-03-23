import express from 'express';
import ImageResize from '../../utilities/imageSharp';
import * as fs from 'fs';

const images = express.Router();

images.get('/images', async (req, res) => {

    if (fs.existsSync(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`)) {
        res.sendFile(`C:/Users/OWNER/Image-Processing-API/assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`);
        console.log("cached image");
    }
    else {
        await ImageResize({
            src: (req.query.src as string),
            w: Number(req.query.w),
            h: Number(req.query.h),
        });
        res.sendFile(`C:/Users/OWNER/Image-Processing-API/assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`);
        console.log('image is successfully got');
    }
});

images.delete('/images/delete', async (req, res) => {
    if (fs.existsSync(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`)) {
        fs.unlink(`C:/Users/OWNER/Image-Processing-API/assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`, (err) => {
            if (err) throw err;
            console.log('image was deleted');
        });
        res.send('image is deleted successfuly');

    }
});




export default images;