import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

// Obtener todos los restaurantes
export const getAllRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    return [];
  }
};

// Agregar un nuevo restaurante
export const addRestaurant = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "restaurants"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error al agregar restaurante:", error);
    throw error;
  }
};
