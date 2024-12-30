# Sushi Chatbot

Este proyecto consiste en una aplicación de chat simple que utiliza un backend desarrollado con Node.js y un frontend creado con React.

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- **Node.js** (v16 o superior)
- **npm** (v8 o superior)
- **MongoDB** (instancia local o en la nube)
- **React** (v18 o superior)

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

- `backend/`: Contiene el servidor Node.js y los scripts relacionados.
- `frontend/`: Contiene el frontend construido con React.

---

## Configuración del Backend

1. **Instalar Dependencias**  
   Ve a la carpeta del backend e instala las dependencias:

   ```bash
   cd backend
   npm install

   ```

2. **Sembrar la base de datos**
   Ejecuta el archivo `seed.js` estando en el directorio `/backend` con el comando:
   ```bash
   node seed.js
   ```

para llenar la base de datos con los productos de sushi. Notaras que se ha completado con exito cuando diga `Base de datos poblada con éxito`

3. Recuerda configurar tus variables de entorno en el archivo `.env`. Este debe tener el puerto en el que va a correr el servidor y el URI de tu base de datos en MongoDB.
   Archivo de ejemplo:

```.env
PORT=5000
MONGO_URI="mongodb+srv://username:password@cluster.ab1cd.mongodb.net/"
```

4. **Iniciar el servidor**
   Inicia el servidor backend con uno de los siguientes comandos:

Usando `node`

```bash
node server.js
```

Usando `nodemon` (recomendado para desarrollo):

```bash
nodemon server.js
```

---

## Configuración del frontend

1. Ve a la carpeta `/frontend` en instala las dependencias:

```bash
cd frontend
npm install
```

2. Inicia el servidor de desarrollo ejecutando el siguiente comando:

```bash
npm run dev
```

---

## Uso de la aplicación

1. **Asegurate de que todo el proyecto esté corriendo**:

Ambas carpetas tienen que estar corriendo con sus respectivos comandos que mencionamos anteriormente:

- frontend: `npm run dev`
- backend: `node server.js` o `nodemon server.js`

El proyecto frontend va a correr en `https://localhost:5173`

---

## Enpoints

### /api/menu

A traves de este endpoint se obtiene el menu del restaurante a través del chat haciendole saber al bot que se quiere ordenar comida o solo ver el menú. Por ejemplo diciéndole "quiero el menú", "quiero pedir", "ver la carta", "ordenar".

### /api/chatbot

Este endpoint proporciona información del restaurante a través del chatbot, incluyendo detalles sobre horarios, ubicación, medios de pago. Algunos ejemplos:

- dame información del restaurante
- cuales son los horarios?
- como se puede pagar?
- ubicacion

De todas maneras, si el bot no logra comprender tu pregunta, te dirá "Lo siento, no entendí tu mensaje. Pero te dejo algunas opciones para que puedas continuar." y te dará 4 opciones de acciones que puedes realizar para seguir interactuando.

### /api/order

Este endpoint maneja las órdenes o pedidos realizados por los usuarios, desde su creación, la modificación y el registro de los epdidos en la base de datos.

### /api/reservations

Este endpoint gestiona las reservas realizadas por los usuarios, se puede reservar mediante los botones que presenta el bot en algunos de los mensajes o escribiendo:

- quiero reservar
- reservar
- mesa
- quiero una mesa
# sushi-chatbot
