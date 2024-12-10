import 'server-only';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { StreamingBlobPayloadInputTypes } from '@smithy/types';
import { getRequiredEnv } from '@/utils/env';

declare global {
  var s3: S3Client; // eslint-disable-line no-var
}

const REGION = getRequiredEnv('CLOUD_REGION');
const BUCKET_NAME = getRequiredEnv('CLOUD_BUCKET_NAME');
const ACCESS_KEY_ID = getRequiredEnv('CLOUD_KEY_ID');
const SECRET_ACCESS_KEY = getRequiredEnv('CLOUD_APPLICATION_KEY');
const FILE_PREFIX = getRequiredEnv('CLOUD_FILE_PREFIX');
const PUBLIC_URL = getRequiredEnv('CLOUD_PUBLIC_URL');

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
    // console.log('[cloud:putFile] keyName: ', keyName, 'body: ', body);
    return await s3.send(
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
