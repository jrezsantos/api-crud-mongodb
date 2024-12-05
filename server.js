import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Rota para criar usuário
app.post("/usuarios", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// Rota para listar usuários
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
});

// Rota para atualizar usuário
app.put("/usuarios/:id", async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

// Rota para deletar usuário
app.delete("/usuarios/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
});

// Porta definida pela variável de ambiente PORT ou 3000 como padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
