export class InventoryBillingModel {
  constructor(
    public outlet: string = "",
    public requisitionData: string = "",
    public billingDate: Date = new Date(),
    public paymentMode: string = "",
    public amountPaid: number = 0,
    public amountDue: number = 0,
    public billingStatus: string = "Unpaid",
    public paymentDate: Date = new Date(),
    public description: string = ""
  ) {}
}

export class InventoryBillingEntity {
  constructor(
    public id: string | undefined = undefined,
    public outlet: string,
    public requisitionData: string,
    public billingDate: Date,
    public paymentMode: string,
    public amountPaid: number,
    public amountDue: number,
    public billingStatus: string,
    public paymentDate: Date,
    public description: string
  ) {}
}

export class InventoryBillingMapper {
  static toEntity(
    billingData: any,
    includeId?: boolean,
    existingBilling?: InventoryBillingEntity
  ): InventoryBillingEntity {
    if (existingBilling != null) {
      // If existingBilling is provided, merge the data from billingData with the existingBilling
      return {
        ...existingBilling,
        outlet:
          billingData.outlet !== undefined
            ? billingData.outlet
            : existingBilling.outlet,
        requisitionData:
          billingData.requisitionData !== undefined
            ? billingData.requisitionData
            : existingBilling.requisitionData,
        billingDate:
          billingData.billingDate !== undefined
            ? billingData.billingDate
            : existingBilling.billingDate,
        paymentMode:
          billingData.paymentMode !== undefined
            ? billingData.paymentMode
            : existingBilling.paymentMode,
        amountPaid:
          billingData.amountPaid !== undefined
            ? billingData.amountPaid
            : existingBilling.amountPaid,
        amountDue:
          billingData.amountDue !== undefined
            ? billingData.amountDue
            : existingBilling.amountDue,
        billingStatus:
          billingData.billingStatus !== undefined
            ? billingData.billingStatus
            : existingBilling.billingStatus,
        paymentDate:
          billingData.paymentDate !== undefined
            ? billingData.paymentDate
            : existingBilling.paymentDate,
        description:
          billingData.description !== undefined
            ? billingData.description
            : existingBilling.description,
      };
    } else {
      // If existingBilling is not provided, create a new InventoryBillingEntity using billingData
      const billingEntity: InventoryBillingEntity = {
        id: includeId
          ? billingData._id
            ? billingData._id.toString()
            : undefined
          : undefined,
        outlet: billingData.outlet,
        requisitionData: billingData.requisitionData,
        billingDate: billingData.billingDate,
        paymentMode: billingData.paymentMode,
        amountPaid: billingData.amountPaid,
        amountDue: billingData.amountDue,
        billingStatus: billingData.billingStatus,
        paymentDate: billingData.paymentDate,
        description: billingData.description,
      };
      return billingEntity;
    }
  }

  static toModel(billing: InventoryBillingEntity): any {
    return {
      id: billing.id,
      outlet: billing.outlet,
      requisitionData: billing.requisitionData,
      billingDate: billing.billingDate,
      paymentMode: billing.paymentMode,
      amountPaid: billing.amountPaid,
      amountDue: billing.amountDue,
      billingStatus: billing.billingStatus,
      paymentDate: billing.paymentDate,
      description: billing.description,
    };
  }
}
