// Express API request populate the payment Model
export class PaymentModel {
  constructor(
    public name: string = "",
    public description: string = "",
    public staff_id: string[] = [],
    public company_id: string[] = [],
    public order_by: string = "",
    public email: string = "",
    public del_status: boolean
  ) { }
}

// payment Entity provided by payment Repository is converted to Express API Response
export class PaymentEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public description: string,
    public staff_id: string[],
    public company_id: string[],
    public order_by: string,
    public email: string,
    public del_status: boolean
  ) { }
}


export class PaymentMapper {
  static toEntity(
    paymentData: any,
    includeId?: boolean,
    existingPayment?: PaymentEntity
  ): PaymentEntity {
    if (existingPayment != null) {
      // If existingPayment is provided, merge the data from paymentData with the existingPayment
      return {
        ...existingPayment,
        name:
          paymentData.name !== undefined ? paymentData.name : existingPayment.name,
        description:
          paymentData.description !== undefined ? paymentData.description : existingPayment.description,
        staff_id:
          paymentData.staff_id !== undefined ? paymentData.staff_id : existingPayment.staff_id,
        company_id:
          paymentData.company_id !== undefined ? paymentData.company_id : existingPayment.company_id,
        order_by:
          paymentData.order_by !== undefined ? paymentData.order_by : existingPayment.order_by,
        email:
          paymentData.email !== undefined ? paymentData.email : existingPayment.email,
        del_status:
          paymentData.del_status !== undefined ? paymentData.del_status : existingPayment.del_status
      };
    } else {
      // If existingPayment is not provided, create a new PaymentEntity using paymentData
      const PaymentEntity: PaymentEntity = {
        id: includeId ? (paymentData._id ? paymentData._id.toString() : undefined) : paymentData._id.toString(),
        name: paymentData.name,
        description: paymentData.description,
        staff_id: paymentData.staff_id,
        company_id: paymentData.company_id,
        order_by: paymentData.order_by,
        email: paymentData.email,
        del_status: paymentData.del_status
      };
      return PaymentEntity;
    }
  }

  static toModel(payment: PaymentEntity): any {
    return {
      id: payment.id,
      name: payment.name,
      description: payment.description,
      staff_id: payment.staff_id,
      company_id: payment.company_id,
      order_by: payment.order_by,
      email: payment.email,
      del_status: payment.del_status
    };
  }
}
