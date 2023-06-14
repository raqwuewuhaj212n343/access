import { DeleteObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3Client";

async function deleteFile(key: string) {
  try {
    const data = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.SPACES_BUCKET_NAME,
        Key: key,
      })
    );
    return { data, error: undefined };
  } catch (error) {
    return { error, data: undefined };
  }
}

export async function deleteFiles(keys: string[]) {
  type res = { deleted: unknown[], error: unknown[] };

  const response: res = { deleted: [], error: [] };
  for (const key of keys) {
    const { data, error } = await deleteFile(key);

    if (data) response.deleted.push(data?.$metadata?.requestId);
    if (error) response.error.push(error)
  }
  return response;
};

// MaxKeys of 1 000 can be returned
export const getFiles = async (prefix: string, marker?: string, max?: number) => {
  const params: any = { Bucket: process.env.SPACES_BUCKET_NAME };
  if (prefix) params.Prefix = prefix;
  if (marker) params.Marker = marker;
  if (max) params.MaxKeys = max;
  try {
    const response = await s3Client.send(new ListObjectsCommand(params));
    // IsTruncated - boolean weather list has been shortened
    // response.NextMarker - next available key if truncated
    const keys = response.Contents?.map(data => data.Key);
    return { error: undefined, data: keys, isTruncated: response.IsTruncated };
  } catch (error) {
    return { error, data: undefined };
  }
}