import { DeliverypartnerEntity, DeliverypartnerModel } from "../entities/deliverypartner";


export interface DeliverypartnerRepository{
    createDeliverypartner(deliverypartner:DeliverypartnerModel) : Promise<DeliverypartnerEntity>;
    deleteDeliverypartner(id:string): Promise<void>;
    getAllDeliverypartner() : Promise<DeliverypartnerEntity[]>;
    getDeliverypartnerById(id: string) : Promise<DeliverypartnerEntity | null>;
    updateDeliverypartner(id: string, data: DeliverypartnerModel) : Promise<DeliverypartnerEntity>
}