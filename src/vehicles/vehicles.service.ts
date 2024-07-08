import { db } from './../drizzle/db';
import { eq } from 'drizzle-orm';
import { Vehicles, TIVehicle, TSVehicle } from '../drizzle/schema';
import { uploadImage } from '../imageUpload/imageUpload.service';

export const getVehiclesService = async (): Promise<TSVehicle[] | null> => {
  const VehiclesData = await db.select().from(Vehicles);
  return VehiclesData;
}

export const getVehicleService = async (id: number): Promise<TSVehicle | undefined> => {
  const VehicleData = await db.select().from(Vehicles).where(eq(Vehicles.id, id)).execute();
  if (VehicleData.length === 0) {
    return undefined;
  }
  return VehicleData[0];
};

export const createVehicleService = async (vehicle: TIVehicle, imagePath: string) => {
  const imageUrl = await uploadImage(imagePath); // Upload the image and get the URL
  const vehicleWithImage = { ...vehicle, image_url: imageUrl }; // Add image URL to the vehicle data
  await db.insert(Vehicles).values(vehicleWithImage).execute();
  return "Vehicle created successfully";
};

export const updateVehicleService = async (id: number, vehicle: TIVehicle, imagePath?: string) => {
  if (imagePath) {
    const imageUrl = await uploadImage(imagePath); // Upload the image and get the URL
    vehicle = { ...vehicle, image_url: imageUrl }; // Add/Update image URL to the vehicle data
  }
  await db.update(Vehicles).set(vehicle).where(eq(Vehicles.id, id)).execute();
  return "Vehicle updated successfully";
};

export const deleteVehicleService = async (id: number) => {
  await db.delete(Vehicles).where(eq(Vehicles.id, id)).execute();
  return "Vehicle deleted successfully";
};
