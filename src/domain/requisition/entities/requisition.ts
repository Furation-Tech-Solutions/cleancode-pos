export class RequisitionModel {
  constructor(
    public outletid: string = "",
    public requisitionItems: string[] = [],
    public requestedBy: string = "",
    public requestDate: Date = new Date(),
    public deliveryDate?: Date,
    public status: string = "pending",
    public description: string = "",
    public deliveryAddress: string = "",
    public priority?: boolean,
    public createdTimestamp: Date = new Date(),
    public updatedTimestamp: Date = new Date()
  ) {}
}

export class RequisitionEntity {
  constructor(
    public id: string | undefined = undefined,
    public outletid: string,
    public requisitionItems: string[],
    public requestedBy: string,
    public requestDate: Date,
    public status: string,
    public description: string,
    public deliveryAddress: string,
    public createdTimestamp: Date,
    public updatedTimestamp: Date,
    public deliveryDate?: Date,
    public priority?: boolean
  ) {}
}

export class RequisitionMapper {
  static toEntity(
    requisitionData: any,
    includeId?: boolean,
    existingRequisition?: RequisitionEntity
  ): RequisitionEntity {
    if (existingRequisition != null) {
      // If existingRequisition is provided, merge the data from requisitionData with the existingRequisition
      return {
        ...existingRequisition,
        outletid: requisitionData.outletid || existingRequisition.outletid,
        requisitionItems:
          requisitionData.requisitionItems ||
          existingRequisition.requisitionItems,
        requestedBy:
          requisitionData.requestedBy || existingRequisition.requestedBy,
        requestDate:
          requisitionData.requestDate || existingRequisition.requestDate,
        deliveryDate:
          requisitionData.deliveryDate || existingRequisition.deliveryDate,
        status: requisitionData.status || existingRequisition.status,
        description:
          requisitionData.description || existingRequisition.description,
        deliveryAddress:
          requisitionData.deliveryAddress ||
          existingRequisition.deliveryAddress,
        priority: requisitionData.priority || existingRequisition.priority,
        createdTimestamp:
          requisitionData.createdTimestamp ||
          existingRequisition.createdTimestamp,
        updatedTimestamp:
          requisitionData.updatedTimestamp ||
          existingRequisition.updatedTimestamp,
      };
    } else {
      // If existingRequisition is not provided, create a new RequisitionEntity using requisitionData
      const requisitionEntity: RequisitionEntity = {
        id: includeId
          ? requisitionData._id
            ? requisitionData._id.toString()
            : undefined
          : undefined,
        outletid: requisitionData.outletid,
        requisitionItems: requisitionData.requisitionItems,
        requestedBy: requisitionData.requestedBy,
        requestDate: requisitionData.requestDate,
        deliveryDate: requisitionData.deliveryDate,
        status: requisitionData.status,
        description: requisitionData.description,
        deliveryAddress: requisitionData.deliveryAddress,
        priority: requisitionData.priority,
        createdTimestamp: requisitionData.createdTimestamp,
        updatedTimestamp: requisitionData.updatedTimestamp,
      };
      return requisitionEntity;
    }
  }

  static toModel(requisition: RequisitionEntity): any {
    return {
      id: requisition.id,
      outletid: requisition.outletid,
      requisitionItems: requisition.requisitionItems,
      requestedBy: requisition.requestedBy,
      requestDate: requisition.requestDate,
      deliveryDate: requisition.deliveryDate,
      status: requisition.status,
      description: requisition.description,
      deliveryAddress: requisition.deliveryAddress,
      priority: requisition.priority,
      createdTimestamp: requisition.createdTimestamp,
      updatedTimestamp: requisition.updatedTimestamp,
    };
  }
}
