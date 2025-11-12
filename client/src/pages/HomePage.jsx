
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList'; // Reutilizamos el mismo componente de UI
import Loader from '../components/Loader';

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

    return (
        <>
            {/* 4. Añadimos el Hero Banner en la parte superior */}
            <Hero />

            {/* 5. Mostramos el Loader o los productos debajo */}
            {loading ? <Loader /> : <ProductList products={products} />}
        </>
    );
}

export default HomePage;