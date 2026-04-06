// Almacenamos nuestros gastos e ingresos
let transactions = [];

// Accedemos a nuestos elementos
const form = document.querySelector('#transactionForm');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const transactionRender = document.getElementById('transactions');
const emptyTransaction = document.getElementById('emptyTransaction');

// Creamos la funcion para agregar una transacción
const addTransaction = () => {
    // Validamos los campos
    if(!validateInput()) return;

    // Agregamos la transacción
    transactions.push({
        description: description.value.trim(),
        amount: Number(amount.value),
        type: type.value
    });

    // Limpiamos los campos
    description.value = '';
    amount.value = '';
    type.value = '';

    // Mostramos el resultado
    renderTransactions();
};

// Creamos la funcion para validar nuestros campos
const validateInput = () => {
    let isValid = true;

    // Verificamos que nuestros campos no esten vacios
    if (description.value.trim() === '') {
        description.classList.add('input--danger');
        isValid = false;
    } else {
        description.classList.remove('input--danger');
    }
    
    if (amount.value === '') {
        amount.classList.add('input--danger');
        isValid = false;
    } else {
        amount.classList.remove('input--danger');
    }
    
    if (type.value === '') {
        type.classList.add('input--danger');
        isValid = false;
    } else {
        type.classList.remove('input--danger');
    }

    return isValid;
};

// Creamos una función para mostrar todas las transacciones
let renderTransactions = () => {
    // Limpiamos la pantalla
    transactionRender.innerHTML = '';
    // Verificamos si no hay algun registro
    if (transactions.length === 0) {
        emptyTransaction.style.display = 'block';
        return;
    }
    
    // Quitamos el mensaje
    emptyTransaction.style.display = 'none';

    // Recorremos las transacciones
    transactions.forEach(transaction => {
        // Agregamos nuestro elemento
        const li = document.createElement('li');
        // Agregamos los estilos
        const isExpense = transaction.type === 'expense';
        // Verificamos si es un gasto o un ingreso
        li.classList.add('transaction', isExpense ? 'transaction--expense' : 'transaction--income');
        // Agregamos le contenido
        li.innerHTML = `
                <div class="transaction__content">
                    <span>${transaction.description}</span>
                    <span>${isExpense ? '-' : '+'}$${formatCurrency(transaction.amount)}</span>
                </div>
            `;
        // Mostramos la transacciones
        transactionRender.appendChild(li);
    });
};

// Le damos un formato al precio
const formatCurrency = (amount) => {
    return amount.toFixed(2);
}

// Esperamos a que el usuario llene el formulario y de clic en 'Agregar'
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envíe automaticamente
    e.preventDefault();

    // Agregamos la transacción
    addTransaction();
});
