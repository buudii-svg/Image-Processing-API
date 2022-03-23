Scripts
Install: npm install
Build: npm run build
Lint: npm run eslint
Prettier: npm run prettier
Run unit tests: npm run test
Start server: npm run start
Usage
The server will listen on port 5000:

Brief instructions
http://localhost:5000/

Endpoint to resize images
http://localhost:5000/api/images?src=palmtunnel&w=500&h=500

Expected  arguments 

src: palmtunnel
w > 0
h > 0

Notes
 images are saved under ./assets/full