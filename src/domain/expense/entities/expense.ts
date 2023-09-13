// Express API request populate the expense Model
export class ExpenseModel {
  constructor(
    public date: Date,
    public amount: number = 0,
    public staff_id: string[] = [],
    public note: string = "",
    public outlet_id: string[] = [],
    public payment_id: string[] = [],
    public del_status: boolean
  ) { }
}

// expense Entity provided by expense Repository is converted to Express API Response
export class ExpenseEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public date: Date,
    public amount: number,
    public staff_id: string[],
    public note: string,
    public outlet_id: string[],
    public payment_id: string[],
    public del_status: boolean
  ) { }
}


export class ExpenseMapper {
  static toEntity(
    expenseData: any,
    includeId?: boolean,
    existingExpense?: ExpenseEntity
  ): ExpenseEntity {
    if (existingExpense != null) {
      // If existingExpense is provided, merge the data from expenseData with the existingExpense
      return {
        ...existingExpense,
        date:
          expenseData.date !== undefined ? expenseData.date : existingExpense.date,
        amount:
          expenseData.amount !== undefined ? expenseData.amount : existingExpense.amount,
        staff_id:
          expenseData.staff_id !== undefined ? expenseData.staff_id : existingExpense.staff_id,
        note:
          expenseData.note !== undefined ? expenseData.note : existingExpense.note,
        outlet_id:
          expenseData.outlet_id !== undefined ? expenseData.outlet_id : existingExpense.outlet_id,
        payment_id:
          expenseData.payment_id !== undefined ? expenseData.payment_id : existingExpense.payment_id,
        del_status:
          expenseData.del_status !== undefined ? expenseData.del_status : existingExpense.del_status
      };
    } else {
      // If existingExpense is not provided, create a new ExpenseEntity using expenseData
      const ExpenseEntity: ExpenseEntity = {
        id: includeId ? (expenseData._id ? expenseData._id.toString() : undefined) : expenseData._id.toString(),
        date: expenseData.date,
        amount: expenseData.amount,
        staff_id: expenseData.staff_id,
        note: expenseData.note,
        outlet_id: expenseData.outlet_id,
        payment_id: expenseData.payment_id,
        del_status: expenseData.del_status
      };
      return ExpenseEntity;
    }
  }

  static toModel(expense: ExpenseEntity): any {
    return {
      id: expense.id,
      date: expense.date,
      amount: expense.amount,
      staff_id: expense.staff_id,
      note: expense.note,
      outlet_id: expense.outlet_id,
      payment_id: expense.payment_id,
      del_status: expense.del_status
    };
  }
}
