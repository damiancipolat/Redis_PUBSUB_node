<img src="https://github.com/damiancipolat/Redis_PUBSUB_node/blob/master/doc/logo.png?raw=true" width="150px" align="right" />

# SMS distributed services using redis PUB/SUB
An example of event sourcing using redis pub/sub features with docker and nodejs + Typescript. In this situation we will create a SMS send distributed service.

## Stack:
Our stack will be:
- Node.js v12.0
- Express
- Docker + docker-compose
- TypeScript
- redis native client.
- redis tools.
- Mocks: mocky.io to simulate sms provider integration in a real example we can use aws/sns to send real sms or twilio.

## Architecture:
There are two differents blocks.
- **Api rest**:
Receive sms message send request and pubslish into the redis queue.

- **Workers**:
Differents instances of a same nodejs docker image running in parralel.
