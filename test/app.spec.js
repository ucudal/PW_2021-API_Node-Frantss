const supertest = require("supertest");
const assert = require("assert");
const cookie = require("cookie");
const app = require("../build/server");

describe("Endpoint /experience (GET)", function () {
  it("debería considerar CORS", function (done) {
    supertest(app)
      .get("/experiencia-laboral")
      .end(function (err, res) {
        if (err) throw done(err);
        assert.ok(
          res.headers["access-control-allow-origin"] !== undefined,
          "no está definido CORs para este endpoint"
        );
        done();
      });
  });

  it("debería contener más de 2 objetos", function (done) {
    supertest(app)
      .get("/experience")
      .expect(200)
      .end(function (err, res) {
        if (err) throw done(err);
        assert.ok(res.body.length > 2);
        done();
      });
  });

  it("debería contener objetos con la estructura esperada", function (done) {
    supertest(app)
      .get("/experience")
      .expect(200)
      .end(function (err, res) {
        if (err) throw done(err);
        res.body.forEach((exp, index) => {
          assert.ok(
            exp.place !== undefined,
            `el objeto en la posición ${index} no tiene la propiedad place`
          );
          assert.ok(
            exp.position !== undefined,
            `el objeto en la posición ${index} no tiene la propiedad position`
          );
          assert.ok(
            exp.description !== undefined,
            `el objeto en la posición ${index} no tiene la propiedad description`
          );
          assert.ok(
            exp.startedAt !== undefined,
            `el objeto en la posición ${index} no tiene la propiedad startedAt`
          );
        });
        done();
      });
  });
});

describe("Endpoint /submit-form (POST)", function () {
  it("debería considerar CORS", function (done) {
    supertest(app)
      .post("/submit-form")
      .send({ name: "Pepito Gonzalez" })
      .expect(200)
      .end(function (err, res) {
        if (err) throw done(err);
        assert.ok(
          res.headers["access-control-allow-origin"] !== undefined,
          "no está definido CORs para este endpoint"
        );
        done();
      });
  });

  it("debería retornar un texto como mensaje de éxito", function (done) {
    supertest(app)
      .post("/submit-form")
      .send({ name: "Pepito Gonzalez" })
      .expect(200)
      .end(function (err, res) {
        if (err) throw done(err);
        assert.ok(typeof res.text === "string");
        done();
      });
  });

  it("debería validar que el nombre de contacto no fue enviado", function (done) {
    supertest(app)
      .post("/submit-form")
      .expect(400)
      .end(function (err, res) {
        if (err) throw done(err);
        assert.equal(res.text, "El nombre del contacto debe ser enviado.");
        done();
      });
  });

  it("debería retornar la cookie PW_2021-CV_Contacto con el nombre del contacto", function (done) {
    supertest(app)
      .post("/submit-form")
      .send({ name: "Pepito Gonzalez" })
      .expect(200)
      .end(function (err, res) {
        if (err) throw done(err);
        var cookies = cookie.parse(res.headers["set-cookie"][0]);
        assert.equal(cookies["PW_2021-CV_Contacto"], "Pepito Gonzalez");
        done();
      });
  });
});

describe("Manejo de errores", function () {
  it("deberia retornar status 404 y un texto específico de error con endpoints inexistentes", function (done) {
    supertest(app)
      .post(`/${(Math.random() + 1).toString(36).substring(7)}`)
      .expect(404)
      .end(function (err, res) {
        if (err) throw done(err);
        assert.equal(res.text, "Endpoint inválido");
        done();
      });
  });
});
