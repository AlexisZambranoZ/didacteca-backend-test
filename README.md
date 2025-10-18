# didacteca-backend-test

API desarrollada con **Node.js**, **Express** y **MongoDB**.  
Permite gestionar usuarios y sus libros asociados.

**Base URL:** `http://localhost:3001`

**ejemplo:**  `http://localhost:3001/users/`

---

# Documentación API – Usuarios y Libros

## Usuarios

| Método | Endpoint       | Descripción                           | Body (JSON) |
|--------|----------------|---------------------------------------|-------------|
| GET    | `/users`       | Listar todos los usuarios             | N/A         |
| GET    | `/users/:id`   | Obtener un usuario por ID             | N/A         |
| POST   | `/users`       | Crear un nuevo usuario                | `{ "name": "Nombre del usuario", "email": "correo@usuario.com" }` |
| PUT    | `/users/:id`   | Actualizar un usuario existente       | `{ "name": "Nuevo nombre", "email": "nuevo.email@usuario.com" }` |
| DELETE | `/users/:id`   | Eliminar un usuario y sus libros      | N/A         |

**Notas:**
- La creación y actualización valida que el **email sea único** y tenga formato correcto.
- Al eliminar un usuario, se eliminan automáticamente todos los libros asociados.

## Libros

| Método | Endpoint               | Descripción                                   | Body (JSON) |
|--------|------------------------|-----------------------------------------------|-------------|
| GET    | `/books/:userId`       | Listar todos los libros de un usuario        | N/A         |
| GET    | `/books/book/:bookId`  | Obtener un libro por su ID                    | N/A         |
| GET    | `/books`               | Listar todos los libros                       | N/A         |
| POST   | `/books`               | Crear un nuevo libro y asociarlo a un usuario | `{ "title": "Título del libro", "author": "Nombre del autor", "userId": "ID del usuario" }` |
| PUT    | `/books/:id`           | Actualizar datos de un libro                  | `{ "title": "Nuevo título", "author": "Nuevo autor", "userId": "ID del usuario" }` |
| DELETE | `/books/:id`           | Eliminar un libro                             | N/A         |

**Notas:**
- La creación de un libro valida que **el usuario no tenga títulos duplicados** (insensible a mayúsculas).
- Al actualizar un libro, si se incluye `userId`, el libro puede reasignarse a otro usuario, pero solo si **no está vinculado a otro usuario**.
- Todos los endpoints devuelven JSON con los datos actualizados o eliminados.


---

## Configuración y ejecución

1. **Instalación y configuración completa**

   - Instalar dependencias del proyecto:

     ```bash
     npm install
     ```

   - Crear un archivo `.env` en la raíz del proyecto con la configuración del puerto y la cadena de conexión a MongoDB  
     (por defecto, el puerto es **3001** y la conexión se puede obtener desde **MongoDB Compass**).

     **Ejemplo de configuración del archivo `.env`:**

     ```env
     MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/didacteca?retryWrites=true&w=majority
     PORT=3001
     ```

   - Ejecutar el servidor con el siguiente comando:

     ```bash
     npm run start
     ```

   - Si la conexión es correcta, deberías ver en la consola algo similar a:

     ```
     Servidor escuchando en el puerto 3001
     Conexion a mongoDB realizada
     ```

   - El servidor quedará disponible en:  
     **`http://localhost:3001`**

   - Para realizar pruebas, puedes usar herramientas como **Postman** , utilizando los endpoints definidos anteriormente.

---

## RECOMENDACION - Colección de pruebas de Postman

Esta carpeta contiene la colección de Postman para probar todos los endpoints de la API.

### Cómo usarla

1. Abre **Postman**.
2. Haz clic en **Import → File**.
3. Selecciona el archivo `ApiTestCollection.json` dentro de la carpeta `docs`.
4. La colección se importará y podrás ejecutar todos los endpoints de prueba.