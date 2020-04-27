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
- **Api rest**: Receive sms message send request and pubslish into the redis queue.
- **Workers**: Differents instances of a same nodejs docker image running in parralel, in this part we are working with mocked rest services rest services.

### Pub - sub design:
All the server and workers run into a docker container, in the workers we user docker-compouse in scale mode.

<img src="https://github.com/damiancipolat/Redis_PUBSUB_node/blob/master/doc/pub-sub-redis.png?raw=true" align="center" />

In this diagram, we are focusing the events architecture to create a async flow using events, I'm using the pub/sub **channels** as event queue.

### Channels:
- **SMS**: Used to publish a sms to be sent.
- **SMS_OK**: Is published when the sms was sent succefull.
- **SMS_FAIL**: Is published when the provider fail sending the sms, we can use this to make retries.

### Events diagram:
<img src="https://github.com/damiancipolat/Redis_PUBSUB_node/blob/master/doc/pub-sub-redis-events.png?raw=true" align="center" />

## Environment:
To run the projec follow the next commands.

```sh
#To run, using a scaling group as a daemon.
docker-compose up --scale workers=3 -d
```
- Api server: **port 8000**.
- Redir: **port 6379**.
- Workers: **port range 8000-9000**.

## TODO:
add api code base
