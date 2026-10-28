# Mueblería Hermanos Jota (Full Stack)

E-commerce de muebles artesanales desarrollado como proyecto para los Sprints 3 y 4 del curso Full Stack Developer (ITBA). La aplicación cuenta con una arquitectura desacoplada compuesta por un servidor REST API en Node.js/Express y un cliente dinámico construido en React.

## Integrantes

- Styezen, Danilo Juan Gabriel
- Alonso Chaves Santino Esteban
- Giménez Lucas Nicolás
- Gonzalo Ezequiel Meriño

## Descripción

Evolucionamos la plataforma hacia una solución Full Stack completa. El backend administra el catálogo de productos centralizado a través de endpoints RESTful con validaciones y manejo centralizado de errores, mientras que el frontend en React consume estos servicios de forma asíncrona para ofrecer una experiencia interactiva de navegación, filtrado y gestión del carrito de compras.

## Funcionalidades

- **Servidor API REST** estructurado de forma modular con rutas, controladores y middlewares.
- **Middleware de Logging** para el registro de solicitudes HTTP entrantes.
- **Manejo global de errores** con respuestas JSON estandarizadas para recursos no encontrados (404) y excepciones internas (500).
- **Consumo de API asíncrono** en el cliente mediante `fetch` y `async/await`.
- **Catálogo de productos dinámico** con soporte para búsqueda en tiempo real y filtrado por categorías.
- **Vista de detalle de producto** con carga de datos según el identificador de la URL.
- **Carrito de compras** con persistencia local mediante `localStorage`.
- **Diseño responsivo** adaptado a dispositivos móviles y de escritorio (Mobile-First).

## Tecnologías

- **Backend:** Node.js, Express.js, dotenv, CORS
- **Frontend:** React.js, JavaScript (ES6+), CSS3 (Variables, Flexbox, Grid)
- **Persistencia:** Archivos JSON (Backend) y `localStorage` (Cliente)
- **Control de Versiones:** Git y GitHub

## Estructura del proyecto

```
muebleria-jota/
├── backend/                           # Servidor REST API (Node.js/Express)
│   ├── data/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── app.js
│   └── package.json
│
├── client/                            # Aplicación Frontend SPA (React)
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── legacy/                            # Estructura cliente original HTML/JS (Sprints 1 y 2)
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