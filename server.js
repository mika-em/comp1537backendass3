const app = require('./app');

// getting started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));



async function main() {
    await mongoose.connect('mongodb+srv://mika-em:WabiSabi110@cluster0.g0isrve.mongodb.net/?retryWrites=true&w=majority');

}

// use 'await mongoose.connect('mongodb://user:passwor@localhost:27017/test');' if you have a password

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});