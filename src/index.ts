import express from 'express';
import images from '../routes/api/ImageProcessingAPI';

const app = express();
const port = 5000;

app.use('/api', images);
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

export default app;