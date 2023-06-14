import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    forcePathStyle: true, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.SPACES_ENDPOINT || '',
    region: "nyc3",
    credentials: {
        accessKeyId: process.env.SPACES_KEY || '',
        secretAccessKey: process.env.SPACES_SECRET || ''
    }
});