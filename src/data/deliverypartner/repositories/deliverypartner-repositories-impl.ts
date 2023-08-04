import { DeliverypartnerEntity, DeliverypartnerModel } from "@domain/deliverypartner/entities/deliverypartner";
import { DeliverypartnerDataSource } from "../datasources/deliverypartner-data-source";
import { DeliverypartnerRepository } from "@domain/deliverypartner/repositories/deliverypartner-repositories";


export class DeliverypartnerRepositoryImpl implements DeliverypartnerRepository {
    private readonly dataSource: DeliverypartnerDataSource;

    constructor (dataSource : DeliverypartnerDataSource) {
        this.dataSource= dataSource;
    }

    async createDeliverypartner(deliverypartner:DeliverypartnerModel) : Promise<DeliverypartnerEntity> {
        return await this.dataSource.create(deliverypartner);
    }

    async deleteDeliverypartner(id:string) : Promise<void> {
        await this.dataSource.delete(id);
    }

    async updateDeliverypartner(id:string, data:DeliverypartnerModel) : Promise<DeliverypartnerEntity> {
        return await this.dataSource.update(id, data);
    }

    async getAllDeliverypartner() : Promise<DeliverypartnerEntity[]> {
        return await this.dataSource.getAllDeliverypartner();
    }

    async getDeliverypartnerById(id:string) : Promise<DeliverypartnerEntity> {
        return await this.dataSource.read(id);
    }
}