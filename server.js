document.getElementById('transaction-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    
    try {
        const response = await fetch('http://localhost:3000/aggiungi-transazione', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo: type, importo: amount })
        });

        if (response.ok) {
            console.log('Transazione aggiunta con successo!');
        } else {
            console.error('Errore nell\'aggiunta della transazione.');
        }
    } catch (error) {
        console.error('Errore di rete:', error);
    }
    
    document.getElementById('amount').value = ''; // Resetta il campo dell'importo dopo l'aggiunta della transazione
});