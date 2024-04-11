const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://gabrielclaudio30:Fiokko12@cluster-app.knwqaas.mongodb.net/?retryWrites=true&w=majority&appName=cluster-app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al database:'));
db.once('open', function() {
    console.log('Connessione al database avvenuta con successo!');
});

const transazioneSchema = new mongoose.Schema({
    tipo: String,
    importo: Number,
    data: { type: Date, default: Date.now }
});

const Transazione = mongoose.model('Transazione', transazioneSchema);

app.post('/aggiungi-transazione', async (req, res) => {
    const { tipo, importo } = req.body;

    try {
        const nuovaTransazione = new Transazione({ tipo, importo });
        await nuovaTransazione.save();
        res.status(201).send('Transazione aggiunta con successo!');
    } catch (err) {
        res.status(500).send('Errore nell\'aggiunta della transazione.');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});