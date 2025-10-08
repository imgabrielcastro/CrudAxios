import React from "react";
import { View, Text, Button } from "react-native";
import { Product } from "../types/Product";

interface IProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: IProps) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ color: "#666" }}>R$ {product.price.toFixed(2)}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <Button title="Editar" onPress={onEdit} />
        <Button title="Excluir" color="red" onPress={onDelete} />
      </View>
    </View>
  );
}
