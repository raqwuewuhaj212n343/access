import { Consumer, RoutingKeys, Exchanges, ExchangeTypes, Queues } from "@seaclub/common";
import * as amqp from 'amqplib';
import User from "../../models/user";

export class UserCreatedListener extends Consumer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    queue: Queues.contractQueue = Queues.contractQueue;
    routingKey: RoutingKeys.userCreated = RoutingKeys.userCreated;

    async onMessage(msg: amqp.Message, data: any, channel: amqp.Channel) {
        try {
            await User.create(data);
            channel.ack(msg);
        }
        catch(error) {
            console.log(error)
        }
    }
};
