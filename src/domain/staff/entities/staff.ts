// Express API request populate the staff Model
export class StaffModel {
  constructor(
    public outletCode_byId: string[] = [],
    public username: string = "",
    public phone: number = 0,
    public email_address: string = "",
    public jobTitle: string = "",
    public permissions: number,
    public active: boolean,
    public createdAt: Date,
    public password: string = "",
    public secuerityQuestion: string = "",
    public del_status: boolean
  ) { }
}

// staff Entity provided by staff Repository is converted to Express API Response
export class StaffEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public outletCode_byId: string[],
    public username: string,
    public phone: number,
    public email_address: string,
    public jobTitle: string,
    public permissions: number,
    public active: boolean,
    public createdAt: Date,
    public password: string,
    public secuerityQuestion: string,
    public del_status: boolean
  ) { }
}


export class staffMapper {
  static toEntity(
    staffData: any,
    includeId?: boolean,
    existingStaff?: StaffEntity
  ): StaffEntity {
    if (existingStaff != null) {
      // If existingstaff is provided, merge the data from staffData with the existingstaff
      return {
        ...existingStaff,
        outletCode_byId:
          staffData.outletCode_byId !== undefined ? staffData.outletCode_byId : existingStaff.outletCode_byId,
        username:
          staffData.username !== undefined ? staffData.username : existingStaff.username,
        phone:
          staffData.phone !== undefined ? staffData.phone : existingStaff.phone,
        email_address:
          staffData.email_address !== undefined ? staffData.email_address : existingStaff.email_address,
        jobTitle:
          staffData.jobTitle !== undefined
            ? staffData.jobTitle
            : existingStaff.jobTitle,
        permissions:
          staffData.permissions !== undefined
            ? staffData.permissions
            : existingStaff.permissions,
        active:
          staffData.active !== undefined ? staffData.admin : existingStaff.active,
        createdAt:
          staffData.createdAt !== undefined
            ? staffData.createdAt
            : existingStaff.createdAt,
        password:
          staffData.password !== undefined
            ? staffData.password
            : existingStaff.password,
        secuerityQuestion:
          staffData.secuerityQuestion !== undefined
            ? staffData.secuerityQuestion
            : existingStaff.secuerityQuestion,
        del_status:
          staffData.del_status !== undefined
            ? staffData.del_status
            : existingStaff.del_status
      };
    } else {
      // If existingStaff is not provided, create a new staffEntity using staffData
      const staffEntity: StaffEntity = {
        id: includeId ? (staffData._id ? staffData._id.toString() : undefined) : staffData._id.toString(),
        outletCode_byId: staffData.outletCode_byId,
        username: staffData.username,
        phone: staffData.phone,
        email_address: staffData.email_address,
        jobTitle: staffData.jobTitle,
        permissions: staffData.permissions,
        active: staffData.active,
        createdAt: staffData.createdAt,
        password: staffData.password,
        secuerityQuestion: staffData.secuerityQuestion,
        del_status: staffData.del_status,
      };
      return staffEntity;
    }
  }

  static toModel(staff: StaffEntity): any {
    return {
      id: staff.id,
      outletCode_byId: staff.outletCode_byId,
      username: staff.username,
      phone: staff.phone,
      email_address: staff.email_address,
      jobTitle: staff.jobTitle,
      permissions: staff.permissions,
      active: staff.active,
      createdAt: staff.createdAt,
      password: staff.password,
      secuerityQuestion: staff.secuerityQuestion,
      del_status: staff.del_status,
    };
  }
}
