import api from "../services/api";
import { Product } from "../types/Product";

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const createProduct = async (product: Product) => {
    const response = await api.post("/products", product);
    return response.data;
};

export const updateProduct = async (id: number, product: Product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};  

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
};