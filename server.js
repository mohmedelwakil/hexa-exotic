const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer'); 

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Assets Folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Database Connection
const dbPath = path.join(__dirname, 'hexaxotics.db'); 
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to the HEXA XOTICS database at: ' + dbPath);
});

// --- APIs ---

app.get('/api/cars', (req, res) => {
    const sql = "SELECT * FROM cars";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(400).json({ "error": err.message });
        res.json({ "message": "success", "data": rows });
    });
});

app.get('/api/cars/:id', (req, res) => {
    const sql = "SELECT * FROM cars WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(400).json({ "error": err.message });
        if (!row) return res.status(404).json({ "message": "Car not found" });
        res.json({ "message": "success", "data": row });
    });
});

app.post('/api/signup', (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "All fields are required" });
    username = username.trim(); email = email.trim(); password = password.trim();

    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.run(sql, [username, email, password], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) return res.status(400).json({ error: "Username or Email already exists." });
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "User registered successfully", id: this.lastID });
    });
});

app.post('/api/login', (req, res) => {
    let { username, password } = req.body;
    if(!username || !password) return res.status(400).json({error: "Missing data"});

    const sql = "SELECT * FROM users WHERE username = ?";
    db.get(sql, [username.trim()], (err, user) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!user || user.password !== password.trim()) return res.status(401).json({ message: "Invalid username or password" });
        
        res.json({ 
            success: true, message: "Login success", userId: user.id, 
            user: { id: user.id, username: user.username, email: user.email } 
        });
    });
});

app.get('/api/user/:id', (req, res) => {
    const sql = "SELECT id, username, email, phone, profile_image FROM users WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(400).json({ "error": err.message });
        if (!row) return res.status(404).json({ "error": "User not found" });
        res.json(row);
    });
});

app.post('/api/upload-avatar/:id', upload.single('avatar'), (req, res) => {
    const userId = req.params.id;
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = `/assets/${file.filename}`; 
    const sql = "UPDATE users SET profile_image = ? WHERE id = ?";
    db.run(sql, [imageUrl, userId], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Image uploaded successfully", imageUrl: imageUrl });
    });
});

app.put('/api/update-user/:id', (req, res) => {
    const userId = req.params.id;
    const { username, phone } = req.body;
    const sql = "UPDATE users SET username = ?, phone = ? WHERE id = ?";
    db.run(sql, [username, phone, userId], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "User updated successfully" });
    });
});

app.delete('/api/delete-account/:id', (req, res) => {
    db.run("DELETE FROM users WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Account deleted successfully" });
    });
});

// ==========================================================
// ✅ EMAIL SENDING
// ==========================================================
app.post('/api/send-order-email', async (req, res) => {
    const { userEmail, carModel, totalPrice, image } = req.body;
    const imageName = image.split('/').pop(); 
    const imagePath = path.join(__dirname, 'assets', imageName); 

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hexaxotics@gmail.com', 
            pass: 'izmw mzcn qyyr ycqn'   
        }
    });

    const mailOptions = {
        from: '"HEXA XOTICS" <hexaxotics@gmail.com>',
        to: userEmail,
        subject: 'Order Confirmation - HEXA XOTICS',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                <h2 style="color: #c71585; text-align: center;">Order Confirmed!</h2>
                <p>Thank you for shopping with HEXA XOTICS.</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                    <h3>Order Details:</h3>
                    <img src="cid:carImage" alt="Car" style="width: 100%; max-width: 300px; display: block; margin: 0 auto 10px;">
                    <p><strong>Car:</strong> ${carModel}</p>
                    <p><strong>Total Paid:</strong> <span style="color: #c71585; font-weight: bold;">${totalPrice}</span></p>
                </div>
                <p style="text-align: center; margin-top: 20px;">We hope to see you again!</p>
            </div>
        `,
        attachments: [{
            filename: imageName,
            path: imagePath,
            cid: 'carImage' 
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// ==========================================================
// ✅ WISHLIST APIs (NEW)
// ==========================================================

// 1. Add to Wishlist
app.post('/api/wishlist/add', (req, res) => {
    const { userId, carId } = req.body;
    if (!userId || !carId) return res.status(400).json({ error: "User ID and Car ID required" });

    const sql = "INSERT INTO wishlist (user_id, car_id) VALUES (?, ?)";
    db.run(sql, [userId, carId], function(err) {
        if (err) {
            // If duplicate, just consider it success or send message
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.json({ message: "Car already in wishlist" });
            }
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "Car added to wishlist" });
    });
});

// 2. Remove from Wishlist
app.post('/api/wishlist/remove', (req, res) => {
    const { userId, carId } = req.body;
    const sql = "DELETE FROM wishlist WHERE user_id = ? AND car_id = ?";
    db.run(sql, [userId, carId], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Car removed from wishlist" });
    });
});

// 3. Get User Wishlist (Join with Cars table)
app.get('/api/wishlist/:userId', (req, res) => {
    const sql = `
        SELECT cars.* FROM wishlist 
        JOIN cars ON wishlist.car_id = cars.id 
        WHERE wishlist.user_id = ?
    `;
    db.all(sql, [req.params.userId], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "success", data: rows });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});