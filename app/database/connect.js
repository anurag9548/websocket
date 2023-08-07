import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect(process.env.APP_URI)
    .then(() => console.log('Database Connected'))
    .catch((e) => console.log('error: ' + e.message));
}

export default connect;

