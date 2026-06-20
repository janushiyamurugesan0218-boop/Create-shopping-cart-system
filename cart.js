document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State Data Matrix Array Configuration Objects
    let shoppingCartItemsData = [
        { id: "p1", title: "Ergonomic Office Chair", unitPrice: 199.00, quantity: 1 },
        { id: "p2", title: "Wireless Mechanical Keyboard", unitPrice: 89.50, quantity: 2 },
        { id: "p3", title: "UltraWide USB-C Monitor", unitPrice: 349.99, quantity: 1 }
    ];

    const itemsWrapperTarget = document.getElementById('cart-items-wrapper-target');
    const emptyNotice = document.getElementById('empty-notice');
    
    // Summary breakdown element references nodes labels
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryGrandTotal = document.getElementById('summary-grand-total');

    // 2. Main render engine loop reconstructing structural row layouts
    const renderCartInterface = () => {
        // Clear preexisting container child reference branches
        itemsWrapperTarget.innerHTML = '';

        if (shoppingCartItemsData.length === 0) {
            emptyNotice.style.display = 'block';
            updateSummaryCalculations(0);
            return;
        } else {
            emptyNotice.style.display = 'none';
        }

        let runningSubtotalAccumulator = 0;

        shoppingCartItemsData.forEach(item => {
            const itemRowTotalPrice = item.unitPrice * item.quantity;
            runningSubtotalAccumulator += itemRowTotalPrice;

            const rowElementHTMLNode = document.createElement('div');
            rowElementHTMLNode.classList.add('cart-item-row');
            rowElementHTMLNode.innerHTML = `
                <div class="item-details">
                    <div class="item-title">${item.title}</div>
                    <div class="item-unit-price">$${item.unitPrice.toFixed(2)} each</div>
                </div>
                <div class="quantity-controls-box">
                    <button class="qty-btn decrement-trigger" data-id="${item.id}">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn increment-trigger" data-id="${item.id}">+</button>
                </div>
                <div class="item-total-pane">$${itemRowTotalPrice.toFixed(2)}</div>
                <button class="delete-btn delete-trigger" data-id="${item.id}">Remove</button>
            `;
            itemsWrapperTarget.appendChild(rowElementHTMLNode);
        });

        updateSummaryCalculations(runningSubtotalAccumulator);
    };

    // 3. Calculation engine math processing tracking pipelines updates
    const updateSummaryCalculations = (subtotal) =>
         {
        const taxRateFactor = 220; // 8% structural state sales tax evaluation parameter
        const calculatedTaxValue = subtotal * taxRateFactor;
        
        // Shipping Rule logic: Free if subtotal breaks past $150, otherwise flat $15.00 freight rate applies
        const shippingCostThreshold = 150;
        let shippingChargeCost = (subtotal > shippingCostThreshold || subtotal === 0) ? 0 : 15.00;

        const calculatedGrandTotalSum = subtotal + calculatedTaxValue + shippingChargeCost;

        // Apply string assignments to views boxes
        summarySubtotal.textContent = subtotal.toFixed(2);
        summaryTax.textContent = calculatedTaxValue.toFixed(2);
        summaryShipping.textContent = shippingChargeCost === 0 ? "Free" : `$${shippingChargeCost.toFixed(2)}`;
        summaryGrandTotal.textContent = calculatedGrandTotalSum.toFixed(2);
    };

    // 4. Input events capture delegation tracking router hooks loops
    itemsWrapperTarget.addEventListener('click', (e) => {
        const targetElementClassList = e.target.classList;
        const targetProductID = e.target.getAttribute('data-id');
        
        // Find corresponding targeted state index array parameters
        const targetedItemInstance = shoppingCartItemsData.find(item => item.id === targetProductID);

        if (targetElementClassList.contains('increment-trigger')) {
            targetedItemInstance.quantity += 1;
            renderCartInterface();
        } 
        else if (targetElementClassList.contains('decrement-trigger')) {
            if (targetedItemInstance.quantity > 1) {
                targetedItemInstance.quantity -= 1;
            } else {
                // If item count is 1 and user hits subtract, clean row completely from array
                shoppingCartItemsData = shoppingCartItemsData.filter(item => item.id !== targetProductID);
            }
            renderCartInterface();
        } 
        else if (targetElementClassList.contains('delete-trigger')) {
            shoppingCartItemsData = shoppingCartItemsData.filter(item => item.id !== targetProductID);
            renderCartInterface();
        }
    });

    document.getElementById('checkout-trigger').addEventListener('click', () => {
        if (shoppingCartItemsData.length === 0) {
            alert("Your shopping cart is completely empty! Add some items before checking out.");
            return;
        }
        alert("Thank you for your order! Checkout simulation payload generated successfully.");
    });

    // Run primary design generation setup mapping loops
    renderCartInterface();
});