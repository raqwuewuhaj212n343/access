import { Consumer, RoutingKeys, Exchanges, ExchangeTypes, Queues } from "@seaclub/common";
import * as amqp from 'amqplib';
import User from "../../models/user";

export class UserUpdatedListener extends Consumer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    queue: Queues.contractQueue = Queues.contractQueue;
    routingKey: RoutingKeys.userUpdated = RoutingKeys.userUpdated;

    async onMessage(msg: amqp.Message, data: any, channel: amqp.Channel) {
        const userId = data._id;

        try {
            await User.findByIdAndUpdate(userId, { $set: data } , { new: true });
            channel.ack(msg);
        } catch (error) {
            console.log(error)
        }
    }
};
