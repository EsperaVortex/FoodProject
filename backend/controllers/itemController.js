import itemModel from '../models/itemModel.js'

export const createItem = async (req, res, next) => {
    try {
        const { name, description, category, price, rating, hearts, quantity = 1 } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const total = Number(price) * Number(quantity);

        const newItem = new itemModel({
            name,
            description,
            category,
            price: Number(price),
            rating: Number(rating),
            hearts: Number(hearts),
            imageUrl,
            total,
            quantity: Number(quantity)
        });

        const saved = await newItem.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(400).json({
            message: 'Item name already exists'
        });
    }
}

export const getItems = async (req, res, next) => {
    try {
        const items = await itemModel.find().sort({ createdAt: -1 });
        const host = `${req.protocol}://${req.get('host')}`;

        const withFullUrl = items.map(item => ({
            ...item.toObject(),
            imageUrl: item.imageUrl ? host + item.imageUrl : ''
        }));

        res.json(withFullUrl);
    } catch (error) {
        next(error);
    }
}

export const deleteItem = async (req, res, next) => {
    try {
        const removed = await itemModel.findByIdAndDelete(req.params.id);
        if (!removed) {
            return res.status(404).json({
                message: "Item not found"
            });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}