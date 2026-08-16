import express from "express";
import prisma from "./src/config/db.js";

const app = express();
const PORT = 8080;
app.use(express.json());

app.get("/health-check", (req, res) => {
  res.json({
    message: "all ok",
  });
});


app.get("/api/user/list", async (req, res) => {
  const users = await prisma.user.findMany();
  return res.send({
    userList: users,
  });
});


app.post("/api/user/create", async (req, res) => {
  const { email, name } = req.body;
  // Todo Validation
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return res.send({
    message: "User Created Successfully",
    user,
  });
});


app.get("/api/user/:id", async (req, res) => {
  const userid = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userid,
    },
  });

  return res.json({ user });
});


app.delete("/api/user/:id", async (req, res) => {
  const userid = Number(req.params.id);

  const user = await prisma.user.delete({
    where: {
      id: userid,
    },
  });

  return res.json({ message: "User Deleted Successfully", user });
});


app.post("/api/user/update/:id", async (req, res) => {
  const userid = Number(req.params.id);
  const { email, name } = req.body;

  const user = await prisma.user.update({
    where: {
      id: userid,
    },
    data: {
      email,
      name,
    },
  });

  return res.json({ message: "User Updated Successfully", user });
});


app.listen(PORT, () => {
  console.log("Server Running on the PORT", 8080);
});
