import { Context } from "hono";
import { createVehicleService, deleteVehicleService, getVehicleService, getVehiclesService, updateVehicleService } from "./vehicles.service";

export const getVehicles = async (c: Context) => {
    try {
        const data = await getVehiclesService();
        if (!data || data.length === 0) {
            return c.text("Vehicles not found");
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
};

export const getVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicle = await getVehicleService(id);
    if (!vehicle) {
        return c.text("Vehicle not found", 404);
    }
    return c.json(vehicle, 200);
};

export const createVehicle = async (c: Context) => {
    try {
        const vehicleData = await c.req.json();
        const createdVehicle = await createVehicleService(vehicleData);
        if (!createdVehicle) return c.text("Vehicle not created", 404);
        return c.json({ msg: "Vehicle created successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicleData = await c.req.json();
    try {
        const existingVehicle = await getVehicleService(id);
        if (!existingVehicle) return c.text("Vehicle not found", 404);

        const res = await updateVehicleService(id, vehicleData);
        if (!res) return c.text("Vehicle not updated", 404);

        return c.json({ msg: "Vehicle updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const existingVehicle = await getVehicleService(id);
        if (!existingVehicle) return c.text("Vehicle not found", 404);

        const res = await deleteVehicleService(id);
        if (!res) return c.text("Vehicle not deleted", 404);

        return c.json({ msg: "Vehicle deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
