# Backend Tienda Online - Documentación

## 🚀 Instalación y Despliegue

### Requisitos previos

- Docker instalado  
- Docker Compose instalado  
- Node.js (solo para desarrollo local)

### Levantar los contenedores

```bash
docker compose -f docker-compose.yml up -d --build
```

### Entornos disponibles

| Entorno     | URL Base                                           |
|-------------|----------------------------------------------------|
| Desarrollo  | http://localhost:4000                              |
| Producción  | https://tienda-online.agencia1711.site/           |

---

## 📂 Estructura del Proyecto

```
/
├── node_modules/
├── src/
│   ├── controller/
│   │   ├── controller.productos.js
│   │   ├── controller.usuarios.js
│   │   └── controller.ventas.js
│   ├── model/
│   │   ├── model.productos.js
│   │   ├── model.usuarios.js
│   │   └── model.ventas.js
│   ├── view/
│   │   ├── view.productos.js
│   │   ├── view.usuarios.js
│   │   └── view.ventas.js
│   ├── bd.js
│   └── index.js
├── docker-compose.yml
├── Dockerfile
├── init.sql
├── package-lock.json
├── package.json
└── README.md
```

---

## 📚 Documentación de la API

### Configuración inicial

**Headers requeridos:**

```
Content-Type: application/json
```

---

### 1. Productos

| Método | Endpoint             | Descripción                |
|--------|----------------------|----------------------------|
| GET    | `/productos`         | Obtener todos los productos |
| GET    | `/productos/:id`     | Obtener un producto específico |
| POST   | `/productos`         | Crear nuevo producto        |
| PUT    | `/productos/:id`     | Actualizar producto         |
| DELETE | `/productos/:id`     | Eliminar producto           |

### GET /productos - Obtener todos los productos

**Request:**

- Método: GET
- URL: http://localhost:4000/productos
- Headers:
  - Content-Type: application/json

**Response exitoso (200):**
```json
[
  {
    "ID": 1,
    "producto": "Laptop",
    "descripcion": "Laptop de última generación",
    "cantidad": 10
  },
  {
    "ID": 2,
    "producto": "Smartphone",
    "descripcion": "Teléfono inteligente",
    "cantidad": 20
  }
]
```

### GET /productos/:id - Obtener un producto específico

**Request:**

- Método: GET
- URL: http://localhost:4000/productos/1
- Headers:
  - Content-Type: application/json

**Response exitoso (200):**
```json
{
  "ID": 1,
  "producto": "Laptop",
  "descripcion": "Laptop de última generación",
  "cantidad": 10
}
```

**Response si no existe (404):**
```json
{
  "message": "Producto no encontrado"
}
```

### POST /productos - Crear un nuevo producto

**Request:**

- Método: POST
- URL: http://localhost:4000/productos
- Headers:
  - Content-Type: application/json
- Body:
```json
{
  "producto": "Tablet",
  "descripcion": "Tablet de 10 pulgadas",
  "cantidad": 15
}
```

**Response exitoso (201):**
```json
{
  "id": 3,
  "producto": "Tablet",
  "descripcion": "Tablet de 10 pulgadas",
  "cantidad": 15
}
```

### PUT /productos/:id - Actualizar un producto

**Request:**

- Método: PUT
- URL: http://localhost:4000/productos/3
- Headers:
  - Content-Type: application/json
- Body:
```json
{
  "producto": "Tablet Pro",
  "descripcion": "Tablet de 10 pulgadas versión Pro",
  "cantidad": 12
}
```

**Response exitoso (200):**
```json
{
  "message": "Producto actualizado correctamente"
}
```

### DELETE /productos/:id - Eliminar un producto

**Request:**

- Método: DELETE
- URL: http://localhost:4000/productos/3
- Headers:
  - Content-Type: application/json

**Response exitoso (200):**
```json
{
  "message": "Producto eliminado correctamente"
}
```

---

### 2. Usuarios

