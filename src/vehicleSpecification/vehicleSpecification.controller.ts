import { Context } from "hono";
import { createVehicleSpecificationService,  deleteVehicleSpecificationService, getVehicleSpecificationService,  getVehiclesSpecificationService, updateVehicleSpecificationService } from "./vehicleSpecification.service";

export const getVehicleSpecifications = async (c: Context) => {
    try {
        const data = await getVehiclesSpecificationService();
        if (!data || data.length === 0) { 
            return c.text("Vehicle specifications not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}

export const getVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicleSpecification = await getVehicleSpecificationService(id);
    if (!vehicleSpecification) {
        return c.text("Vehicle specification not found", 404);
    }
    return c.json(vehicleSpecification, 200);
};

export const createVehicleSpecification = async (c: Context) => {
    try {
        const vehicleSpecification = await c.req.json();
        const createdVehicleSpecification = await createVehicleSpecificationService(vehicleSpecification);
        if (!createdVehicleSpecification) return c.text("Vehicle specification not created", 404);
        return c.json({ msg: createdVehicleSpecification }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicleSpecification = await c.req.json();
    try {
        const searchedVehicleSpecification = await getVehicleSpecificationService(id);
        if (!searchedVehicleSpecification) return c.text("Vehicle specification not found", 404);

        const res = await updateVehicleSpecificationService(id, vehicleSpecification);
        if (!res) return c.text("Vehicle specification not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const vehicleSpecification = await getVehicleSpecificationService(id);
        if (!vehicleSpecification) return c.text("Vehicle specification not found", 404);
        
        const res = await deleteVehicleSpecificationService(id);
        if (!res) return c.text("Vehicle specification not deleted", 404);
        
        return c.json({ msg: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
