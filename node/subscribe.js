const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
   keyPath: "../keys/sub_privkey.pem",
  certPath: "../keys/sub_cert.pem",
    caPath: "../keys/aws-iot-rootCA.crt",
  clientId: "xminutes-news",
    region: "eu-central-1"
});

device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('#');
    });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });