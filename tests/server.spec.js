const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes devuelve status code 200 y array con 1 objeto o más", async () => {
        const response = await request(server).get("/cafes")
        const status = response.statusCode
        expect(status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    })
    
    it("codigo 404 al eliminar un café con id que no existe", async () => {
        const jwt = "token";
        const response = await request(server).delete('/cafes/123').set("Authorization", jwt)
        const status = response.statusCode
        expect(status).toBe(404)
    })

    it("Agrega un nuevo café y devuelve un código 201", async () => {
        const cafeNuevo =   { "id": 5, "nombre": "Flat White" }
        const response = await request(server).post("/cafes").send(cafeNuevo)
        const status = response.statusCode
        expect(status).toBe(201)
    })

    it("PUT /cafes devuelve status code 400 al actualizar con id que no existe", async () => {
        const actualizarCafe = { id: 3, nombre: "Mocaccino" }
        const response = await request(server).put("/cafes/2").send(actualizarCafe)
        const status = response.statusCode
        expect(status).toBe(400)
    })
});