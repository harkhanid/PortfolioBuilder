const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    region:"us-east-1"
})

const bucketName="dharmikportfoliobucket";

const s3 = new aws.S3();

exports.delete = async (name)=>{
  await s3.deleteObject({
    Key:name,
    Bucket: bucketName
  }).promise();
  return{};
}

exports.get = async(name)=>{
  image = await s3.getSignedUrl('getObject',{
    Key:name,
    Bucket: bucketName
  });
  return {url:image};
}


exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, {'file_name':file.originalname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname)
    }
  })
})

//module.exports=upload;