| Método | Endpoint             | Descripción           |
|--------|----------------------|-----------------------|
| GET    | `/usuarios`          | Obtener todos los usuarios |
| POST   | `/usuarios/login`    | Autenticar usuario    |
| POST   | `/usuarios`          | Crear nuevo usuario   |

### GET /usuarios - Obtener todos los usuarios (sin contraseñas)

**Request:**

- Método: GET
- URL: http://localhost:4000/usuarios
- Headers:
  - Content-Type: application/json

**Response exitoso (200):**
```json
[
  {
    "ID": 1,
    "nombre": "Admin",
    "correo": "admin@tienda.com",
    "tipo": "admin"
  },
  {
    "ID": 2,
    "nombre": "Cliente",
    "correo": "cliente@tienda.com",
    "tipo": "cliente"
  }
]
```

### POST /usuarios/login - Autenticación de usuario

**Request:**

- Método: POST
- URL: http://localhost:4000/usuarios/login
- Headers:
  - Content-Type: application/json
- Body:
```json
{
  "correo": "admin@tienda.com",
  "contraseña": "admin123"
}
```

**Response exitoso (200):**
```json
{
  "ID": 1,
  "nombre": "Admin",
  "correo": "admin@tienda.com",
  "tipo": "admin"
}
```

**Response si credenciales inválidas (401):**
```json
{
  "message": "Credenciales inválidas"
}
```

### POST /usuarios - Crear un nuevo usuario

**Request:**

- Método: POST
- URL: http://localhost:4000/usuarios
- Headers:
  - Content-Type: application/json
- Body:
```json
{
  "nombre": "Nuevo Usuario",
  "correo": "nuevo@tienda.com",
  "contraseña": "nuevo123",
  "tipo": "cliente"
}
```

**Response exitoso (201):**
```json
{
  "id": 3,
  "nombre": "Nuevo Usuario",
  "correo": "nuevo@tienda.com",
  "tipo": "cliente"
}
```

---

### 3. Ventas

| Método | Endpoint   | Descripción             |
|--------|------------|-------------------------|
| GET    | `/ventas`  | Obtener todas las ventas |
| POST   | `/ventas`  | Registrar nueva venta    |

### GET /ventas - Obtener todas las ventas

**Request:**

- Método: GET
- URL: http://localhost:4000/ventas
- Headers:
  - Content-Type: application/json

**Response exitoso (200):**
```json
[
  {
    "ID": 1,
    "fecha": "2023-10-25T12:34:56.000Z",
    "producto": 1,
    "cantidad": 2
  },
  {
    "ID": 2,
    "fecha": "2023-10-25T13:45:23.000Z",
    "producto": 2,
    "cantidad": 3
  }
]
```

### POST /ventas - Registrar una nueva venta

**Request:**

- Método: POST
- URL: http://localhost:4000/ventas
- Headers:
  - Content-Type: application/json
- Body:
```json
{
  "producto": 1,
  "cantidad": 1
}
```

**Response exitoso (201):**
```json
{
  "id": 3,
  "fecha": "2023-10-25T15:30:45.000Z",
  "producto": 1,
  "cantidad": 1
}
```

---

## 🛠 Comandos útiles

| Comando                                      | Descripción                            |
|---------------------------------------------|----------------------------------------|
| `docker compose up -d --build`              | Construir y levantar contenedores      |
| `docker compose down`                       | Detener y eliminar contenedores        |
| `docker compose logs -f`                    | Ver logs en tiempo real                |
| `docker exec -it tienda_online_backend bash`| Acceder al contenedor del backend      |

---

## 🔍 Pruebas de API

Puedes probar los endpoints usando:

- **ThunderClient** (extensión de VSCode)  
- **Postman**  
- **cURL**

**Ejemplo con cURL:**

```bash
curl -X GET http://localhost:4000/productos
curl -X GET http://tienda-online.agencia1711.site/productos
```

---

## 📝 Notas importantes

- La base de datos se inicializa automáticamente con datos de prueba  
- El puerto `4000` está mapeado para desarrollo local  
- En producción se usa el dominio `tienda-online.agencia1711.site`  
- Todos los endpoints devuelven respuestas en formato **JSON**