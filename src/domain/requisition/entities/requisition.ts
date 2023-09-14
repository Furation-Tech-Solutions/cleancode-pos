export class RequisitionModel {
  constructor(
    public outletid: string[] = [],
    public inventoryid: string[] = [],
    public sender: string[] = [],
    public receiver: string[] = [],
    public requestDate: Date = new Date(),
    public status: string = "pending",
    public description: string = "",
  ) {}
}

export class RequisitionEntity {
  constructor(
    public id: string | undefined = undefined,
    public outletid: string[],
    public inventoryid: string[],
    public sender: string[],
    public receiver: string[],
    public requestDate: Date,
    public status: string,
    public description: string,
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
        inventoryid:
          requisitionData.inventoryid || existingRequisition.inventoryid,
        sender: requisitionData.sender || existingRequisition.sender,
        receiver: requisitionData.receiver || existingRequisition.receiver,
        requestDate:
          requisitionData.requestDate || existingRequisition.requestDate,
        status: requisitionData.status || existingRequisition.status,
        description:
          requisitionData.description || existingRequisition.description,
      };
    } else {
      // If existingRequisition is not provided, create a new RequisitionEntity using requisitionData
      const requisitionEntity: RequisitionEntity = {
        id: includeId
          ? requisitionData._id
            ? requisitionData._id.toString()
            : undefined
          : requisitionData._id.toString(),
        outletid: requisitionData.outletid,
        inventoryid: requisitionData.inventoryid,
        sender: requisitionData.sender,
        receiver: requisitionData.receiver,
        requestDate: requisitionData.requestDate,
        status: requisitionData.status,
        description: requisitionData.description,
      };
      return requisitionEntity;
    }
  }

  static toModel(requisition: RequisitionEntity): any {
    return {
      id: requisition.id,
      outletid: requisition.outletid,
      inventoryid: requisition.inventoryid,
      sender: requisition.sender,
      receiver: requisition.receiver,
      requestDate: requisition.requestDate,
      status: requisition.status,
      description: requisition.description,
    };
  }
}
