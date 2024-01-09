const server = require("../index");
const chaiHttp = require("chai-http");
const chai = require("chai");
const path = require("path");
const utils = require("../models/userSchema");
const routes = require("../routes/userRouter");
const { describe } = require("mocha");

chai.should();
chai.use(chaiHttp);

// Login user test case
describe("User Login API", () => {
  describe("POST /api/users", () => {
    it("IT should return login user details: ", (done) => {
      const data = {
        userEmail: "jayeshcholkartest@gmail.com",
        userPassword: "123456",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("message").eq("Login successfully");
          res.body.should.have.property("accessToken");
          done();
        });
    });

    // Invaild credentials test case
    it("It should return invalid credentials: ", (done) => {
      const data = {
        userEmail: "jayeshcholkartest@gmail.com",
        userPassword: "123457",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eq(false);
          res.body.should.have
            .property("message")
            .eq("Invalid email or password");
          done();
        });
    });

    //User not registered with email test case
    it("It should return user is not registerd: ", (done) => {
      const data = {
        userEmail: "jayeshcholkarCase@gmail.com",
        userPassword: "123456",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.be.a("object");
          res.body.should.have
            .property("message")
            .eq("User is not registered with this email");
          res.body.should.have.property("success").eq(false);
          done();
        });
    });
  });
});

// Conflict userEmail test case
describe("User sign up API", () => {
  describe("POST api/users", () => {
    it("It should return User is already registered with this email", (done) => {
      const data = {
        userName: "Jayesh Cholkar",
        userEmail: "jayeshcholkartest@gmail.com",
        userPassword: "123456",
        userCity: "Indore",
        userState: "MP",
        userPhone: 1234567890,
      };
      chai
        .request(server)
        .post("/user/signup")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("User is already registered with this email");
          res.body.should.have.property("success").eq(false);
          done();
        });
    });

    //User registerd success test case
    it("IT should return user registerd succesfully", (done) => {
        let random = Math.floor(Math.random() * 1000)
      const data = {
        userName: "Jayesh Cholkar",
        userEmail: `jayeshcholkartest${random}@gmail.com`,
        userPassword: "123456",
        userCity: "Indore",
        userState: "MP",
        userPhone: 1234567890,
      };
      chai
        .request(server)
        .post("/user/signup")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .field(data)
        .attach("profilePic", "blogPic-1683894227816-86119624.jpg")
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("User successfully registered");
          res.body.should.have.property("success").eq(true);
          done();
        });
    });
  });
});

// Email for reset password test case
describe("User email for reset password API", () => {
  describe("POST api/users", () => {
    it("It should send mail with reset password link: ", (done) => {
      const data = {
        userEmail: "Jaycholker@gmail.com",
      };
      chai
        .request(server)
        .post("/user/forgotpassword")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Reset password link sent successfully");
          res.body.should.have.property("success").eq(true);
          res.body.should.have.property("token");
          res.body.should.have.property("userId");
          done();
        });
    });

    //Email is not registered test case
    it("It should return Email is not registered: ", (done) => {
      const data = {
        userEmail: "Jaycholker66@gmail.com",
      };
      chai
        .request(server)
        .post("/user/forgotpassword")
        .send(data)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Email is not registered");
          res.body.should.have.property("success").eq(false);
          done();
        });
    });
  });
});

// Reset password test case
describe("User reset password API", () => {
  describe("POST api/users", () => {
    it("It should return password reset successfully: ", (done) => {
      const data = {
        newPassword: "654321",
        confirmPassword: "654321",
      };
      chai
        .request(server)
        .post(
          "/user/resetpassword/645a32c6622c159d22e8c9dd/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NWEzMmM2NjIyYzE1OWQyMmU4YzlkZCIsInVzZXJOYW1lIjoiSmF5ZXNoIGNob2xrYXIiLCJ1c2VyRW1haWwiOiJKYXljaG9sa2VyQGdtYWlsLmNvbSIsInVzZXJQYXNzd29yZCI6IiQyYiQxMCRkdkFYQUh1dldJOTlXdXNGNVBPMi51Q1JxdGsuYVRNVXBvWTkyZUlmajRMR2xvN2tJL0dGcSIsInVzZXJDaXR5IjoiSW5kb3JlIiwidXNlclN0YXRlIjoiTVAiLCJ1c2VyUGhvbmUiOjEyMzQ1Njc4OTAsInVzZXJSb2xlIjoidXNlciIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTA5VDExOjQ3OjE4LjkxOVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTE1VDEyOjMxOjI0Ljc2MloiLCJfX3YiOjB9LCJpYXQiOjE2ODQzMDg3MjQsImV4cCI6MTY4NDMwOTAyNH0.tjfu0xfmrnZU5PSaffOGRMy0XRpIejW1aft2U3-sW6Q"
        )
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Password reset successfully");
          res.body.should.have.property("success").eq(true);
          done();
        });
    });

    //Password not same test case
    it("It should return new password and confirm password not same: ", (done) => {
        const data = {
            newPassword: "654321",
            confirmPassword: "654322",
          };
      chai
        .request(server)
        .post("/user/resetpassword/645a32c6622c159d22e8c9dd/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0NWEzMmM2NjIyYzE1OWQyMmU4YzlkZCIsInVzZXJOYW1lIjoiSmF5ZXNoIGNob2xrYXIiLCJ1c2VyRW1haWwiOiJKYXljaG9sa2VyQGdtYWlsLmNvbSIsInVzZXJQYXNzd29yZCI6IiQyYiQxMCRkdkFYQUh1dldJOTlXdXNGNVBPMi51Q1JxdGsuYVRNVXBvWTkyZUlmajRMR2xvN2tJL0dGcSIsInVzZXJDaXR5IjoiSW5kb3JlIiwidXNlclN0YXRlIjoiTVAiLCJ1c2VyUGhvbmUiOjEyMzQ1Njc4OTAsInVzZXJSb2xlIjoidXNlciIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA1LTA5VDExOjQ3OjE4LjkxOVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA1LTE1VDEyOjMxOjI0Ljc2MloiLCJfX3YiOjB9LCJpYXQiOjE2ODQzMDg3MjQsImV4cCI6MTY4NDMwOTAyNH0.tjfu0xfmrnZU5PSaffOGRMy0XRpIejW1aft2U3-sW6Q")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("New Password and confirm password are not same");
          res.body.should.have.property("success").eq(false);
          done();
        });
    });
  });
});
