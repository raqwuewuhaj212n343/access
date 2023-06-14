import { Producer, Exchanges, ExchangeTypes, RoutingKeys } from "@seaclub/common";

export class FileConfirmationPublisher extends Producer {
    exchange: Exchanges.mainExchange = Exchanges.mainExchange;
    exchangeType: ExchangeTypes.direct = ExchangeTypes.direct;
    routingKey: RoutingKeys.fileConfirmed = RoutingKeys.fileConfirmed;
};