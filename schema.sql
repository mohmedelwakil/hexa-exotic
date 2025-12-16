-- 1. Create Users Table
CREATE TABLE Users (
    userid INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 2. Create Cars Table
CREATE TABLE Cars (
    car_no VARCHAR(50) PRIMARY KEY, -- Primary key is a String/Varchar based on diagram
    image_id INTEGER, -- Link to a main image if needed
    model VARCHAR(50),
    name VARCHAR(100),
    engine TEXT,
    horsepower INTEGER,
    acc TEXT,
    mileage INTEGER,
    topspeed TEXT,
    transmission TEXT,
    excolor VARCHAR(50),
    intcolor VARCHAR(50),
    baseprice INTEGER
);

-- 3. Create Car_Images Table
CREATE TABLE Car_Images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_id VARCHAR(50), -- Changed to VARCHAR to match Cars.car_no
    image_url VARCHAR(255),
    FOREIGN KEY (car_id) REFERENCES Cars(car_no)
);

-- 4. Create Sales_Orders Table
CREATE TABLE Sales_Orders (
    sales_id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_no VARCHAR(50), -- Changed to VARCHAR to match Cars.car_no
    userid INTEGER,
    date DATE,
    baseprice DECIMAL(10,2),
    luxury_tax DECIMAL(10,2),
    doc_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    FOREIGN KEY (car_no) REFERENCES Cars(car_no),
    FOREIGN KEY (userid) REFERENCES Users(userid)
);

-- 5. Create Payments Table
CREATE TABLE Payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_id INTEGER,
    method VARCHAR(200),
    payment DECIMAL(10,2),
    cardnumber TEXT, -- Changed to TEXT (INT is too small for 16 digits)
    cardholdername TEXT,
    expirationdate DATE,
    CVC INTEGER,
    savepaymentinfo BOOLEAN,
    is_successful BOOLEAN,
    paymentdate DATE,
    FOREIGN KEY (sales_id) REFERENCES Sales_Orders(sales_id)
);