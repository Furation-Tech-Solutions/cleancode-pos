// Express API request populate the ExpenseItem Model
export class ExpenseItemModel {
  constructor(
    public name: string = "",
    public description: string = "",
    public staff_id: string[] = [],
    public company_id: string[] = [],
    public del_status: boolean
  ) { }
}

// expenseItem Entity provided by expenseItem Repository is converted to Express API Response
export class ExpenseItemEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public description: string,
    public staff_id: string[],
    public company_id: string[],
    public del_status: boolean
  ) { }
}


export class ExpenseItemMapper {
  static toEntity(
    expenseItemData: any,
    includeId?: boolean,
    existingExpenseItem?: ExpenseItemEntity
  ): ExpenseItemEntity {
    if (existingExpenseItem != null) {
      // If existingExpenseItem is provided, merge the data from expenseItemData with the existingExpenseItem
      return {
        ...existingExpenseItem,
        name:
          expenseItemData.name !== undefined ? expenseItemData.name : existingExpenseItem.name,
        description:
          expenseItemData.description !== undefined ? expenseItemData.description : existingExpenseItem.description,
        staff_id:
          expenseItemData.staff_id !== undefined ? expenseItemData.staff_id : existingExpenseItem.staff_id,
        company_id:
          expenseItemData.company_id !== undefined ? expenseItemData.company_id : existingExpenseItem.company_id,
        del_status:
          expenseItemData.del_status !== undefined ? expenseItemData.del_status : existingExpenseItem.del_status
      };
    } else {
      // If existingExpenseItem is not provided, create a new ExpenseItemEntity using expenseItemData
      const ExpenseItemEntity: ExpenseItemEntity = {
        id: includeId ? (expenseItemData._id ? expenseItemData._id.toString() : undefined) : expenseItemData._id.toString(),
        name: expenseItemData.name,
        description: expenseItemData.description,
        staff_id: expenseItemData.staff_id,
        company_id: expenseItemData.company_id,
        del_status: expenseItemData.del_status
      };
      return ExpenseItemEntity;
    }
  }

  static toModel(expenseItem: ExpenseItemEntity): any {
    return {
      id: expenseItem.id,
      name: expenseItem.name,
      description: expenseItem.description,
      staff_id: expenseItem.staff_id,
      company_id: expenseItem.company_id,
      del_status: expenseItem.del_status
    };
  }
}
