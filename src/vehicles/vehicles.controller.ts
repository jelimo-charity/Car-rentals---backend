import { Context } from "hono";
import {  createVehicleService, deleteVehicleService, getVehicleService, getVehiclesService, updateVehicleService } from "./vehicles.service";


export const getVehicles = async(c: Context) => {
    try {
        const data = await getVehiclesService();
        if(!data || data.length === 0) { 
            return c.text("Vehicle not found")
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}


export const getVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Vehicle = await getVehicleService(id);
    if (!Vehicle) {
        return c.text("Vehicle not found", 404);
    }
    return c.json(Vehicle, 200);
};


export const createVehicle = async (c: Context) => {
    try {
        const Vehicle = await c.req.json();
        const createdVehicle = await createVehicleService(Vehicle);
        if (!createdVehicle) return c.text("Book not created", 404);
        return c.json({ msg: createdVehicle }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Vehicle = await c.req.json();
    try {
        // Search for the Vehicle
        const searchedVehicle = await getVehicleService(id);
        if (searchedVehicle == undefined) return c.text("Vehicle not found", 404);

        // Get the data and update it
        const res = await updateVehicleService(id, Vehicle);
        // Return a success message
        if (!res) return c.text("Vehicle not updated", 404);

        return c.json({ msg: res }, 201);
       } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteVehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getVehicleService(id);
        if (!book) return c.text("Vehicle not found", 404);
        const res = await deleteVehicleService(id);
        if (!res) return c.text("Vehicle not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

