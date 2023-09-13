export class WasteModel {
  constructor(
    public date: Date = new Date(),
    public responsiblePerson: string = "",
    public ingredients: string = "",
    public foodMenu: string = "",
    public quantity: Number = 0,
    public unitOfMeasurement: string = "",
    public totalLoss: number = 0,
    public notes: string = "",
    public addedBy: string = ""
  ) {}
}

export class WasteEntity {
  constructor(
    public id: string | undefined = undefined,
    public date: Date,
    public responsiblePerson: string,
    public ingredients: string,
    public foodMenu: string,
    public quantity: Number,
    public unitOfMeasurement: string,
    public totalLoss: number,
    public notes: string,
    public addedBy: string
  ) {}
}

export class WasteMapper {
  static toEntity(
    wasteData: any,
    includeId?: boolean,
    existingWaste?: WasteEntity
  ): WasteEntity {
    if (existingWaste != null) {
      // If existingWaste is provided, merge the data from wasteData with the existingWaste
      return {
        ...existingWaste,
        date: wasteData.date || existingWaste.date,
        responsiblePerson:
          wasteData.responsiblePerson || existingWaste.responsiblePerson,
        ingredients: wasteData.ingredients || existingWaste.ingredients,
        foodMenu: wasteData.foodMenu || existingWaste.foodMenu,
        quantity: wasteData.quantity || existingWaste.quantity,
        unitOfMeasurement:
          wasteData.unitOfMeasurement || existingWaste.unitOfMeasurement,
        totalLoss: wasteData.totalLoss || existingWaste.totalLoss,
        notes: wasteData.notes || existingWaste.notes,
        addedBy: wasteData.addedBy || existingWaste.addedBy,
      };
    } else {
      // If existingWaste is not provided, create a new WasteEntity using wasteData
      const wasteEntity: WasteEntity = {
        id: includeId
          ? wasteData._id
            ? wasteData._id.toString()
            : undefined
          : wasteData._id.toString(),
        date: wasteData.date,
        responsiblePerson: wasteData.responsiblePerson,
        ingredients: wasteData.ingredients,
        foodMenu: wasteData.foodMenu,
        quantity: wasteData.quantity,
        unitOfMeasurement: wasteData.unitOfMeasurement,
        totalLoss: wasteData.totalLoss,
        notes: wasteData.notes,
        addedBy: wasteData.addedBy,
      };
      return wasteEntity;
    }
  }

  static toModel(waste: WasteEntity): any {
    return {
      id: waste.id,
      date: waste.date,
      responsiblePerson: waste.responsiblePerson,
      ingredients: waste.ingredients,
      foodMenu: waste.foodMenu,
      quantity: waste.quantity,
      unitOfMeasurement: waste.unitOfMeasurement,
      totalLoss: waste.totalLoss,
      notes: waste.notes,
      addedBy: waste.addedBy,
    };
  }
}
