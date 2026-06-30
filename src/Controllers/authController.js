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

        console.log('📝 Dados recebidos:', { name, email, password, rg, cac });

        // Validar dados com schema
        const validation = registerSchema.safeParse({
            name,
            email,
            password,
            rg,
            cac
        });

        console.log('🔍 Resultado da validação:', {
            success: validation.success,
            error: validation.error,
            errorType: validation.error?.constructor?.name,
            errorKeys: Object.keys(validation.error || {}),
        });

        if (!validation.success) {
            console.log('❌ Validação falhou');
            console.log('Erro completo:', JSON.stringify(validation.error, null, 2));
            
            // Tenta acessar os erros de várias formas
            const errorArray = validation.error?.errors || validation.error?.issues || [];
            console.log('Array de erros:', errorArray);
            
            const details = errorArray.map(err => ({
                field: err.path?.[0] || err.field || 'unknown',
                message: err.message
            }));
            
            console.log('✅ Detalhes formatados:', details);
            
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
        console.error('❌ Register error:', error);
        console.error('Stack:', error.stack);
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

        if (!user) {
            return res.status(401).json({
                error: "Usuário inválido"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Senha inválida"
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
