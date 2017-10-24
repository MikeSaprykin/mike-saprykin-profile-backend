const mockgoose = require('mockgoose');
import * as mongoose from 'mongoose';

if (process.env.NODE_ENV === 'testing') {
  mockgoose(mongoose).then((): void => {
    mongoose.connect('mongodb://example.com/TestingDB', {
      useMongoClient: true,
    });
  });
} else {
  mongoose.connect('mongodb://mongo:27017', {
    useMongoClient: true,
  });
  console.log('CONNECTED!');
}

export { mongoose };
