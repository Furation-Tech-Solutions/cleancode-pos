// Express API request populate the Staff Model
export class StaffModel {
    constructor(
        public name: string = "",
        public email: string = "",
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

// Staff Entity provided by Staff Repository is converted to Express API Response
export class StaffEntity {
    constructor(
        public id: string | undefined = undefined, // Set a default value for id
        public name: string = "",
        public email: string = "",
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

export class StaffMapper {
    static toEntity(
        staffData: any,
        includeId?: boolean,
        existingStaff?: StaffEntity
    ): StaffEntity {
        if (existingStaff != null) {
            // If existingStaff is provided, merge the data from staffData with the existingStaff
            return {
                ...existingStaff,
                name:
                    staffData.name !== undefined ? staffData.name : existingStaff.name,
                email:
                    staffData.email !== undefined ? staffData.email : existingStaff.email,
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
            // If existingStaff is not provided, create a new StaffEntity using staffData
            const staffEntity: StaffEntity = {
                id: includeId ? (staffData._id ? staffData._id.toString() : undefined) : undefined,
                name: staffData.name,
                email: staffData.email,
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
            name: staff.name,
            email: staff.email,
            phone: staff.phone,
            password: staff.password,
            jobTitle: staff.jobTitle,
            superAdmin: staff.superAdmin,
            admin: staff.admin,
            permissions: staff.permissions,
            active: staff.active,
            outlet_code: staff.outlet_code,
        };
    }
}
