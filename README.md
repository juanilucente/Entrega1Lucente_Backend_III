Entrega N°1 - Desarrollo Backend III

FUNCIONALIDADES PRINCIPALES

Router /api/mocks

Se creó el router mocks.router.js bajo la ruta base /api/mocks.

Endpoint /mockingpets

Se migró correctamente el endpoint /mockingpets al nuevo router.

Genera mascotas de ejemplo usando Faker.

Endpoint /mockingusers

Genera usuarios simulados (por defecto 50) con los siguientes datos:

password: encriptada con bcrypt (coder123)

role: aleatorio entre user y admin

pets: array vacío

formato tipo documento de Mongo (_id, email, etc.)

Endpoint /generateData

Recibe por POST los parámetros “users” y “pets”.

Genera e inserta en la base de datos la cantidad indicada de registros.

Permite verificar los registros insertados mediante los servicios:

GET /api/users

GET /api/pets

EJEMPLOS

GET /api/mocks/mockingusers?count=50
POST /api/mocks/generateData
Body:
{
"users": 20,
"pets": 15
}

TECNOLOGÍAS UTILIZADAS

Node.js
Express
MongoDB + Mongoose
Faker.js
bcrypt
dotenv
