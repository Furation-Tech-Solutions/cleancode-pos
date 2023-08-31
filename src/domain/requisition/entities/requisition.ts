export class RequisitionModel {
  constructor(
    public status: string = "pending",
  ) {}
}

export class RequisitionEntity {
  constructor(
    public id: string | undefined = undefined,
    public status: string,
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
        
        status: requisitionData.status || existingRequisition.status,
        
      };
    } else {
      // If existingRequisition is not provided, create a new RequisitionEntity using requisitionData
      const requisitionEntity: RequisitionEntity = {
        id: includeId
          ? requisitionData._id
            ? requisitionData._id.toString()
            : undefined
          : undefined,
       
        status: requisitionData.status,
       
      };
      return requisitionEntity;
    }
  }

  static toModel(requisition: RequisitionEntity): any {
    return {
      id: requisition.id,
     
      status: requisition.status,
    
    };
  }
}
