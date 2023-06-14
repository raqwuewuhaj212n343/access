import { Consumer, RoutingKeys, Exchanges, ExchangeTypes, Queues } from "@seaclub/common";
import * as amqp from 'amqplib';
import { deleteByKeys } from "../../services";

export class FileConfirmationListener extends Consumer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    queue: Queues.contractQueue = Queues.contractQueue;
    routingKey: RoutingKeys.fileConfirmed = RoutingKeys.fileConfirmed;

    // should remove file to prevent scheduler from deleting s3-file
    async onMessage(msg: amqp.Message, data: string[], channel: amqp.Channel) {
        const { error } = await deleteByKeys(data);
        if (!error) channel.ack(msg);
    }
};
