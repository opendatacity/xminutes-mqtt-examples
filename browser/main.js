import AWS from 'aws-sdk/global';
import AWSMqtt from 'aws-mqtt';

AWS.config.region = 'eu-central-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-central-1:6c26b5b0-b904-498e-ac6c-c34d3ba9fd6f'
});

let topic = '#';

const client = AWSMqtt.connect({
    WebSocket: window.WebSocket,
    region: AWS.config.region,
    credentials: AWS.config.credentials,
    endpoint: 'a1sqsm2m5a5t5j.iot.eu-central-1.amazonaws.com',
    clientId: 'mqtt-client-123',
    update: true
});

client.on('connect', () => {
    console.log('subscribing ' + topic);
    client.subscribe(topic);
});

client.on('message', (topic, message) => {
    console.log(topic, String.fromCharCode.apply(null, message));
});

client.on('close', () => {
  console.log('close');
});

client.on('offline', () => {
  console.log('offline');
});