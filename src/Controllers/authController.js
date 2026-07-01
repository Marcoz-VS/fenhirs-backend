import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../Models/index.js";
import { registerSchema } from "../Schemas/registerSchema.js";

export async function register(req, res) {
    try {
        const {
            name,
            email,
            password,
            rg,
            cac
        } = req.body;

        // Validar dados com schema
        const validation = registerSchema.safeParse({
            name,
            email,
            password,
            rg,
            cac
        });

        if (!validation.success) {
            // Zod armazena os erros em .issues
            const details = validation.error.issues.map(err => ({
                field: err.path[0] || 'unknown',
                message: err.message
            }));
            
            return res.status(400).json({
                error: "Dados de registro inválidos",
                details: details
            });
        }

        const userExists = await User.findOne({
            where: { email }
        });

        if (userExists) {
            return res.status(400).json({
                error: "Email já cadastrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Limpar RG removendo pontos e traços antes de salvar
        const cleanedRg = rg.replace(/[.\-]/g, "");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            rg: cleanedRg,
            cac,
        });

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        // ✅ Mensagem idêntica para ambos os casos
        if (!user) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        // ✅ Mesma mensagem aqui também
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Email ou senha inválidos"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            rg: user.rg,
            cac: user.cac,
            active: user.active,
        };

        return res.status(200).json({
            message: "Usuário logado com sucesso",
            user: userWithoutPassword,
            token,
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
