import * as AWS from 'aws-sdk';
import { readFile, readFileSync } from 'fs';
import { promisify } from 'util';

console.log('SET CONFIG!');

AWS.config.loadFromPath('./config.json');
const s3 = new AWS.S3({ region: 'eu-central-1' });
promisify(s3.putObject);

const bucketName = 'myfirstbucket2111';

const createItemObject = (imageName, image, cb) => {
  const params = {
    Bucket: bucketName,
    Key: `${imageName}`,
    ACL: 'public-read',
    Body: image,
  };
  return s3.putObject(params, cb);
};

const readCurrentFile = path => {
  return new Promise(resolve => {
    readFile(path, data => {
      resolve(data);
    });
  });
};

export async function upload() {
  console.log('START UPLOADING THE FILE!');
  const file = await readCurrentFile(`./config.json`);
  const anotherFile = readFileSync('./config.json');
  createItemObject('test2.json', anotherFile, (err, data) => {
    console.log('DATA ->', data);
    console.log('ERROR ->', err);
  });
}
