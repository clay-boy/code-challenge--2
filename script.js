document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    const shoppingList = document.getElementById('shoppingList');
    let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    const saveAndRender = () => {
        localStorage.setItem('shoppingItems', JSON.stringify(items));
        renderList();
    };

    const renderList = () => {
        shoppingList.innerHTML = items.map((item, index) => `
            <li class="${item.purchased ? 'purchased' : ''}">
                <input type="checkbox" ${item.purchased ? 'checked' : ''} onchange="togglePurchased(${index})">
                <label contentEditable="true" onblur="updateItemName(${index}, this.textContent)">${item.name}</label>
                <button onclick="deleteItem(${index})">🚮</button>
            </li>
        `).join('');
    };

    window.updateItemName = (index, newName) => {
        items[index].name = newName;
        saveAndRender();
    };

    window.togglePurchased = (index) => {
        items[index].purchased = !items[index].purchased;
        saveAndRender();
    };

    window.deleteItem = (index) => {
        items.splice(index, 1);
        saveAndRender();
    };

    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    };

    const clearList = () => {
        items = [];
        saveAndRender();
    };

    addItemBtn.addEventListener('click', addItem);
    clearListBtn.addEventListener('click', clearList);
    itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItem();
    });

    renderList();
});
