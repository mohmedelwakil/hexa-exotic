const sqlite3 = require('sqlite3').verbose();

// ✅ التعديل هنا: اسم قاعدة البيانات الجديد
const db = new sqlite3.Database('./hexaxotics.db', (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to HEXA XOTICS database...");
});

// --- قائمة السيارات ---
const cars = [
    {
        make: "Ferrari", model: "SF90 Stradale", year: 2024, price: 500000,
        image_url: "/assets/car1.jpg", gallery: JSON.stringify(["/assets/car1.1.jpg", "/assets/car1.2.jpg", "/assets/car1.3.jpg", "/assets/car1.4.jpg", "/assets/car1.5.jpg"]),
        engine: "3.9L Twin-Turbo V8", horsepower: "661 hp", zero_to_sixty: "3.0 sec", top_speed: "205 mph",
        transmission: "7-speed Dual-Clutch", mileage: "5,200 miles", exterior_color: "Rosso Corsa", interior_color: "Nero Leather"
    },
    {
        make: "Lamborghini", model: "Aventador SVJ", year: 2023, price: 600000,
        image_url: "/assets/car2.jpg", gallery: JSON.stringify(["/assets/car2.1.jpg", "/assets/car2.2.jpg", "/assets/car2.3.jpg", "/assets/car2.4.jpg", "/assets/car2.5.jpg"]),
        engine: "6.5L V12 Naturally Aspirated", horsepower: "759 hp", zero_to_sixty: "2.8 sec", top_speed: "217 mph",
        transmission: "7-speed ISR", mileage: "1,500 miles", exterior_color: "Verde Mantis", interior_color: "Alcantara Nero"
    },
    {
        make: "McLaren", model: "720S", year: 2022, price: 350000,
        image_url: "/assets/car3.jpg", gallery: JSON.stringify(["/assets/car3.1.jpg", "/assets/car3.2.jpg", "/assets/car3.3.jpg", "/assets/car3.4.jpg", "/assets/car3.5.jpg"]),
        engine: "4.0L Twin-Turbo V8", horsepower: "710 hp", zero_to_sixty: "2.8 sec", top_speed: "212 mph",
        transmission: "7-speed SSG", mileage: "3,100 miles", exterior_color: "Papaya Spark", interior_color: "Black/Orange"
    },
    {
        make: "Ferrari", model: "812 Competizione", year: 2023, price: 600000,
        image_url: "/assets/car5.jpg", gallery: JSON.stringify(["/assets/car5.1.jpg", "/assets/car5.2.jpg", "/assets/car5.3.jpg", "/assets/car5.4.jpg", "/assets/car5.5.jpg"]),
        engine: "6.5L V12", horsepower: "819 hp", zero_to_sixty: "2.85 sec", top_speed: "211 mph",
        transmission: "7-speed Dual-Clutch", mileage: "800 miles", exterior_color: "Giallo Modena", interior_color: "Charcoal Alcantara"
    },
    {
        make: "Porsche", model: "911 GT3 RS", year: 2024, price: 280000,
        image_url: "/assets/car4.jpg", gallery: JSON.stringify(["/assets/car4.1.jpg", "/assets/car4.2.jpg", "/assets/car4.3.jpg", "/assets/car4.4.jpg", "/assets/car4.5.jpg"]),
        engine: "4.0L Flat-6", horsepower: "518 hp", zero_to_sixty: "3.0 sec", top_speed: "184 mph",
        transmission: "7-speed PDK", mileage: "120 miles", exterior_color: "White / Red Decals", interior_color: "Black Race-Tex"
    },
    {
        make: "Ferrari", model: "488 Pista", year: 2020, price: 480000,
        image_url: "/assets/car6.1.jpg", gallery: JSON.stringify(["/assets/car6.1.jpg", "/assets/car6.2.jpg", "/assets/car6.3.jpg", "/assets/car6.4.jpg", "/assets/car6.5.jpg"]),
        engine: "3.9L Twin-Turbo V8", horsepower: "710 hp", zero_to_sixty: "2.85 sec", top_speed: "211 mph",
        transmission: "7-speed Dual-Clutch", mileage: "2,500 miles", exterior_color: "Giallo Modena with Black Stripes", interior_color: "Rosso Alcantara & Carbon Fiber"
    },
    {
        make: "Nissan", model: "GT-R Nismo", year: 2021, price: 220000,
        image_url: "/assets/car7.1.jpg", gallery: JSON.stringify(["/assets/car7.1.jpg", "/assets/car7.2.jpg", "/assets/car7.3.jpg", "/assets/car7.4.jpg", "/assets/car7.5.jpg"]),
        engine: "3.8L Twin-Turbo V6", horsepower: "600 hp", zero_to_sixty: "2.5 sec", top_speed: "205 mph",
        transmission: "6-speed Dual-Clutch", mileage: "4,000 miles", exterior_color: "Pearl White / Nismo Red", interior_color: "Black/Red Recaro"
    },
    {
        make: "Acura", model: "NSX", year: 2022, price: 169500,
        image_url: "/assets/car8.1.jpg", gallery: JSON.stringify(["/assets/car8.1.jpg", "/assets/car8.2.jpg", "/assets/car8.3.jpg", "/assets/car8.4.jpg", "/assets/car8.5.jpg", "/assets/car8.6.jpg"]),
        engine: "3.5L Twin-Turbo V6 Hybrid", horsepower: "573 hp", zero_to_sixty: "2.9 sec", top_speed: "191 mph",
        transmission: "9-speed Dual-Clutch", mileage: "2,100 miles", exterior_color: "130R White", interior_color: "Red Semi-Aniline Leather"
    },
    {
        make: "Audi", model: "R8 V10 Performance", year: 2023, price: 230000,
        image_url: "/assets/car9.1.jpg", gallery: JSON.stringify(["/assets/car9.1.jpg", "/assets/car9.2.jpg", "/assets/car9.3.jpg", "/assets/car9.4.jpg", "/assets/car9.5.jpg", "/assets/car9.6.jpg"]),
        engine: "5.2L V10 FSI", horsepower: "602 hp", zero_to_sixty: "3.1 sec", top_speed: "205 mph",
        transmission: "7-speed S tronic", mileage: "1,200 miles", exterior_color: "Kemora Gray", interior_color: "Black Nappa Leather"
    },
    {
        make: "Lexus", model: "LFA", year: 2012, price: 900000, 
        image_url: "/assets/car10.1.jpg", gallery: JSON.stringify(["/assets/car10.1.jpg", "/assets/car10.2.jpg", "/assets/car10.3.jpg", "/assets/car10.4.jpg", "/assets/car10.5.jpg", "/assets/car10.6.jpg"]),
        engine: "4.8L V10 Naturally Aspirated", horsepower: "553 hp", zero_to_sixty: "3.6 sec", top_speed: "202 mph",
        transmission: "6-speed ASG", mileage: "1,800 miles", exterior_color: "Absolutely Red", interior_color: "White Leather / Carbon"
    },
    {
        make: "Bentley", model: "Continental GT V8 Convertible", year: 2023, price: 280000, 
        image_url: "/assets/car11.1.jpg", gallery: JSON.stringify(["/assets/car11.1.jpg", "/assets/car11.2.jpg", "/assets/car11.3.jpg", "/assets/car11.4.jpg", "/assets/car11.5.jpg", "/assets/car11.6.jpg"]),
        engine: "4.0L Twin-Turbo V8", horsepower: "542 hp", zero_to_sixty: "3.9 sec", top_speed: "198 mph",
        transmission: "8-speed Dual-Clutch", mileage: "500 miles", exterior_color: "Glacier White", interior_color: "Beluga with Mandarin Accents"
    },
    {
        make: "McLaren", model: "765LT", year: 2021, price: 380000, 
        image_url: "/assets/car12.1.jpg", gallery: JSON.stringify([
            "/assets/car12.1.jpg", "/assets/car12.2.jpg", "/assets/car12.3.jpg", 
            "/assets/car12.4.jpg", "/assets/car12.5.jpg", "/assets/car12.6.jpg"
        ]),
        engine: "4.0L Twin-Turbo V8", horsepower: "755 hp", zero_to_sixty: "2.7 sec", top_speed: "205 mph",
        transmission: "7-speed SSG", mileage: "900 miles", exterior_color: "McLaren Orange", interior_color: "Carbon Black Alcantara"
    },
    {
        make: "McLaren", model: "P1 Carbon Series", year: 2015, price: 2100000, 
        image_url: "/assets/car13.1.jpg", gallery: JSON.stringify([
            "/assets/car13.1.jpg", "/assets/car13.2.jpg", "/assets/car13.3.jpg", 
            "/assets/car13.4.jpg", "/assets/car13.5.jpg", "/assets/car13.6.jpg"
        ]),
        engine: "3.8L Twin-Turbo V8 Hybrid", horsepower: "903 hp", zero_to_sixty: "2.8 sec", top_speed: "217 mph",
        transmission: "7-speed SSG", mileage: "450 miles", exterior_color: "Exposed Carbon Fiber / Red Accents", interior_color: "Black Alcantara / Carbon Fiber"
    },
    {
        make: "Porsche", model: "918 Spyder", year: 2015, price: 1800000, 
        image_url: "/assets/car14.1.jpg", gallery: JSON.stringify([
            "/assets/car14.1.jpg", "/assets/car14.2.jpg", "/assets/car14.3.jpg", 
            "/assets/car14.4.jpg", "/assets/car14.5.jpg", "/assets/car14.6.jpg"
        ]),
        engine: "4.6L V8 Hybrid", horsepower: "887 hp", zero_to_sixty: "2.5 sec", top_speed: "214 mph",
        transmission: "7-speed PDK", mileage: "2,000 miles", exterior_color: "Meteor Grey Metallic", interior_color: "Authentic Mocha Brown Leather"
    },
    {
        make: "Ferrari", model: "LaFerrari", year: 2015, price: 3800000, 
        image_url: "/assets/car15.1.jpg", gallery: JSON.stringify([
            "/assets/car15.1.jpg", "/assets/car15.2.jpg", "/assets/car15.3.jpg", 
            "/assets/car15.4.jpg", "/assets/car15.5.jpg", "/assets/car15.6.jpg"
        ]),
        engine: "6.3L V12 Hybrid", horsepower: "949 hp", zero_to_sixty: "2.4 sec", top_speed: "217 mph",
        transmission: "7-speed Dual-Clutch", mileage: "400 miles", exterior_color: "Rosso Corsa", interior_color: "Nero with Red Piping"
    },
    {
        make: "Hyundai", model: "Verna", year: 2016, price: 10000, 
        image_url: "/assets/car16.1.jpg", gallery: JSON.stringify([
            "/assets/car16.1.jpg", "/assets/car16.2.jpg", "/assets/car16.3.jpg", "/assets/car16.4.jpg"
        ]),
        engine: "1.6L 4-Cylinder", horsepower: "105 hp", zero_to_sixty: "10.5 sec", top_speed: "112 mph",
        transmission: "5-speed Manual", mileage: "60,000 miles", exterior_color: "Sleek Silver", interior_color: "Grey Fabric"
    }
];

