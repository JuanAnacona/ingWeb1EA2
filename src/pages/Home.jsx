import { useEffect, useState } from "react";
import { getRestaurants } from "../services/firebaseRestaurantService";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurants();

      // 🌟 LOG para depuración
      console.log("🚀 Restaurantes cargados:", data);

      setRestaurants(data);
    };
    fetchData();
  }, []);

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

      <div className="container mx-auto pt-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
  src={restaurant.image || "https://via.placeholder.com/400"}
  alt={restaurant.name}
  className="w-full h-48 object-cover"
/>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-2">{restaurant.category}</p>
                <p className="text-gray-700">{restaurant.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
