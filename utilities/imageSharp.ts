import sharp from 'sharp';

interface sharpResize {
    src: string;
    w: number;
    h: number;
}

const ImageResize = async (
    params: sharpResize
): Promise<string> => {
    try {
        await sharp(`C:/Users/OWNER/Image-Processing-API/assets/full/${params.src}.jpg`)
            .resize(params.w, params.h)
            .toFile(`assets/thumb/${params.src}-${params.w}-${params.h}.jpg`)
        return "success";
    } catch {
        return 'Image is not found.';
    }
};

export default ImageResize;