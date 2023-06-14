import * as amqp from 'amqplib';
import { Consumer, RoutingKeys, Exchanges, ExchangeTypes, Queues } from "@seaclub/common";

export class OrderCreatedListener extends Consumer {
    routingKey: RoutingKeys.orderCreated = RoutingKeys.orderCreated;
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    queue: Queues.userQueue = Queues.userQueue;

    async onMessage(msg: amqp.Message, data: any, channel: amqp.Channel) {
        // Here write your code
        console.log(`user service ${data}`);
        channel.ack(msg)
    }
};
