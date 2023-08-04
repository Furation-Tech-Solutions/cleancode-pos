import { StaffEntity, StaffModel } from "@domain/staff/entities/staff";
import { StaffRepository } from "@domain/staff/repositories/staff-repository";
import { StaffDataSource } from "@data/staff/datasource/staff-data-source";

export class StaffRepositoryImpl implements StaffRepository {
    private readonly dataSource: StaffDataSource;

    constructor(dataSource: StaffDataSource) {
        this.dataSource = dataSource;
    }
    async createStaff(staff: StaffModel): Promise<StaffEntity> {
         const res = await this.dataSource.create(staff);
         console.log(res);
         return res;
    }

    async deleteStaff(id: string): Promise<void> {
        await this.dataSource.delete(id);
    }

    async updateStaff(id: string, data: StaffModel): Promise<StaffEntity> {
        return await this.dataSource.update(id, data);
    }

    async getStaffs(): Promise<StaffEntity[]> {
        return await this.dataSource.getAllStaffs();
    }

    async getStaffById(id: string): Promise<StaffEntity | null> {
        return await this.dataSource.read(id);
    }
}
