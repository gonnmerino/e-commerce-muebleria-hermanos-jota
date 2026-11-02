# Mueblería Hermanos Jota (Full Stack)

E-commerce de muebles artesanales desarrollado como proyecto para los Sprints 3 y 4 del curso Full Stack Developer (ITBA). La aplicación cuenta con una arquitectura desacoplada compuesta por un servidor REST API en Node.js/Express y un cliente dinámico construido en React.

## Integrantes

- Styezen, Danilo Juan Gabriel
- Alonso Chaves Santino Esteban
- Giménez Lucas Nicolás
- Gonzalo Ezequiel Meriño

## Descripción

Evolucionamos la plataforma hacia una solución Full Stack completa. El backend administra el catálogo de productos centralizado a través de endpoints RESTful con validaciones y manejo centralizado de errores, mientras que el frontend en React consume estos servicios de forma asíncrona para ofrecer una experiencia interactiva de navegación y gestión del carrito de compras.

## Funcionalidades

- **Servidor API REST** estructurado de forma modular con rutas, controladores y middlewares.
- **Middleware de Logging** para el registro de solicitudes HTTP entrantes.
- **Manejo global de errores** con respuestas JSON estandarizadas: `CastError` de Mongoose → 404, `ValidationError` → 400 y errores internos → 500. Express 5 encadena las promesas rechazadas directamente al handler de errores.
- **Consumo de API asíncrono** en el cliente mediante `fetch` y `async/await`.
- **Catálogo de productos dinámico** con vistas de listado y detalle según el identificador de la URL.
- **ABM de productos** (crear, editar, eliminar) desde el panel de administración.
- **Carrito de compras** con manejo de cantidades y eliminación de ítems.
- **Formulario de contacto** con validación de campos y confirmación de envío.
- **Diseño responsivo** adaptado a dispositivos móviles y de escritorio (Mobile-First).

## Tecnologías

- **Backend:** Node.js, Express.js 5, Mongoose, CORS
- **Frontend:** React.js, React Router, Vite, JavaScript (ES6+), CSS3 (Variables, Flexbox, Grid)
- **Persistencia:** MongoDB (Backend)
- **Control de Versiones:** Git y GitHub

## Despliegue

- **Frontend:** [muebleria-hermanos-jota-shop.vercel.app](https://muebleria-hermanos-jota-shop.vercel.app) — desplegado en Vercel con reescrituras configuradas en `client/vercel.json` para que las rutas de React funcionen al refrescar.
- **Backend:** API desplegada en [Render](https://render.com) — la variable `VITE_API_URL` del cliente apunta a la URL pública de este servicio.
- **Legacy Project:** [muebleria-hermanos-jota-legacy](https://e-commerce-muebleria-hermanos-jota-peach.vercel.app/) — sitio web legacy de los sprint 1, 2, 3 y 4.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api` | Información de la API y endpoints disponibles |
| GET | `/api/products` | Listado completo de productos |
| GET | `/api/products/:id` | Producto específico por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/:id` | Actualizar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

## Variables de entorno

**Backend** — copiar `backend/.env.example` a `backend/.env`:

```
PORT=3000
MONGO_URI=<cadena de conexión de MongoDB>
```

**Frontend** — crear `client/.env`:

```
VITE_API_URL=http://localhost:3000/api
```

## Ejecución local

```bash
# 1. Backend (puerto 3000)
cd backend
npm install
npm run seed      # opcional: carga el catálogo inicial
npm run dev

# 2. Frontend (puerto 5173)
cd client
npm install
npm run dev
```

## Estructura del proyecto

```
muebleria-jota/                        # Web: https://muebleria-hermanos-jota-shop.vercel.app
├── backend/                           # Servidor REST API (Node.js/Express)
│   ├── controllers/                   # Lógica de los endpoints
│   ├── data/                          # Datos de ejemplo para el seed
│   ├── middlewares/                   # Logger y middlewares propios
│   ├── models/                        # Schemas de Mongoose
│   ├── routes/                        # Definición de rutas
│   ├── app.js                         # Express + manejo global de errores
│   ├── db.js                          # Conexión a MongoDB
│   ├── seed.js                        # Carga inicial del catálogo
│   └── package.json
│
├── client/                            # SPA Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/                    # Imágenes, fuentes
│   │   ├── components/                # Navbar, ProductList, ProductCard, etc.
│   │   ├── hooks/                     # useProducts, useForm
│   │   ├── pages/                     # Home, Admin, ProductFormPage
│   │   ├── services/                  # Capa de consumo de la API
│   │   ├── utils/                     # Helpers (formatPrice)
│   │   ├── App.jsx                    # Rutas y estado del carrito
│   │   ├── index.css                  # Estilos globales
│   │   └── main.jsx                   # Punto de entrada
│   ├── index.html
│   └── package.json
│
├── legacy/                    # Estructura cliente original HTML/JS (Sprints 1 y 2)
│   │                          # Web Legacy: https://e-commerce-muebleria-hermanos-jota-peach.vercel.app
│   ├── assets/
│   ├── data/
│   ├── scripts/
│   ├── styles/
│   ├── cart.html
│   ├── catalog.html
│   ├── contact.html
│   ├── index.html
│   └── product.html
│
└── README.md
```
