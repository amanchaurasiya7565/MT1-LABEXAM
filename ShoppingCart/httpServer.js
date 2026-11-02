
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Shopping cart array
let cart = [
    {
        id: 1,
        productName: "Wireless Mouse",
        price: 799,
        quantity: 2
    },
    {
        id: 2,
        productName: "Keyboard",
        price: 1200,
        quantity: 1
    },
    {
        id: 3,
        productName: "Headphones",
        price: 1499,
        quantity: 1
    }
];

// Helper function for JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer((req, res) => {

    const { method, url } = req;

    // Route 1: Welcome page
    if (method === "GET" && url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Shopping Cart Management</h1>");
    }

    // Route 2: Get all cart items
    else if (method === "GET" && url === "/cart") {
        sendJSON(res, 200, cart);
    }

    // Route 3: About page
    else if (method === "GET" && url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>About Shopping Cart</h1>
            <p>This application uses Node.js HTTP and FS modules.</p>
        `);
    }

    // Route 4: Serve HTML using FS module
    else if (method === "GET" && url === "/home") {
        const filePath = path.join(
            __dirname,
            "public",
            "index.html"
        );

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                sendJSON(res, 500, {
                    message: "Unable to read HTML file"
                });
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }

    // Route 5: Add product
    else if (method === "POST" && url === "/add-to-cart") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;

            if (body.length > 1e6) {
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                const product = JSON.parse(body);

                const { id, productName, price, quantity } = product;

                if (
                    id === undefined ||
                    !productName ||
                    typeof productName !== "string" ||
                    typeof price !== "number" ||
                    !Number.isFinite(price) ||
                    price < 0 ||
                    !Number.isInteger(quantity) ||
                    quantity <= 0 ||
                    !Number.isInteger(id) ||
                    id <= 0
                ) {
                    return sendJSON(res, 400, {
                        message: "Invalid product details"
                    });
                }

                if (cart.some(item => item.id === id)) {
                    return sendJSON(res, 409, {
                        message: "Product ID already exists"
                    });
                }

                cart.push(product);

                sendJSON(res, 201, {
                    message: "Product added successfully",
                    product
                });

            } catch (error) {
                sendJSON(res, 400, {
                    message: "Invalid JSON request"
                });
            }
        });
    }

    // Invalid routes
    else {
        sendJSON(res, 404, {
            message: "Route not found"
        });
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});
