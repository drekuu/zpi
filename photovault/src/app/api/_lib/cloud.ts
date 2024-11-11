import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';

declare global {
  var s3: S3Client; // eslint-disable-line no-var
}

const REGION = process.env.CLOUD_REGION;
const BUCKET_NAME = process.env.CLOUD_BUCKET_NAME;
const ACCESS_KEY_ID = process.env.CLOUD_KEY_ID;
const SECRET_ACCESS_KEY = process.env.CLOUD_APPLICATION_KEY;
const FILE_PREFIX = process.env.CLOUD_FILE_PREFIX;

if (
  !REGION ||
  !BUCKET_NAME ||
  !ACCESS_KEY_ID ||
  !SECRET_ACCESS_KEY ||
  !FILE_PREFIX
) {
  throw new Error(
    'Missing one of the following environment variables: CLOUD_REGION, CLOUD_BUCKET_NAME, CLOUD_KEY_ID, CLOUD_APPLICATION_KEY, CLOUD_FILE_PREFIX',
  );
}

if (!global.s3) {
  global.s3 = new S3Client({
    endpoint: `https://s3.${REGION}.backblazeb2.com`,
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });
}

export const putFile = async (
  keyName: string,
  body?: StreamingBlobPayloadInputTypes,
) => {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: FILE_PREFIX + keyName,
        Body: body,
      }),
    );
  } catch (err) {
    console.error('[cloud] putFile error: ', err);
  }
};

export const deleteFile = async (keyName: string) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: keyName,
      }),
    );
  } catch (err) {
    console.error('[cloud] deleteFile error: ', err);
  }
};
