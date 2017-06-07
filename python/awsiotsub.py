import paho.mqtt.client as paho
import os
import ssl
import json

awshost = "a1sqsm2m5a5t5j.iot.eu-central-1.amazonaws.com"
awsport = 8883
clientId = "xminutes-news-%s" % os.urandom(6)
thingName = "xminutes-news"
caPath = "keys/aws-iot-rootCA.crt"
certPath = "keys/sub_cert.pem"
keyPath = "keys/sub_privkey.pem"

topic = "#"



def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc))
    ret = client.subscribe(topic, 1)
    return ret


def on_message(client, userdata, msg):
    print("topic: " + msg.topic)
    try:
        news = json.loads(msg.payload.decode('utf-8'))
        print(json.dumps(news, indent=2))

    except Exception as e:
        print('%s' % e)


if __name__ == "__main__":
    mqttc = paho.Client()
    mqttc.on_connect = on_connect
    mqttc.on_message = on_message

    mqttc.tls_set(caPath,
                  certfile=certPath,
                  keyfile=keyPath,
                  cert_reqs=ssl.CERT_REQUIRED,
                  tls_version=ssl.PROTOCOL_TLSv1_2,
                  ciphers=None)

    mqttc.connect(awshost, awsport, keepalive=60)
    print('starting!')
    mqttc.loop_forever()
