const mockgoose = require('mockgoose');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'testing') {
  mockgoose(mongoose).then((): void => {
    mongoose.connect('mongodb://example.com/TestingDB', {
      useMongoClient: true,
    });
  });
} else {
  mongoose.connect('mongodb://mongo:27017/animals', {
    useMongoClient: true,
  });
  console.log('CONNECTED!');
}

export { mongoose };
