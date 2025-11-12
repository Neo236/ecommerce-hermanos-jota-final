# E-commerce Hermanos Jota - Sprints 5 & 6 (MERN)

Proyecto final para los Sprints 5 y 6 de la Escuela de Innovación ITBA. Este proyecto transforma una aplicación React con una API estática en una aplicación web MERN full-stack con persistencia de datos.

Se implementó una API CRUD completa con Express y MongoDB y se refactorizó el frontend de React para usar React Router DOM para navegación dinámica.

## 🚀 Enlaces de Despliegue

* **Frontend (React en Vercel):** `https://ecommerce-hermanos-jota-mern.vercel.app`
* **Backend (API en Render):** `https://ecommerce-hermanos-jota-api.onrender.com/api/productos`

---

## 📋 Funcionalidades Implementadas

### Backend (API)
* Conexión a una base de datos **MongoDB Atlas**.
* Variables de entorno (`.env`) para la cadena de conexión.
* Modelo de **Mongoose** (`Product.js`) para definir el esquema de datos.
* API RESTful con **CRUD completo** para productos:
    * `GET /api/productos` (Leer todos)
    * `GET /api/productos/:id` (Leer uno)
    * `POST /api/productos` (Crear uno)
    * `PUT /api/productos/:id` (Actualizar uno)
    * `DELETE /api/productos/:id` (Eliminar uno)

### Frontend (React)
* Integración de **React Router DOM** para la navegación.
* Página de Catálogo (`/productos`) que consume la API (`GET`).
* Página de Inicio (`/`) que muestra solo productos destacados.
* Página de Detalle Dinámica (`/productos/:id`) que usa `useParams` para `fetch` de un solo producto.
* Formulario de Creación de Producto (`/admin/crear-producto`) que hace `POST` a la API.
* Funcionalidad de "Eliminar" en la página de detalle que hace `DELETE` a la API.
* Uso de `useNavigate` para redirección programática después de crear o eliminar.

---

## 🛠️ Cómo ejecutar localmente

### 1. Backend

```bash
# Desde la raíz del proyecto
cd backend
npm install

# Crea un archivo .env en /backend con la siguiente variable:
# MONGO_URL=tu_cadena_de_conexion_de_mongodb_atlas

npm start
```
### 2. Frontend

```bash
# Desde la raíz del proyecto
cd client
npm install

# Crea un archivo .env en /client con la siguiente variable:
# VITE_API_URL=http://localhost:3001

npm run dev
```