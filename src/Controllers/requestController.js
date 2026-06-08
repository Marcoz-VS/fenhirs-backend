import { Request } from "../Models/Request.js";
import { Product } from "../Models/Product.js";
import { User } from "../Models/User.js";

export async function createRequest(req, res) {
    try {
        const { productId, observation } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                error: "Produto não encontrado"
            });
        }

        const request = await Request.create({
            clientId: req.user.id,
            productId,
            observation,
        });

        return res.status(201).json(request);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function getMyRequests(req, res) {
    try {

        const requests = await Request.findAll({
            where: {
                clientId: req.user.id
            },
            include: [
                Product
            ]
        });

        return res.json(requests);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function getAllRequests(req, res) {
    try {
        const requests = await Request.findAll({
            include: [
                Product,
                {
                    model: User,
                    as: "client",
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "rg",
                        "cac"
                    ]
                }
            ]
        });

        return res.json(requests);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function updateRequestStatus(req, res) {
    try {
        const { status, operatorMessage } = req.body;

        const request = await Request.findByPk(
            req.params.id
        );

        if (!request) {
            return res.status(404).json({
                error: "Solicitação não encontrada"
            });
        }

        if (request.status !== "PENDING") {
            return res.status(400).json({
                error: "Solicitação já finalizada"
            });
        }

        request.status = status;

        request.operatorMessage = operatorMessage;

        request.operatorId = req.user.id;

        await request.save();

        return res.json(request);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}