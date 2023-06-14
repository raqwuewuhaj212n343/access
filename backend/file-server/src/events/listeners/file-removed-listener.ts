import { Consumer, RoutingKeys, Exchanges, ExchangeTypes, Queues } from "@seaclub/common";
import * as amqp from 'amqplib';
import { deleteFiles } from '../../utils/s3Bucket';

export class FileRemovedListener extends Consumer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    queue: Queues.contractQueue = Queues.contractQueue;
    routingKey: RoutingKeys.fileRemoved = RoutingKeys.fileRemoved;

    async onMessage(msg: amqp.Message, data: string[], channel: amqp.Channel) {
        const { deleted, error } = await deleteFiles(data);
        if (!error) channel.ack(msg);
    }
};
