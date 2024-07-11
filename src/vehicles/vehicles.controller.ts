import { Context } from 'hono';
import cloudinary from 'cloudinary';
import 'dotenv/config';
import { VehiclesService, getVehicleService, createVehicleService, updateVehicleService, deleteVehicleService } from './vehicles.service';
import { TIVehicle } from '../drizzle/schema';

// Configure Cloudinary (make sure to set your environment variables)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getVehicles = async (c: Context) => {
  try {
    const limit = c.req.query('limit');
    const Vehicles = await VehiclesService(limit ? parseInt(limit) : undefined);
    return c.json({ Vehicles }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const getVehicle = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const Vehicle = await getVehicleService(id);
    if (!Vehicle) {
      return c.json({ error: 'Vehicle not found' }, 404);
    }
    return c.json({ Vehicle }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const createVehicle = async (c: Context) => {
  try {
    const formData = await c.req.parseBody();
    const image = formData.image as File | undefined;

    let imageUrl = '';
    if (image) {
      const base64Data = await image.arrayBuffer();
      const base64String = Buffer.from(base64Data).toString('base64');
      const result = await cloudinary.v2.uploader.upload(`data:${image.type};base64,${base64String}`);
      imageUrl = result.secure_url;
    }

    const vehicleData = {
      rental_rate: Number(formData.rental_rate),
      availability: formData.availability === 'true',
      image_url: imageUrl,
    };

    const message = await createVehicleService(vehicleData);
    return c.json({ msg: message }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const updateVehicle = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const Vehicle = await c.req.json<TIVehicle>();
    const message = await updateVehicleService(id, Vehicle);
    return c.json({ msg: message }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const deleteVehicle = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'));
    const message = await deleteVehicleService(id);
    return c.json({ msg: message }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
};

export const uploadImage = async (c: Context) => {
  try {
    const formData = await c.req.parseBody();
    const file = formData.file as File | undefined;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    const base64Data = await file.arrayBuffer();
    const base64String = Buffer.from(base64Data).toString('base64');

    const result = await cloudinary.v2.uploader.upload(`data:${file.type};base64,${base64String}`);
    return c.json({ imageUrl: result.secure_url }, 200);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
};


