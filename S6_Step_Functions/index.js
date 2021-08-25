const sharp = require('sharp');
const AWS = require('aws-sdk');


AWS.config.update({region: 'ap-southeast-1'});
const s3 = new AWS.S3();

exports.handler = async (event) => {
        var params = {
            Bucket: event.results.bucketName,
            Key: event.results.key
        }
        let inputData = await s3.getObject(params).promise();
        
        // Resize the file
        const resizedImage = await sharp(inputData.Body)
                .resize(150,150)
                .toFormat('jpg')
                .toBuffer();
        // Read the resized file
        
        // Upload the new file to S3
        const targetFilename = event.results.key.substring(0, event.results.key.lastIndexOf('.')) + '-small.jpg';
        const newParams = {
            Bucket: process.env.BUCKET_DESTINATION,
            Key: targetFilename,
            Body: resizedImage,
            ContentType: 'image/jpeg'
        }
        await s3.putObject(newParams).promise();
        return {
            region: 'ap-southeast-1',
            bucket: process.env.BUCKET_DESTINATION,
            key: targetFilename
        }
}