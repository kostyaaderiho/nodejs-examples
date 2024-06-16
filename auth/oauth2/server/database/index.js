const mongoose = require('mongoose');
const uri = `mongodb+srv://aderihokostya:aderiho280993@cluster0.iv5dn3b.mongodb.net/nodejs_examples?retryWrites=true&w=majority`;

async function db() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to DB!');
    } catch (err) {
        console.error(err);
    } finally {
        // await mongoose.disconnect();
    }
}

module.exports = db;
