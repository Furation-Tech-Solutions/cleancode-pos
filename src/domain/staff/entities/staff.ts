// Express API request populate the staff Model
export class StaffModel {
  constructor(
    public username: string = "",
    public email_address: string = "",
    public phone: number = 0,
    public password: string = "",
    public jobTitle: string = "",
    public superAdmin: boolean = false,
    public admin: boolean = false,
    public permissions: number[] = [],
    public active: boolean = false,
    public outlet_code: string = ""
  ) { }
}

// staff Entity provided by staff Repository is converted to Express API Response
export class StaffEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public username: string = "",
    public email_address: string = "",
    public phone: number = 0,
    public password: string = "",
    public jobTitle: string = "",
    public superAdmin: boolean = false,
    public admin: boolean = false,
    public permissions: number[] = [],
    public active: boolean = false,
    public outlet_code: string = ""
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
        username:
          staffData.username !== undefined ? staffData.username : existingStaff.username,
        email_address:
          staffData.email_address !== undefined ? staffData.email_address : existingStaff.email_address,
        phone:
          staffData.phone !== undefined ? staffData.phone : existingStaff.phone,
        password:
          staffData.password !== undefined ? staffData.password : existingStaff.password,
        jobTitle:
          staffData.jobTitle !== undefined
            ? staffData.jobTitle
            : existingStaff.jobTitle,
        superAdmin:
          staffData.superAdmin !== undefined
            ? staffData.superAdmin
            : existingStaff.superAdmin,
        admin:
          staffData.admin !== undefined ? staffData.admin : existingStaff.admin,
        permissions:
          staffData.permissions !== undefined
            ? staffData.permissions
            : existingStaff.permissions,
        active:
          staffData.active !== undefined
            ? staffData.active
            : existingStaff.active,
        outlet_code:
          staffData.outlet_code !== undefined
            ? staffData.outlet_code
            : existingStaff.outlet_code,
      };
    } else {
      // If existingStaff is not provided, create a new staffEntity using staffData
      const staffEntity: StaffEntity = {
        id: includeId ? (staffData._id ? staffData._id.toString() : undefined) : undefined,
        username: staffData.username,
        email_address: staffData.email_address,
        phone: staffData.phone,
        password: staffData.password,
        jobTitle: staffData.jobTitle,
        superAdmin: staffData.superAdmin,
        admin: staffData.admin,
        permissions: staffData.permissions,
        active: staffData.active,
        outlet_code: staffData.outlet_code,
      };
      return staffEntity;
    }
  }

  static toModel(staff: StaffEntity): any {
    return {
      id: staff.id,
      username: staff.username,
      email_address: staff.email_address,
      phone: staff.phone,
      password: staff.password,
      jobTitle: staff.jobTitle,
      superStaff: staff.superAdmin,
      admin: staff.admin,
      permissions: staff.permissions,
      active: staff.active,
      outlet_code: staff.outlet_code,
    };
  }
}
