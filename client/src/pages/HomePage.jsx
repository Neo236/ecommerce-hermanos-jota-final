
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList'; // Reutilizamos el mismo componente de UI

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/productos`)
            .then(res => {
                if (!res.ok) throw new Error('Respuesta de la red no fue exitosa');
                return res.json();
            })
            .then(data => {
                setProducts(data.slice(0, 4)); 
                
                setLoading(false);
            })
            .catch(err => {
                setError('No se pudieron cargar los productos.');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando productos destacados...</div>;
    if (error) return <div>Error: {error}</div>;

    // Le pasamos solo los productos destacados al ProductList
    return <ProductList products={products} />;
}

export default HomePage;