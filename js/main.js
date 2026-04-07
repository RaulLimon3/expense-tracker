// Almacenamos nuestros gastos e ingresos
let transactions = [];

// Accedemos a nuestos elementos
const form = document.querySelector('#transactionForm');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const transactionRender = document.getElementById('transactions');
const emptyTransaction = document.getElementById('emptyTransaction');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

// Creamos la funcion para agregar una transacción
const addTransaction = () => {
    // Validamos los campos
    if (!validateInput()) return;

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

    // Calculamos las cantidades
    calculateBalance();
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

    if (amount.value === '' || Number(amount.value) <= 0) {
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
    transactionRender.classList.remove('transactions-none');

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

// Creamos las funciones para calcular el balance general, la suma de los ingresos y gastos

let calculateBalance = () => {
    // Recorremos nuestras transacciones
    const result = transactions.reduce((acc, transaction) => {
        // Verificamos que tipo de transacción es
        if (transaction.type === 'expense') {
            // Sumamos las cantidades
            acc.expense += transaction.amount;
        } else {
            acc.income += transaction.amount;
        }
        // Regresamos el resultado
        return acc;
    }, {income: 0, expense: 0});

    // Calculamos el balance
    const totalBalance = result.income - result.expense;

    // Mostramos los resultados
    expenseAmount(result.expense);
    incomeAmount(result.income);
    balanceAmount(totalBalance);
}

let balanceAmount = (amount) => {
    balance.textContent = `$${formatCurrency(amount)}`;
};

let incomeAmount = (amount) => {
    income.textContent = `$${formatCurrency(amount)}`;
};

let expenseAmount = (amount) => {
    // Accedemos al elemento y cambiamos su valor
    expense.textContent = `$${formatCurrency(amount)}`;
};

// Esperamos a que el usuario llene el formulario y de clic en 'Agregar'
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envíe automaticamente
    e.preventDefault();

    // Agregamos la transacción
    addTransaction();
});
