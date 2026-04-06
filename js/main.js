// Almacenamos nuestros gastos e ingresos
let transactions = [];

// Accedemos a nuestos elementos
const form = document.querySelector('#transactionForm');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const type = document.getElementById('type');

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
    console.log(transactions);
}

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

// Esperamos a que el usuario llene el formulario y de clic en 'Agregar'
form.addEventListener('submit', (e) => {
    // Evitamos que el formulario se envíe automaticamente
    e.preventDefault();

    // Agregamos la transacción
    addTransaction();
});
