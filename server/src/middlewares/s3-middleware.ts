import { S3 } from '@aws-sdk/client-s3';
import * as fs from 'fs';

class S3Service {
  private static instance: S3Service;
  private s3: S3;
  private bucketName: string;

  private constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
    this.bucketName = process.env.AWS_BUCKET_NAME!;
  }

  public static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service();
    }
    return S3Service.instance;
  }

  public async uploadFile(bucketName: string, key: string, body: Buffer): Promise<string> {
    try {
      await this.s3.putObject({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ACL: 'public-read',
        ContentType: 'image/png'
      });
      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw error;
    }
  }
}

export const uploadFile = async (bucketName: string, key: string, body: Buffer): Promise<string> => {
  const s3Service = S3Service.getInstance();
  return s3Service.uploadFile(bucketName, key, body);
};
