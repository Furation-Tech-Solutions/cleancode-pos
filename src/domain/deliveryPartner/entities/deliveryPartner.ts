// Express API request populate the DeliveryPartner Model
export class DeliveryPartnerModel {
  constructor(
    public DeliveryPartner_name: string = "",
    public email: string = "",
    public phone: number = 0,
    public address: string = "",
    public createdAt: Date,
    public del_status: boolean
  ) { }
}

// DeliveryPartner Entity provided by DeliveryPartner Repository is converted to Express API Response
export class DeliveryPartnerEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public DeliveryPartner_name: string,
    public email: string,
    public phone: number,
    public address: string,
    public createdAt: Date,
    public del_status: boolean
  ) { }
}



export class DeliveryPartnerMapper {
  static toEntity( // (function method)
  deliveryPartnerData: any,
    includeId?: boolean,
    existingDeliveryPartner?: DeliveryPartnerEntity
  ): DeliveryPartnerEntity {
    if (existingDeliveryPartner != null) {
      // If existingDeliveryPartner is provided, merge the data from deliveryPartnerData with the existingDeliveryPartner
      return {
        ...existingDeliveryPartner,
        DeliveryPartner_name:
          deliveryPartnerData.DeliveryPartner_name !== undefined ? deliveryPartnerData.DeliveryPartner_name : existingDeliveryPartner.DeliveryPartner_name,
        email:
          deliveryPartnerData.email !== undefined ? deliveryPartnerData.email : existingDeliveryPartner.email,
        phone:
          deliveryPartnerData.phone !== undefined ? deliveryPartnerData.phone : existingDeliveryPartner.phone,
        address:
          deliveryPartnerData.address !== undefined ? deliveryPartnerData.address : existingDeliveryPartner.address,
        createdAt:
          deliveryPartnerData.createdAt !== undefined ? deliveryPartnerData.createdAt : existingDeliveryPartner.createdAt,
        del_status:
          deliveryPartnerData.del_status !== undefined ? deliveryPartnerData.del_status : existingDeliveryPartner.del_status

      };
    } else {
      // If existingDeliveryPartner is not provided, create a new DeliveryPartnerEntity using deliveryPartnerData
      const deliveryPartnerEntity: DeliveryPartnerEntity = {
        id: includeId ? (deliveryPartnerData._id ? deliveryPartnerData._id.toString() : undefined) : deliveryPartnerData._id.toString(),
        DeliveryPartner_name: deliveryPartnerData.DeliveryPartner_name,
        email: deliveryPartnerData.email,
        phone: deliveryPartnerData.phone,
        address: deliveryPartnerData.address,
        createdAt: deliveryPartnerData.createdAt,
        del_status: deliveryPartnerData.del_status
      };
      return deliveryPartnerEntity;
    }
  }

  static toModel(deliveryPartner: DeliveryPartnerEntity): any {
    return {
      id: deliveryPartner.id,
      DeliveryPartner_name: deliveryPartner.DeliveryPartner_name,
      email: deliveryPartner.email,
      phone: deliveryPartner.phone,
      address: deliveryPartner.address,
      createdAt: deliveryPartner.createdAt,
      del_status: deliveryPartner.del_status
    };
  }
}
