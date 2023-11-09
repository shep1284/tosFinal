-- Products
-- CREATE
INSERT INTO Products (productName, description, unitPrice, quantityInStock, supplierID, categoryID)
VALUES (:productName, :description, :unitPrice, :quantityInStock, :supplierID, :categoryID);

-- SELECT
SELECT
    P.productID,
    P.productName,
    P.description,
    P.unitPrice,
    P.quantityInStock,
    S.supplierName,
    PC.category
FROM Products P
INNER JOIN Suppliers S ON P.supplierID = S.supplierID
INNER JOIN ProductCategories PC ON P.categoryID = PC.categoryID
WHERE P.productID = :productID;

-- SELECT ALL
SELECT
    P.productID,
    P.productName,
    P.description,
    P.unitPrice,
    P.quantityInStock,
    S.supplierName,
    PC.category
FROM Products P
INNER JOIN Suppliers S ON P.supplierID = S.supplierID
INNER JOIN ProductCategories PC ON P.categoryID = PC.categoryID;

-- DELETE
-- Delete a product and related entries in ProductSales (on delete CASCADE in ProductSales)
DELETE P, PS
FROM Products P
INNER JOIN ProductSales PS ON P.productID = PS.productID
WHERE P.productID = :productID;

-- Customers
-- CREATE
INSERT INTO Customers (firstName, lastName, email, phone, address)
VALUES (:firstName, :lastName, :email, :phone, :address);

-- SELECT
SELECT * FROM Customers WHERE customerID = :customerID;

-- SELECT ALL
SELECT * FROM Customers;

-- UPDATE
-- Update a customer
UPDATE Customers
SET firstName = :firstName, lastName = :lastName, email = :email, phone = :phone, address = :address
WHERE customerID = :customerID;

-- SalesOrders
-- CREATE
INSERT INTO SalesOrders (orderDate, customerID)
VALUES (:orderDate, :customerID);

-- SELECT
SELECT * FROM SalesOrders WHERE orderID = :orderID;

-- SELECT ALL
SELECT * FROM SalesOrders;

-- No DELETE or UPDATE operations provided for SalesOrders.

-- Suppliers
-- CREATE
INSERT INTO Suppliers (supplierName, contactName, email, phone, address)
VALUES (:supplierName, :contactName, :email, :phone, :address);

-- SELECT
SELECT * FROM Suppliers WHERE supplierID = :supplierID;

-- SELECT ALL
SELECT * FROM Suppliers;

-- No DELETE or UPDATE operations provided for Suppliers.

-- ProductSales (Many-to-Many relationship)
-- CREATE
INSERT INTO ProductSales (productID, orderID, quantitySold, salePrice)
VALUES (:productID, :orderID, :quantitySold, :salePrice);

-- SELECT
SELECT
    PS.productSaleID,
    PS.quantitySold,
    PS.salePrice,
    P.productName,
    SO.orderDate
FROM ProductSales PS
INNER JOIN Products P ON PS.productID = P.productID
INNER JOIN SalesOrders SO ON PS.orderID = SO.orderID
WHERE PS.productSaleID = :productSaleID;

-- SELECT ALL
SELECT
    PS.productSaleID,
    PS.quantitySold,
    PS.salePrice,
    P.productName,
    SO.orderDate
FROM ProductSales PS
INNER JOIN Products P ON PS.productID = P.productID
INNER JOIN SalesOrders SO ON PS.orderID = SO.orderID;

-- No DELETE or UPDATE operations provided for ProductSales.

-- ProductCategories
-- CREATE
INSERT INTO ProductCategories (category)
VALUES (:category);

-- SELECT
SELECT * FROM ProductCategories WHERE categoryID = :categoryID;

-- SELECT ALL
SELECT * FROM ProductCategories;

-- No DELETE or UPDATE operations provided for ProductCategories.
