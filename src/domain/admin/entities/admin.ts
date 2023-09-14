// Express API request populate the Admin Model
export class AdminModel {
  constructor(
    public name: string = "",
    public emailId: string = "",
    public phone: number = 0,
    public brand: string = "",
    public jobTitle: string = "",
    public superAdmin: boolean = false,
    public admin: boolean = false,
    public permissions: number[] = [],
    public password: string = "",
    public active: boolean = false,
    public outlet: string = ""
  ) {}
}

export class LoginModel {
  constructor(
    public emailId: string = "",
    public password: string = ""
  ) {}
}

// Admin Entity provided by Admin Repository is converted to Express API Response
export class AdminEntity {
  constructor(
    public id: string | undefined = undefined, // Set a default value for id
    public name: string,
    public emailId: string,
    public phone: number,
    public brand: string,
    public jobTitle: string,
    public superAdmin: boolean,
    public admin: boolean,
    public permissions: number[],
    public password: string,
    public active: boolean,
    public outlet: string
  ) {}
}

export class LoginEntity {
  constructor(public emailId: string, public password: string) {}
}



export class AdminMapper {
  static toEntity(
    adminData: any,
    includeId?: boolean,
    existingAdmin?: AdminEntity
  ): AdminEntity {
    if (existingAdmin != null) {
      // If existingAdmin is provided, merge the data from adminData with the existingAdmin
      return {
        ...existingAdmin,
        name:
          adminData.name !== undefined ? adminData.name : existingAdmin.name,
        emailId:
          adminData.email !== undefined ? adminData.email : existingAdmin.emailId,
        phone:
          adminData.phone !== undefined ? adminData.phone : existingAdmin.phone,
        brand:
          adminData.brand !== undefined ? adminData.brand : existingAdmin.brand,
        jobTitle:
          adminData.jobTitle !== undefined
            ? adminData.jobTitle
            : existingAdmin.jobTitle,
        superAdmin:
          adminData.superAdmin !== undefined
            ? adminData.superAdmin
            : existingAdmin.superAdmin,
        admin:
          adminData.admin !== undefined ? adminData.admin : existingAdmin.admin,
        permissions:
          adminData.permissions !== undefined
            ? adminData.permissions
            : existingAdmin.permissions,
        password:
          adminData.password !== undefined
            ? adminData.password
            : existingAdmin.password,
        active:
          adminData.active !== undefined
            ? adminData.active
            : existingAdmin.active,
        outlet:
          adminData.outlet !== undefined
            ? adminData.outlet
            : existingAdmin.outlet,
      };
    } else {
      // If existingAdmin is not provided, create a new AdminEntity using adminData
      const adminEntity: AdminEntity = {
        id: includeId ? (adminData._id ? adminData._id.toString() : undefined) : undefined,
        name: adminData.name,
        emailId: adminData.email,
        phone: adminData.phone,
        brand: adminData.brand,
        jobTitle: adminData.jobTitle,
        superAdmin: adminData.superAdmin,
        admin: adminData.admin,
        permissions: adminData.permissions,
        password: adminData.password,
        active: adminData.active,
        outlet: adminData.outlet,
      };
      return adminEntity;
    }
  }

  static toModel(admin: AdminEntity): any {
    return {
      id: admin.id,
      name: admin.name,
      emailId: admin.emailId,
      phone: admin.phone,
      brand: admin.brand,
      jobTitle: admin.jobTitle,
      superAdmin: admin.superAdmin,
      admin: admin.admin,
      permissions: admin.permissions,
      password: admin.password,
      active: admin.active,
      outlet: admin.outlet,
    };
  }
}
