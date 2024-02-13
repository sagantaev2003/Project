let cart = [];

function addItem(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateCart();
}

function removeItem(item) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
    } else {
        cart = cart.filter(cartItem => cartItem.item !== item);
    }
    updateCart();
}


document.addEventListener('DOMContentLoaded', function () {
    updateCart(); // Вызываем updateCart при загрузке страницы для скрытия счетчика
});


function updateCart() {
    const cartList = document.getElementById('cart');
    const cartCount = document.getElementById('cart-count');
    let totalCount = 0;

    cartList.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.item} (Кол-во: ${item.quantity}, Цена: $${item.price}): $${item.price * item.quantity}`;
        totalCount += item.quantity;

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => removeItem(item.item));

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => addItem(item.item, item.price));

        listItem.style.marginBottom = '5px';
        increaseButton.style.marginLeft = '5px';
        decreaseButton.style.marginLeft = '5px';

        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);
        cartList.appendChild(listItem);
    });

    cartCount.textContent = totalCount === 0 ? '' : totalCount;
}





function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста. Добавьте товары перед оформлением заказа.');
    } else {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`Заказ оформлен! Сумма заказа: $${total}`);
        cart = [];
        updateCart();
    }
}

function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    cartDropdown.classList.toggle('cart-closed');
}


document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('#fixed-buttons-container button');

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.parentElement.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const yOffset = -80; // Вы можете настроить отступ, если у вас есть фиксированная панель навигации
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
});



function clearCart() {
    cart = []; // Очистить массив корзины
    updateCart(); // Обновить отображение корзины
}


const menuItems = document.querySelectorAll('.menu-item');
const menuItemsContainer = document.getElementById('menu-items');
const searchInput = document.getElementById('searchInput'); // Получаем элемент поля ввода
let originalHTML = menuItemsContainer.innerHTML;

function searchFood(searchTerm) {
    const searchInput = searchTerm.toLowerCase();

    menuItemsContainer.innerHTML = ''; // Очистить контейнер перед отображением результатов

    menuItems.forEach(item => {
        const itemName = item.querySelector('p').textContent.toLowerCase();
        if (itemName.includes(searchInput)) {
            menuItemsContainer.appendChild(item.cloneNode(true));
        }
    });
}

function clearSearch() {
    menuItemsContainer.innerHTML = originalHTML; // Восстановить исходное HTML содержимое
    searchInput.value = ''; // Очистить значение поля ввода
}


