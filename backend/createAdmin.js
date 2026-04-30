const db = require("./models");

const Admin = db.Admin;

async function createAdmin() {
  await Admin.create({
    email: "admin@gmail.com",
    password: "Strong@12345", // plain password
    role: "admin"
  });

  console.log("Admin created successfully");
}

createAdmin();