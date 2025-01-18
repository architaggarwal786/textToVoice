const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Basic route for home page
app.get('/', (req, res) => {
    res.render('index'); // Renders the EJS template for the homepage
});

// Route to handle form submission
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate form data
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Configure nodemailer to send email
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with your email provider if needed
        auth: {
            user: 'archita.ee.22@nitj.ac.in', // Your email
            pass: 'archit@123456',   // Your email password or app-specific password
        },
    });

    // Email details
    const mailOptions = {
        from: email,
        to: 'archita.ee.22@nitj.ac.in', // Where you want to receive the messages
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!'); // Respond with success message
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send message. Try again later.'); // Handle errors
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
