const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.set('bufferCommands', false);

// Middleware
app.use(cors({ origin: 'http://127.0.0.1:5501' }));
app.use(express.json());



// Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: 'Saved to database!' });
    } catch (err) {
        console.error('🔥 Mongo Error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// ⛔ DO NOT START SERVER YET

// MongoDB connection (STRICT)
async function startServer() {
    try {
        await mongoose.connect(
            'mongodb+srv://Business_weblab_admin:Qwerty123456@cluster0.zojysm8.mongodb.net/PixelPopBusiness',
            {
                serverSelectionTimeoutMS: 5000
            }
        );

        console.log('✅ MongoDB Connected and Ready');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
        });

    } catch (err) {
        console.error('❌ MongoDB FAILED:', err.message);
        process.exit(1);
    }
}

startServer();
