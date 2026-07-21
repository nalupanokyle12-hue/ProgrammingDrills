// Real-Life Example: Coffee Shop Order

const customer = {
    name: "Kyle",
    drink: "Iced Coffee",
    quantity: 2,
    price: 120
};

function calculateTotal(order) {
    const total = order.quantity * order.price;

    console.log("=== Coffee Shop Receipt ===");
    console.log("Customer:", order.name);
    console.log("Drink:", order.drink);
    console.log("Quantity:", order.quantity);
    console.log("Price per Cup: ₱" + order.price);
    console.log("Total Amount: ₱" + total);

    if (total >= 200) {
        console.log("Status: Eligible for a free cookie!");
    } else {
        console.log("Status: Thank you for your purchase!");
    }
}

calculateTotal(customer);