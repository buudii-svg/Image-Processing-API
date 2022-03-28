import express from 'express';
import ImageResize from '../../utilities/imageSharp';
import * as fs from 'fs';
import path from 'path';

// make routes to be scalable
const images = express.Router();

// get images
images.get(
    '/images',
    async (req: express.Request, res: express.Response): Promise<void> => {
        if (!fs.existsSync(`assets/thumb`)) {
            fs.mkdirSync('assets/thumb');
        }
        // handeling errors
        try {
             if (Number(req.query.w) <= 0 || Number(req.query.w) == null) {
                res.send('width must be over 0 and not be null');
            } else if (Number(req.query.h) <= 0 || Number(req.query.h) == null) {
                res.send('height must be over 0 and not be null');
            } 
            else if (
                isNaN(Number(req.query.w)) == true ||
                isNaN(Number(req.query.h)) == true
            ) {
                res.send('width or height must be positive numbers');
            } else if (fs.existsSync(`assets/full/${req.query.src}.jpg`) == false) {
                res.send('Invalid image name');
            }
        } catch (error) {
            res.status(400).send(`${error}`);
        }
        // to check for cache
        if (
            fs.existsSync(
                `assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`
            )
        ) {
            res.sendFile(
                path.resolve(
                    `assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`
                )
            );
        } else {
            await ImageResize({
                //sharp function is invoked
                src: req.query.src as string,
                w: Number(req.query.w),
                h: Number(req.query.h),
            });

            //send file to browser
            res.sendFile(
                path.resolve(
                    `assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`
                )
            );
            console.log('image is successfully got');
        }
    }
);

// delete image
images.delete(
    '/images/delete',
    async (req: express.Request, res: express.Response): Promise<void> => {
        //check if the image exists the delete the file
        if (
            fs.existsSync(
                `assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`
            )
        ) {
            fs.unlink(
                path.resolve(
                    `assets/thumb/${req.query.src}-${req.query.w}-${req.query.h}.jpg`
                ),
                (err) => {
                    if (err) throw err;
                    console.log('image was deleted ');
                }
            );
            res.send('image is deleted successfuly');
        }
    }
);

export default images;
