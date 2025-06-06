import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRestaurants } from "../services/firebaseRestaurantService";

function Search() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
      setFiltered(data);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = restaurants.filter(r =>
      r.name.toLowerCase().includes(term)
    );
    setFiltered(results);
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
        <h2 className="text-3xl font-bold text-left mb-6">Buscar Restaurantes</h2>
        <div className="flex justify-left mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((resto) => (
            <div key={resto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={resto.image || "https://via.placeholder.com/400"} alt={resto.name} />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{resto.name}</h3>
                <p className="text-gray-600 mb-2">{resto.description}</p>
                <p className="text-gray-700"><strong>{resto.address}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
