import { Context } from "hono";
import {  createFleetManagementService, deleteFleetManagementService, getFleetManagementService, getFleetManagementsService, updateFleetManagementService } from "./fleet.service";


export const getFleetManagements = async(c: Context) => {
    try {
        const data = await getFleetManagementsService();
        if(!data || data.length === 0) { 
            return c.text("FleetManagement not found")
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}


export const getFleetManagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetManagement = await getFleetManagementService(id);
    if (!FleetManagement) {
        return c.text("FleetManagement not found", 404);
    }
    return c.json(FleetManagement, 200);
};


export const createFleetManagement = async (c: Context) => {
    try {
        const FleetManagement = await c.req.json();
        const createdFleetManagement = await createFleetManagementService(FleetManagement);
        if (!createdFleetManagement) return c.text("Book not created", 404);
        return c.json({ msg: createdFleetManagement }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateFleetManagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetManagement = await c.req.json();
    try {
        // Search for the FleetManagement
        const searchedFleetManagement = await getFleetManagementService(id);
        if (searchedFleetManagement == undefined) return c.text("FleetManagement not found", 404);

        // Get the data and update it
        const res = await updateFleetManagementService(id, FleetManagement);
        // Return a success message
        if (!res) return c.text("FleetManagement not updated", 404);

        return c.json({ msg: res }, 201);
       } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteFleetManagement = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getFleetManagementService(id);
        if (!book) return c.text("FleetManagement not found", 404);
        const res = await deleteFleetManagementService(id);
        if (!res) return c.text("FleetManagement not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

