// Express API request populate the cuisine Model
export class CuisineModel {
  constructor(
    public name: string = "",
    public description: string = "",
    public createdBy: Date,
    public del_status: boolean
  ) { }
}

// cuisine Entity provided by cuisine Repository is converted to Express API Response
export class CuisineEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public description: string,
    public createdBy: Date,
    public del_status: boolean
  ) { }
}


export class CuisineMapper {
  static toEntity(
    cuisineData: any,
    includeId?: boolean,
    existingCuisine?: CuisineEntity
  ): CuisineEntity {
    if (existingCuisine != null) {
      // If existingCuisine is provided, merge the data from cuisineData with the existingCuisine
      return {
        ...existingCuisine,
        name:
          cuisineData.name !== undefined ? cuisineData.name : existingCuisine.name,
        description:
          cuisineData.description !== undefined ? cuisineData.description : existingCuisine.description,
        createdBy:
          cuisineData.createdBy !== undefined ? cuisineData.createdBy : existingCuisine.createdBy,
        del_status:
          cuisineData.del_status !== undefined ? cuisineData.del_status : existingCuisine.del_status
      };
    } else {
      // If existingCuisine is not provided, create a new CuisineEntity using cuisineData
      const CuisineEntity: CuisineEntity = {
        id: includeId ? (cuisineData._id ? cuisineData._id.toString() : undefined) : cuisineData._id.toString(),
        name: cuisineData.name,
        description: cuisineData.description,
        createdBy: cuisineData.createdBy,
        del_status: cuisineData.del_status
      };
      return CuisineEntity;
    }
  }

  static toModel(cuisine: CuisineEntity): any {
    return {
      id: cuisine.id,
      name: cuisine.name,
      description: cuisine.description,
      createdBy: cuisine.createdBy,
      del_status: cuisine.del_status
    };
  }
}
