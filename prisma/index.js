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

app.post("/api/users", async (req, res) => {
  const { email, name } = req.body;
  // Todo Validation
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return res.json({ user });
});


app.listen(PORT, () => {
  console.log("Server Running on the PORT", 8080);
});
