const aws = require('aws-sdk');

aws.config.update({
    region: "us-east-1"
})

const sns = new aws.SNS();

exports.PublishTopic = async (message) =>{
    let params = {
        Message : message,
        TopicArn: "arn:aws:sns:us-east-1:403181620438:MyTopic"
 
    };
    let resp;
    try{
        resp  =sns.publish(params).promise();
         // Handle promise's fulfilled/rejected states
         resp.then(
            function(data) {
            }).catch(
            function(err) {
            });
        }
    catch {
    }
    return resp;

}

