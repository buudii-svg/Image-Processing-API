import express from 'express';
import ImageResize from '../../utilities/imageSharp';
import * as fs from 'fs';
import path from 'path';

// make routes to be scalable
const images = express.Router();

// get images
images.get('/images', async (req: express.Request, res: express.Response): Promise<void> => {

    if (Number(req.query.w) <= 0 || Number(req.query.w) == null) {
        res.send("width must be over 0 and not be null")
    }
    else if (Number(req.query.h) <= 0 || Number(req.query.h) == null) {
        res.send("height must be over 0 and not be null")
    }
    else if (fs.existsSync(`assets/full/${req.query.src}.jpg`) == false) {
        res.send("Invalid image name");
    }

    // to chech fo cache
    if (fs.existsSync(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`)) {
        res.sendFile(path.resolve(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`));
    }
    else {
        await ImageResize({   //sharp function is invoked
            src: (req.query.src as string),
            w: Number(req.query.w),
            h: Number(req.query.h),
        });

        //send file to browser
        res.sendFile(path.resolve(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`));
        console.log('image is successfully got');
    }
});

// delete image
images.delete('/images/delete', async (req: express.Request, res: express.Response): Promise<void> => {
    //check if the image exists the delete the file
    if (fs.existsSync(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`)) {
        fs.unlink(path.resolve(`assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`), (err) => {
            if (err) throw err;
            console.log('image was deleted ');
        });
        res.send('image is deleted successfuly');
    }
});




export default images;