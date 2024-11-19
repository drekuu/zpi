import 'server-only';
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
const PUBLIC_URL = process.env.CLOUD_PUBLIC_URL;

if (
  !REGION ||
  !BUCKET_NAME ||
  !ACCESS_KEY_ID ||
  !SECRET_ACCESS_KEY ||
  !FILE_PREFIX ||
  !PUBLIC_URL
) {
  throw new Error(
    'Missing any of the following environment variables: CLOUD_REGION, CLOUD_BUCKET_NAME, CLOUD_KEY_ID, CLOUD_APPLICATION_KEY, CLOUD_FILE_PREFIX, CLOUD_PUBLIC_URL',
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

export function getFilePublicUrl(keyName: string) {
  return `${PUBLIC_URL}${FILE_PREFIX}${keyName}`;
}

export async function putFile(
  keyName: string,
  body?: StreamingBlobPayloadInputTypes,
) {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: FILE_PREFIX + keyName,
        Body: body,
      }),
    );
  } catch (err) {
    console.error('[cloud:putFile] error: ', err);
  }
}

export async function deleteFile(keyName: string) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: keyName,
      }),
    );
  } catch (err) {
    console.error('[cloud:deleteFile] error: ', err);
  }
}
