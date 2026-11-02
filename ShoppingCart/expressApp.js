
import express from "express";

const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Shopping cart array
let cart = [
    {
        id: 1,
        productName: "Wireless Mouse",
        price: 799,
        quantity: 2,
        category: "Electronics"
    },
    {
        id: 2,
        productName: "Keyboard",
        price: 1200,
        quantity: 1,
        category: "Electronics"
    },
    {
        id: 3,
        productName: "Notebook",
        price: 100,
        quantity: 5,
        category: "Stationery"
    }
];

// Validate product details
function isValidProduct(product, requireId = false) {
    if (!product || typeof product !== "object" || Array.isArray(product)) {
        return false;
    }

    if (
        requireId &&
        (!Number.isInteger(product.id) || product.id <= 0)
    ) {
        return false;
    }

    if (
        typeof product.productName !== "string" ||
        !product.productName.trim() ||
        typeof product.price !== "number" ||
        !Number.isFinite(product.price) ||
        product.price < 0 ||
        !Number.isInteger(product.quantity) ||
        product.quantity <= 0 ||
        (product.category !== undefined &&
            typeof product.category !== "string")
    ) {
        return false;
    }

    return true;
}

// B2: GET all cart items
app.get("/cart", (req, res) => {
    res.status(200).json(cart);
});

// GET cart item by ID
app.get("/cart/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const product = cart.find(item => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json({
        ...product,
        totalPrice: product.price * product.quantity
    });

     // Calculate total price
    const totalPrice = product.price * product.quantity;

    res.status(200).json({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        totalPrice: totalPrice
    });
});

// POST: Add a new product
app.post("/cart", (req, res) => {
    const product = req.body;

    if (!isValidProduct(product, true)) {
        return res.status(400).json({
            message: "Invalid product details"
        });
    }

    const exists = cart.some(item => item.id === product.id);

    if (exists) {
        return res.status(409).json({
            message: "Product ID already exists"
        });
    }

    const newProduct = {
        id: product.id,
        productName: product.productName.trim(),
        price: product.price,
        quantity: product.quantity,
        category: product.category || "General"
    };

    cart.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// PUT: Update product
app.put("/cart/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const index = cart.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (!isValidProduct(req.body)) {
        return res.status(400).json({
            message: "Invalid product details"
        });
    }

    cart[index] = {
        ...cart[index],
        productName: req.body.productName.trim(),
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category || cart[index].category
    };

    res.status(200).json({
        message: "Product updated successfully",
        product: cart[index]
    });
});

// DELETE: Remove product
app.delete("/cart/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }

    const index = cart.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = cart.splice(index, 1)[0];

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct
    });
});

// Invalid JSON/body and other errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({
            message: "Invalid JSON request"
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
});

// Invalid route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});
