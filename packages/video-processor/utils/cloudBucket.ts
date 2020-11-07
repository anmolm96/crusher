import * as fs from 'fs';
import * as AWS from "aws-sdk";
import {AWS_ACCESS_KEY_ID, AWS_BUCKET_REGION, AWS_SECRET_ACCESS_KEY, AWS_S3_VIDEO_BUCKET} from "../config/aws_bucket";

const VIDEO_BUCKET_NAME = AWS_S3_VIDEO_BUCKET;

// Load the SDK for JavaScript
// Set the Region
AWS.config.update({
    region: AWS_BUCKET_REGION
});

// Create S3 service object
export const s3BucketService = new AWS.S3({apiVersion: '2006-03-01'});

export async function uploadFileToAwsBucket(s3Bucket, filePath: string, fileName: string, destination: string = "/") {
    return new Promise((resolve, reject)=>{
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', function(err) {
            reject({message: "File Error", err: err});
        });
        console.log(destination, fileName);
        s3Bucket.upload({Bucket: VIDEO_BUCKET_NAME, Key: destination + "/" + fileName, Body: fileStream}, function(err, data){
            if(err) reject({message: "File upload failed", err: err});

            const url = s3BucketService.getSignedUrl('getObject', {
                Bucket: VIDEO_BUCKET_NAME,
                Key: data.key,
                Expires: 60*60*24*30
            })

            console.log(`${filePath} uploaded to ${AWS_S3_VIDEO_BUCKET} aws bucket.`);
            resolve(url);
        });
    });

}