const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// POST method route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            if (item >= 'a' && item <= 'z') {
                if (item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    const response = {
        is_success: true,
        user_id: "Ayush_Kumar_21BCE2765", 
        email: "ayush.kumar2021b@vistudent.ac.in", 
        roll_number: "21BCE2765",  
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    };

    return res.status(200).json(response);
});

// GET method route
app.get('/bfhl', (req, res) => {
    const response = {
        operation_code: 1
    };
    res.status(200).json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
