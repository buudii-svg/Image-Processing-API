import express from 'express';
import images from '../routes/api/ImageProcessingAPI';

const app = express();
const port = 5000;

// routing to be scalable
app.use('/api', images);

// Listen at port 5000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
