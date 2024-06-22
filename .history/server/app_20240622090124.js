const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up a transport for nodemailer (using a dummy example, configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emmachristech@gmail.com',
    pass: 'emmagu2017',
  },
});

// Serve the form (for testing, you can serve an HTML file or just send the form HTML directly)
app.get('/', (req, res) => {
  res.send(`
    <form action="/send-message" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br>
      <label for="subject">Subject:</label>
      <input type="text" id="subject" name="subject"><br>
      <label for="message">Message:</label>
      <textarea id="message" name="message"></textarea><br>
      <button type="submit">Send message</button>
    </form>
  `);
});

// Handle form submissions
app.post('/send-message', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'emmachristech@gmail.com', 
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending message: ' + error.toString());
    }
    res.status(200).send('Message sent successfully!');
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
