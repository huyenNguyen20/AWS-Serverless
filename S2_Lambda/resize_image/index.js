const sharp = require('sharp');
const AWS = require('aws-sdk');


AWS.config.update({region: 'ap-southeast-1'});
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
    let filesProcessed = event.Records.map(async (record) => {
        let bucket = record.s3.bucket.name;
        let filename = record.s3.object.key;
        // Get file from S3
        var params = {
            Bucket: bucket,
            Key: filename
        }
        let inputData = await s3.getObject(params).promise();
        
        // Resize the file
        const resizedImage = await sharp(inputData.Body)
                .resize(150,150)
                .toFormat('jpg')
                .toBuffer();
        // Read the resized file
        
        // Upload the new file to S3
        const targetFilename = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';
        const newParams = {
            Bucket: bucket + '-dest',
            Key: targetFilename,
            Body: resizedImage,
            ContentType: 'image/jpeg'
        }
        return await s3.putObject(newParams).promise();
    });
    await Promise.all(filesProcessed);
    return "Done";
}