db.serialize(() => {
    // 1. Drop existing tables (Optional: Comment out if you want to keep data)
    db.run("DROP TABLE IF EXISTS cars");
    db.run("DROP TABLE IF EXISTS users");
    db.run("DROP TABLE IF EXISTS wishlist"); // ✅ Drop Wishlist if exists

    // 2. Create Car Table
    db.run(`CREATE TABLE cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        make TEXT, model TEXT, year INTEGER, price REAL,
        image_url TEXT, gallery TEXT, engine TEXT, horsepower TEXT,
        zero_to_sixty TEXT, top_speed TEXT, transmission TEXT,
        mileage TEXT, exterior_color TEXT, interior_color TEXT
    )`);

    // 3. Create Users Table
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        phone TEXT,
        profile_image TEXT
    )`);
    
    // 4. ✅ Create Wishlist Table (User ID linked to Car ID)
    db.run(`CREATE TABLE wishlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        car_id INTEGER,
        UNIQUE(user_id, car_id) 
    )`);

    console.log("✅ Tables created (Cars, Users, Wishlist)!");

    // 5. Insert Cars Data
    const stmt = db.prepare(`INSERT INTO cars (
        make, model, year, price, image_url, gallery,
        engine, horsepower, zero_to_sixty, top_speed, transmission, mileage, exterior_color, interior_color
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    cars.forEach(car => {
        stmt.run(
            car.make, car.model, car.year, car.price, car.image_url,
            car.gallery, car.engine, car.horsepower, car.zero_to_sixty,
            car.top_speed, car.transmission, car.mileage, car.exterior_color,
            car.interior_color
        );
    });

    stmt.finalize();
    console.log("✅ Database updated with cars!");
});

db.close();