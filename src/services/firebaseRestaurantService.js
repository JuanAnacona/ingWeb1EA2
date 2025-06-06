import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    writeBatch
} from "firebase/firestore";

import { db } from "./firebase"; // Adjust the import path as necessary
const COLLECTION_NAME = "restaurant"

const generateID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

export const getRestaurants = async () => {
    const restaurantsCollection = collection(db, COLLECTION_NAME);
    const q = query(restaurantsCollection, orderBy("name"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        // You may want to define InitialRestaurants as a function or array elsewhere
        // For now, we'll return an empty array as a placeholder
        return InitialRestaurants || [];
    }
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

export const getRestaurantsById = async (id) => {
    const restaurantDoc = doc(db, COLLECTION_NAME, id);
    const restaurantSnapshot = await getDocs(restaurantDoc);
    if (!restaurantSnapshot.exists()) {
        throw new Error(`Restaurant with ID ${id} not found`);
    }
    return {id: restaurantSnapshot.id, ...restaurantSnapshot.data()};
};

export const getRestaurantsByCategory = async (name) => {
    const restaurantsCollection = collection(db, COLLECTION_NAME);
    const q = query(restaurantsCollection, where("category", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return [];
    }
    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

export const addRestaurant = async (restaurant) => {
    const restaurantsCollection = collection(db, COLLECTION_NAME);
    const newRestaurant = {
        ...restaurant,
        id: generateID(),
        createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(restaurantsCollection, newRestaurant);
    return {id: docRef.id, ...newRestaurant};
};

export const updateRestaurant = async (id, updatedData) => {
    try {
        if (!id || !updatedData) {
            throw new Error("ID and updated data are required");
        }
    } catch (error) {
        console.error("Error in updateRestaurant:", error);
        throw error;
    }
    const restaurantDoc = doc(db, COLLECTION_NAME, id);
    await updateDoc(restaurantDoc, updatedData);
    return {id, ...updatedData};
}; 

export const deleteRestaurant = async (id) => {
    try {
        if (!id) {
            throw new Error("ID is required for deletion");
        }
    } catch (error) {
        console.error("Error in deleteRestaurant:", error);
        throw error;
    }
    const restaurantDoc = doc(db, COLLECTION_NAME, id);
    await deleteDoc(restaurantDoc);
    return {id};
};

export const batchUpdateRestaurants = async (updates) => {
    const batch = writeBatch(db);
    updates.forEach(({id, data}) => {
        const restaurantDoc = doc(db, COLLECTION_NAME, id);
        batch.update(restaurantDoc, data);
    });
    await batch.commit();
    return updates.map(({id}) => ({id}));
}

const InitialRestaurants = [
    {
        id: "1",
        name: "Pasta Palace",
        category: "Italian",
        description: "Authentic Italian pasta dishes.",
        imageUrl: "https://example.com/pasta.jpg",
        rating: 4.5,
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        name: "Sushi Spot",
        category: "Japanese",
        description: "Fresh sushi and sashimi.",
        imageUrl: "https://example.com/sushi.jpg",
        rating: 4.7,
        createdAt: new Date().toISOString()
    },
    {
        id: "3",
        name: "Taco Town",
        category: "Mexican",
        description: "Delicious tacos and burritos.",
        imageUrl: "https://example.com/tacos.jpg",
        rating: 4.2,
        createdAt: new Date().toISOString()
    },
    {
        id: "4",
        name: "Curry Corner",
        category: "Indian",
        description: "Spicy and flavorful Indian curries.",
        imageUrl: "https://example.com/curry.jpg",
        rating: 4.6,
        createdAt: new Date().toISOString()
    }
    
];