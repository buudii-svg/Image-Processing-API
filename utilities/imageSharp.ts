import sharp from 'sharp';

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
        await sharp(`C:/Users/OWNER/Image-Processing-API/assets/full/${params.src}.jpg`) //take parameter from query parameter url
            .resize(params.w, params.h)
            .toFile(`assets/thumb/${params.src}-${params.w}-${params.h}.jpg`) // send image to thumb folder
        return "success";
    } catch {
        return 'Image is not found.';
    }
};

export default ImageResize;