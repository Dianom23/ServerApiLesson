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

app.get('/api/chars', (req, res) => {
    try {
        // Чтение файла с данными
        const charsData = fs.readFileSync(
            path.join(__dirname, 'data', 'chars.json'),
            'utf8'
        );
        const chars = JSON.parse(charsData);
        res.json(chars);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

app.get('/api/chars/:index', (req, res) => {
    try {
        const index = parseInt(req.params.index);
        // Чтение файла с данными
        const charsData = fs.readFileSync(
            path.join(__dirname, 'data', 'chars.json'),
            'utf8'
        );
        const chars = JSON.parse(charsData);
        
        // Проверка существования индекса
        if (index < 0 || index >= chars.players.length) {
            return res.status(404).json({ error: 'Персонаж не найден' });
        }
        
        res.json(chars.players[index]);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 