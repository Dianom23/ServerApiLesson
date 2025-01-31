const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для получения списка товаров
app.get('/api/products', (req, res) => {
    try {
        // Чтение файла с данными
        const productsData = fs.readFileSync(
            path.join(__dirname, 'data', 'products.json'),
            'utf8'
        );
        const products = JSON.parse(productsData);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 