import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Product } from "../types/Product";

interface Props {
  onSubmit: (data: Product) => void;
  defaultValues?: Product;
}

export default function ProductForm({ onSubmit, defaultValues }: Props) {
  const [name, setName] = useState(defaultValues?.name || "");
  const [price, setPrice] = useState(
    defaultValues?.price ? String(defaultValues.price) : ""
  );

  const handleSubmit = () => {
    if (!name || !price) return alert("Preencha todos os campos!");
    onSubmit({ name, price: Number(price) });
    setName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do produto"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
});
