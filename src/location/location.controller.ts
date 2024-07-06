import { Context } from "hono";
import {  createLocationService, deleteLocationService, getLocationService, getLocationsService, updateLocationService } from "./location.service";


export const getLocations = async(c: Context) => {
    try {
        const data = await getLocationsService();
        if(!data || data.length === 0) { 
            return c.text("Location not found")
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}


export const getLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Location = await getLocationService(id);
    if (!Location) {
        return c.text("Location not found", 404);
    }
    return c.json(Location, 200);
};


export const createLocation = async (c: Context) => {
    try {
        const Location = await c.req.json();
        const createdLocation = await createLocationService(Location);
        if (!createdLocation) return c.text("Book not created", 404);
        return c.json({ msg: createdLocation }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateLocation = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Location = await c.req.json();
    try {
        // Search for the Location
        const searchedLocation = await getLocationService(id);
        if (searchedLocation == undefined) return c.text("Location not found", 404);

        // Get the data and update it
        const res = await updateLocationService(id, Location);
        // Return a success message
        if (!res) return c.text("Location not updated", 404);

        return c.json({ msg: res }, 201);
       } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteLocation = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getLocationService(id);
        if (!book) return c.text("Location not found", 404);
        const res = await deleteLocationService(id);
        if (!res) return c.text("Location not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

