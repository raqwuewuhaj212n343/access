import { Producer, Exchanges, ExchangeTypes, RoutingKeys } from "@seaclub/common";

export class UserCreatedPublisher extends Producer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    routingKey: RoutingKeys.userCreated = RoutingKeys.userCreated;
};