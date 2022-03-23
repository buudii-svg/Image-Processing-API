import supertest from 'supertest';
import app from '../src/index';
import ImageResize from '../utilities/imageSharp';

const request= supertest(app);

describe('suite of enpiont is localhost:', (): void => {
    it('gets image successfully', async (): Promise<void> => {
        const response = await request.get(
            '/api/images?src=palmtunnel&w=200&h=200'
        );
        expect(response.status).toBe(200);
    });
    it('gets api/images', async (): Promise<void> => {
        const response = await request.get(
            '?src=palmtunnel.jpg&w=-100&h=6000'
        );
        expect(response.status).toEqual(404);
    });
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
        const response = await request.get('/invalid');

        expect(response.status).toBe(404);
    });
    it('delete suucessfully', async (): Promise<void> => {
        const response = await request.delete(
            '/api/images/delete?src=palmtunnel&w=200&h=200'
        );
        expect(response.status).toBe(200);
    });
});
describe('error with sharp', (): void => {
    it('error', async (): Promise<void> => {
        const error: string = await ImageResize({
            src: 'pulmtunnel',
            w: -500,
            h: 500
        });
        expect(error).not.toBeNull();
    });

    it('filename does not exist', async (): Promise<void> => {
        const error: null | string = await ImageResize({
            src: 'invalid',
            w: 500,
            h: 500
        });
        expect(error).not.toBeNull();
    });
});
