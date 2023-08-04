import { StaffEntity, StaffModel } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository";

export interface UpdateStaffUsecase {
    execute: (
        staffId: string,
        staffData: Partial<StaffModel>
    ) => Promise<StaffEntity>;
}

// Update StaffUsecase
export class UpdateStaff implements UpdateStaffUsecase {
    private readonly staffRepository: StaffRepository;

    constructor(staffRepository: StaffRepository) {
        this.staffRepository = staffRepository;
    }

    async execute(
        staffId: string,
        staffData: Partial<StaffModel>
    ): Promise<StaffEntity> {
        const existingStaff: StaffModel | null =
            await this.staffRepository.getStaffById(staffId);

        if (!existingStaff) {
            throw new Error("Staff not found.");
        }

        // Perform the partial update by merging staffData with existingStaff
        const updatedStaffData: StaffModel = {
            ...existingStaff,
            ...staffData,
        };

        // Save the updatedStaffData to the repository
        await this.staffRepository.updateStaff(staffId, updatedStaffData);

        // Fetch the updated Staff entity from the repository
        const updatedStaffEntity: StaffEntity | null =
            await this.staffRepository.getStaffById(staffId);

        if (!updatedStaffEntity) {
            throw new Error("Staff not found after update.");
        }

        return updatedStaffEntity;
    }

};
