
export class DeliverypartnerModel {
    constructor(
        public name: String="",
        public phone: String="",
        public address: String=""
    ){}
}

export class DeliverypartnerEntity {
    constructor(
        public id: String | undefined=undefined,
        public name: String="",
        public phone: String="",
        public address: String="",
        public createdAt: String="",
    ){}
}

export class DeliverypartnerMapper {
    static toEntity(
        deliverypartnerData: any,
        includeId?: boolean,
        existingDeliverypartner?: DeliverypartnerEntity
      ): DeliverypartnerEntity {
        if (existingDeliverypartner != null) {
          return {
            ...existingDeliverypartner,
            name:
            deliverypartnerData.name !== undefined
                ? deliverypartnerData.name
                : existingDeliverypartner.name,
            phone:
            deliverypartnerData.phone !== undefined
                ? deliverypartnerData.phone
                : existingDeliverypartner.phone,
            address:
            deliverypartnerData.active !== undefined
                ? deliverypartnerData.address
                : existingDeliverypartner.address,
            createdAt:
            deliverypartnerData.createdAt !== undefined
                ? deliverypartnerData.createdAt
                : existingDeliverypartner.createdAt,
          };
        } else {
          const companyEntity: DeliverypartnerEntity = {
            id: includeId
              ? deliverypartnerData._id
                ? deliverypartnerData._id.toString()
                : undefined
              : undefined,
            name: deliverypartnerData.name,
            phone: deliverypartnerData.phone,
            address: deliverypartnerData.address,
            createdAt: deliverypartnerData.createdAt,
          };
          return companyEntity;
        }
      }
    static toModel(deliverypartner: DeliverypartnerEntity): any {
        return {
          id: deliverypartner.id,
          name: deliverypartner.name,
          phone: deliverypartner.phone,
          address: deliverypartner.address,
          createdAt: deliverypartner.createdAt,
        };
      }
}