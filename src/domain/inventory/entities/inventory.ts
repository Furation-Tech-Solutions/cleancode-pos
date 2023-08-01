// Express API request populate the Inventory Model
export class InventoryModel {
    constructor(
        public name: string = "",
        public place: string = "",
        public comapanyId: string = ""
    ) { }
}

// Inventory Entity provided by Inventory Repository is converted to Express API Response
export class InventoryEntity {
    constructor(
        public id: string | undefined = undefined, // Set a default value for id
        public name: string,
        public placce: string,
        public companyId: string
    ) { }
}

export class InventoryMapper {
    static toEntity(
        InventoryData: any,
        includeId?: boolean,
        existingInventory?: InventoryEntity): InventoryEntity {
        if (existingInventory != null) {
            // If existingInventory is provided, merge the data from InventoryData with the existingInventory
            return {
                ...existingInventory,
                name: InventoryData.name !== undefined ? InventoryData.name : existingInventory.name,
                place: InventoryData.place !== undefined ? InventoryData.place : existingInventory.place,
                companyId: InventoryData.comapanyId !== undefined ? InventoryData.comapanyId : existingInventory.comapanyId
            };
        }else{
            // If existingInventory is not provided, create a new InventoryEntity using InventoryData
            const idnventoryEntity: InventoryEntity = {
                          id: includeId ? (InventoryData._id ? InventoryData._id.toString() : undefined) : undefined,
                          name: InventoryData.name,
                          place: InventoryData.place,
                          companyId: InventoryData.companyId,
                        };
                        return adminEntity;
                      }
        }

    }
}




// export class AdminMapper {
//     static toEntity(
//       adminData: any,
//       includeId?: boolean,
//       existingAdmin?: AdminEntity
//     ): AdminEntity {
//       if (existingAdmin != null) {
//         // If existingAdmin is provided, merge the data from adminData with the existingAdmin
//         return {
//           ...existingAdmin,
//           name:
//             adminData.name !== undefined ? adminData.name : existingAdmin.name,
//           email:
//             adminData.email !== undefined ? adminData.email : existingAdmin.email,
//           phone:
//             adminData.phone !== undefined ? adminData.phone : existingAdmin.phone,
//           brand:
//             adminData.brand !== undefined ? adminData.brand : existingAdmin.brand,
//           jobTitle:
//             adminData.jobTitle !== undefined
//               ? adminData.jobTitle
//               : existingAdmin.jobTitle,
//           superAdmin:
//             adminData.superAdmin !== undefined
//               ? adminData.superAdmin
//               : existingAdmin.superAdmin,
//           admin:
//             adminData.admin !== undefined ? adminData.admin : existingAdmin.admin,
//           permissions:
//             adminData.permissions !== undefined
//               ? adminData.permissions
//               : existingAdmin.permissions,
//           active:
//             adminData.active !== undefined
//               ? adminData.active
//               : existingAdmin.active,
//           outlet:
//             adminData.outlet !== undefined
//               ? adminData.outlet
//               : existingAdmin.outlet,
//         };
//       } else {
//         // If existingAdmin is not provided, create a new AdminEntity using adminData
//         const adminEntity: AdminEntity = {
//           id: includeId ? (adminData._id ? adminData._id.toString() : undefined) : undefined,
//           name: adminData.name,
//           email: adminData.email,
//           phone: adminData.phone,
//           brand: adminData.brand,
//           jobTitle: adminData.jobTitle,
//           superAdmin: adminData.superAdmin,
//           admin: adminData.admin,
//           permissions: adminData.permissions,
//           active: adminData.active,
//           outlet: adminData.outlet,
//         };
//         return adminEntity;
//       }
//     }
  
//     static toModel(admin: AdminEntity): any {
//       return {
//         id: admin.id,
//         name: admin.name,
//         email: admin.email,
//         phone: admin.phone,
//         brand: admin.brand,
//         jobTitle: admin.jobTitle,
//         superAdmin: admin.superAdmin,
//         admin: admin.admin,
//         permissions: admin.permissions,
//         active: admin.active,
//         outlet: admin.outlet,
//       };
//     }
//   }
  
