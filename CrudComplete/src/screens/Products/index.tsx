import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard";
import ProductForm from "../../components/ProductForm";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = async (product: Product) => {
        const newProduct = await createProduct(product);
        setProducts([...products, newProduct]);
    };


    const handleDelete = async (id: number) => {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = async (id: number, product: Product) => {
        await updateProduct(id, product);
        setProducts(products.map(product => product.id === id ? product : product));
    };



    if (loading) return <ActivityIndicator size="large" color="#000" />;

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
                Lista de Produtos
            </Text>

            <ProductForm onSubmit={handleAdd} />

            <FlatList
                data={products}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onDelete={() => handleDelete(item.id!)}
                        onEdit={() =>
                            handleEdit(item.id!, {
                                ...item,
                                name: item.name + " (editado)",
                            })
                        }
                    />
                )}
            />
        </View>
    );
}