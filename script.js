const form = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions-list');
const balanceDisplay = document.getElementById('balance');
let balance = 0;
let guadagno = 0;
let perdita = 0;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const amount = +document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;

    const transaction = { name, amount, date, type };
    
    createTransaction(transaction);
    updateBalance();
    form.reset();
});

function createTransaction(transaction) {
    const transactionElement = document.createElement('div');
    transactionElement.classList.add('transaction', transaction.type);
    transactionElement.innerHTML = `
        <span>${transaction.name}</span>
        <span>${transaction.amount} €</span>
        <span>${transaction.date}</span>
    `;
    transactionsList.appendChild(transactionElement);

    if (transaction.type === 'guadagno') {
        guadagno += transaction.amount;
    } else if (transaction.type === 'perdita') {
        perdita += transaction.amount;
    }
}

function updateBalance() {
    balance = guadagno - perdita;
    
    balanceDisplay.innerText = `Bilancio Totale: ${balance} € (Guadagno: ${guadagno} €, Perdita: ${perdita} €)`;
}