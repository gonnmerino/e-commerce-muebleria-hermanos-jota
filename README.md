# Mueblería Hermanos Jota

E-commerce de muebles artesanales desarrollado como proyecto integrador de los Sprints 1 y 2 del curso Full Stack Developer (ITBA Educación Ejecutiva). El sitio funciona íntegramente del lado del cliente, sin backend, simulando una experiencia de compra completa mediante JavaScript y `localStorage`.

## Integrantes

- Styezen, Danilo Juan Gabriel
- Alonso Chaves Santino Esteban
- Giménez Lucas Nicolás
- Gonzalo Ezequiel Meriño

## Descripción

Construimos la fachada completa de una mueblería online: desde la página de inicio con productos destacados, pasando por un catálogo filtrable y el detalle de cada mueble, hasta un carrito de compras persistente y un formulario de contacto con validación. Todo el contenido se renderiza dinámicamente desde un array de objetos en JavaScript.

## Funcionalidades

- **Inicio** con hero banner y productos destacados cargados de forma asíncrona (simulación con `Promise` + `setTimeout`).
- **Catálogo** con búsqueda en tiempo real y filtro por categoría.
- **Detalle de producto** con especificaciones técnicas, galería y botón para agregar al carrito.
- **Carrito de compras** persistente en `localStorage`, con control de cantidades, eliminación de ítems y vaciado total.
- **Formulario de contacto** con validación del lado del cliente y feedback visual al usuario.
- **Diseño 100% responsivo** con enfoque Mobile-First.

## Tecnologías

- HTML5 semántico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 (variables en `:root`, Flexbox, Grid, Media Queries)
- JavaScript vanilla (DOM, eventos, arrays de objetos, `localStorage`, Promises, `async/await`)
- Git y GitHub para control de versiones

## Estructura del proyecto

```
muebleria-jota/
├── index.html
├── catalog.html
├── product.html
├── cart.html
├── contact.html
├── README.md
├── styles/
│   └── global.css
├── data/
│   └── products.js
├── scripts/
│   ├── utils.js
│   ├── script.js
│   ├── catalog.js
│   ├── product.js
│   ├── cart.js
│   └── contact.js
└── assets/
    ├── fonts/
    └── images/
```

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/gonnmerino/e-commerce-muebleria-hermanos-jota/
```

2. Abrir `index.html` directamente en el navegador, o usar la extensión **Live Server** de VS Code para trabajar con recarga automática.

## Deploy

El sitio está publicado en:

## Decisiones técnicas

- Centralizamos los datos de los productos en `data/products.js` para evitar duplicar el catálogo entre scripts.
- Las funciones compartidas (manejo del carrito, formato de moneda, año del footer) viven en `scripts/utils.js` y se importan en cada página que las necesita.
- Usamos delegación de eventos en el carrito para manejar botones de incrementar, decrementar y eliminar con un solo listener.
- La carga de productos destacados simula una petición asíncrona con `Promise` y `setTimeout`, cumpliendo con el requisito de usar `async/await`.
- El carrito se persiste en `localStorage` para que no se pierda al recargar la página.
