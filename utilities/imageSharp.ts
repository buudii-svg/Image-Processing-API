import sharp from 'sharp';
import path from 'path';

interface sharpResize {
    src: string; //source
    w: number; //width
    h: number; //height
}

//function from sharp documentation
const ImageResize = async (
    params: sharpResize
): Promise<string> => {
    try {
        await sharp(path.resolve(`assets/full/${params.src}.jpg`)) //take parameters from query parameter url
            .resize(params.w, params.h)
            .toFile(path.resolve(`assets/thumb/${params.src}-${params.w}-${params.h}.jpg`)) // send image to thumb folder
        return "success";
    } catch {
        return 'Image is not found.';
    }
};

export default ImageResize;