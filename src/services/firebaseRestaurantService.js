import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  FieldValue
} from "firebase/firestore";

import { db } from "./firebase";

const COLLECTION_NAME = "restaurants";

export const getRestaurants = async () => {
  const restaurantsCollection = collection(db, COLLECTION_NAME);
  const q = query(restaurantsCollection, orderBy("name"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return [];
  }
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getRestaurantsById = async (id) => {
  const restaurantDoc = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(restaurantDoc);
  if (!docSnap.exists()) {
    throw new Error(`Restaurant with ID ${id} not found`);
  }
  return { id: docSnap.id, ...docSnap.data() };
};

export const getRestaurantsByCategory = async (name) => {
  const restaurantsCollection = collection(db, COLLECTION_NAME);
  const q = query(restaurantsCollection, where("category", "==", name));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return [];
  }
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addRestaurant = async (restaurant) => {
  const restaurantsCollection = collection(db, COLLECTION_NAME);
  const newRestaurant = {
    ...restaurant,
    createdAt: new Date().toISOString()
  };
  const docRef = await addDoc(restaurantsCollection, newRestaurant);
  return { id: docRef.id, ...newRestaurant };
};

export const updateRestaurant = async (id, updatedData) => {
  if (!id || !updatedData) {
    throw new Error("ID and updated data are required");
  }
  const restaurantDoc = doc(db, COLLECTION_NAME, id);
  await updateDoc(restaurantDoc, updatedData);
  return { id, ...updatedData };
};

export const deleteRestaurant = async (id) => {
  if (!id) {
    throw new Error("ID is required for deletion");
  }
  const restaurantDoc = doc(db, COLLECTION_NAME, id);
  await deleteDoc(restaurantDoc);
  return { id };
};

export const batchUpdateRestaurants = async (updates) => {
  const batch = writeBatch(db);
  updates.forEach(({ id, data }) => {
    const restaurantDoc = doc(db, COLLECTION_NAME, id);
    batch.update(restaurantDoc, data);
  });
  await batch.commit();
  return updates.map(({ id }) => ({ id }));
};

export const migrateImageField = async () => {
  const restaurantsCollection = collection(db, COLLECTION_NAME);
  const querySnapshot = await getDocs(restaurantsCollection);

  const updates = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.image && !data.imageUrl) {
      updates.push({
        id: docSnap.id,
        data: {
          imageUrl: data.image,
          image: FieldValue.delete()
        }
      });
    }
  });

  if (updates.length > 0) {
    await batchUpdateRestaurants(updates);
    console.log(`${updates.length} restaurantes actualizados.`);
  } else {
    console.log("No se encontraron documentos para actualizar.");
  }
};
