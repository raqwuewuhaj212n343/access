import { Producer, Exchanges, ExchangeTypes, RoutingKeys } from "@seaclub/common";

export class FileRemovePublisher extends Producer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    routingKey: RoutingKeys.fileRemoved = RoutingKeys.fileRemoved;
};