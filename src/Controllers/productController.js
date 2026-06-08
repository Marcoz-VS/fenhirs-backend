import { Product } from "../Models/Product.js";
import { productSchema } from "../Schemas/productSchema.js";

export async function createProduct(req, res) {
    try {
        const validatedData = productSchema.parse(req.body);

        const product = await Product.create(validatedData);

        return res.status(201).json(product);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function getProducts(req, res) {
    try {
        const products = await Product.findAll({
            where: {
                active: true
            }
        });

        return res.json(products);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findByPk(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                error: "Produto não encontrado"
            });
        }

        return res.json(product);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function updateProduct(req, res) {
    try {
        const product = await Product.findByPk(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                error: "Produto não encontrado"
            });
        }

        await product.update(req.body);

        return res.json(product);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

export async function deleteProduct(req, res) {
    try {
        const product = await Product.findByPk(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                error: "Produto não encontrado"
            });
        }

        product.active = false;

        await product.save();

        return res.json({
            message: "Produto removido"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}