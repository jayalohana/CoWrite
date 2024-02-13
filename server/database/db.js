import mongoose from 'mongoose';

const Connection = (username = 'jayalohana2', password = 'O8kNMHKOriuYTFGV') => {
    const url = `mongodb+srv://${username}:${password}@cluster0.fs1dfvv.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(url).then(() => {
        console.log('Connected to database successfully');
    }).catch(error => {
        console.log('Error while connecting with the database', error);
    });
    
}

export default Connection;
