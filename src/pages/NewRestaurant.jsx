// src/pages/NewRestaurant.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CATEGORIES = [
  "Comida Rápida",
  "Italiana",
  "Mexicana",
  "China",
  "Japonesa",
  "Vegetariana",
  "Vegana",
  "Postres",
];
const PRICE_RANGES = [
  "$",
  "$$",
  "$$$",
  "$$$$",
];

function NewRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    website: "",
    category: CATEGORIES[0],
    priceRange: PRICE_RANGES[0], 
    rating: 0,
    image: "",
    openingHours: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = [];
    if (!formData.name) errors.push("El nombre es obligatorio.");
    if (!formData.description) errors.push("La descripción es obligatoria.");
    if (!formData.address) errors.push("La dirección es obligatoria.");
    if (!formData.phone && !/^\d{10}$/.test(formData.phone)) errors.push("El teléfono es obligatorio.");
    if (!formData.website) errors.push("El sitio web es obligatorio.");
    if (!formData.openingHours) errors.push("El horario de apertura es obligatorio.");
    if (!imageFile) errors.push("La imagen es obligatoria.");
    setError(errors);
    return errors.length === 0;
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Subir imagen a Firebase Storage
      const imageRef = ref(storage, `restaurant-images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Guardar datos en Firestore con la URL de la imagen
      await addDoc(collection(db, "restaurants"), {
        ...formData,
        image: imageUrl,
        createdAt: new Date(),
      });

      alert("Restaurante guardado con éxito.");
      navigate("/");

    } catch (error) {
      console.error("Error al guardar restaurante:", error);
      setError("Error al guardar restaurante.");
    }
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <nav className="bg-gray-900 text-white p-4">
        <div className="container max-w-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">Directory</h1>
          <div className="space-x-4">
            <Link to="/">Restorant</Link>
            <Link to="/search">Search</Link>
            <Link to="/new">New</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-left mb-6">Agregar Nuevo Restaurante</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {error.length > 0 && (
            <div className="bg-red-100 text-red-700 p-2 rounded">
              {error.map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          )}

          <div>
            <label className="block font-semibold mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Dirección</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Sitio Web</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Rango de Precio</label>
            <select
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              {PRICE_RANGES.map((pr) => (
                <option key={pr} value={pr}>{pr}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Calificación</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Horario de Apertura</label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white py-3 px-6 rounded-lg hover:bg-green-900 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRestaurant;
