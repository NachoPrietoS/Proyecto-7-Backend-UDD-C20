# 🎮 GAMERSHOP API - Backend

Construida con Node.js y Express, gestiona la lógica de negocio, autenticación de usuarios, persistencia de datos en MongoDB y la integración con la pasarela de pagos Stripe.

---

## 🛠️ Tecnologías y Herramientas

- **Node.js & Express:** Framework principal para el servidor.
- **MongoDB & Mongoose:** Base de datos NoSQL y modelado de esquemas.
- **JWT (JSON Web Tokens):** Manejo de sesiones y seguridad.
- **bcryptjs:** Encriptación de contraseñas.
- **Stripe:** Procesamiento de pagos en modo de pruebas.
- **CORS & Dotenv:** Gestión de seguridad de dominios y variables de entorno.

---

## 📂 Estructura del Servidor

El backend sigue una arquitectura limpia y modular:

- **`/src/models`**: Definición de esquemas de datos (Users, Games, Cart).
- **`/src/controllers`**: Lógica de las funciones que responden a cada ruta.
- **`/src/routes`**: Definición de los endpoints de la API divididos por dominios.
- **`/src/middleware`**: Funciones de protección de rutas (verificación de tokens).
- **`/src/config`**: Configuración de la conexión a la base de datos.

---

## ⚙️ Configuración e Instalación

1. **Clonar el repositorio:**
   bash
   git clone [https://github.com/nachoprietos/proyecto-7-backend-udd-c20.git](https://github.com/nachoprietos/proyecto-7-backend-udd-c20.git)
   cd proyecto-7-backend-udd-c20

2. **Instalar dependencias:**
npm install

3. **Variables de Entorno (.env):**
crea un archivo .env y configura los siguientes parámetros esenciales:
PORT=4000
MONGODB_URI=tu_conexion_mongo_atlas
SECRET_KEY_JWT=tu_llave_secreta
STRIPE_KEY=tu_sk_test_de_stripe
FRONTEND_URL=http://localhost:5173

4. **Iniciar servidor:**
npm run dev

🛣️ Endpoints Principales
Usuarios (/users)
POST /register: Registro de nuevos usuarios.

POST /login: Autenticación y entrega de token.

GET /verify-token: Validación de sesión activa.

PUT /update-user: Actualización de perfil (Ruta Protegida).

Carrito (/carts)
GET /get-cart: Obtiene el carrito del usuario.

PUT /add-to-cart: Añade o actualiza productos.

PUT /clear-cart: Vacía el carrito tras una compra exitosa.

Juegos (/games)
GET /get-all: Listado completo de productos.

GET /get-one/:id: Detalle de un producto específico.