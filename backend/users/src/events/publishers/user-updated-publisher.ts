import { Producer, Exchanges, ExchangeTypes, RoutingKeys } from "@seaclub/common";

export class UserUpdatedPublisher extends Producer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    routingKey: RoutingKeys.userUpdated = RoutingKeys.userUpdated;
};