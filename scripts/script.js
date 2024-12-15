if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('LifeCare/sw.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

const menuBtn = document.querySelector('.menu_btn');
const links = document.querySelector('.links');
menuBtn.addEventListener('click', () => {
    links.classList.toggle('active');
});


// Initialize cart from localStorage if available
let cart = JSON.parse(localStorage.getItem("cart")) || [];



// Add to Cart functionality
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  renderCart(); // Update cart display
  alert(`${name} added to Cart!`);
}

// Render cart items in a table
function renderCart() {
  const cartTable = document.querySelector("#cart-table tbody");
  const totalPriceElement = document.querySelector("#total-price");
  let totalPrice = 0;

  cartTable.innerHTML = ""; // Clear the table
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;
    cartTable.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <button class="decrease-quantity" data-index="${index}">-</button>
          ${item.quantity}
          <button class="increase-quantity" data-index="${index}">+</button>
        </td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      </tr>`;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
}

// Update cart quantities or remove items
function updateCart(event) {
  const index = event.target.getAttribute("data-index");
  if (event.target.classList.contains("decrease-quantity")) {
    cart[index].quantity > 1 ? cart[index].quantity-- : cart.splice(index, 1);
  } else if (event.target.classList.contains("increase-quantity")) {
    cart[index].quantity++;
  } else if (event.target.classList.contains("remove-item")) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Checkout functionality
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to cart before proceeding.");
    return;
  }
}

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Add to Cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      addToCart(name, price);
    });
  });

  // Render cart and handle cart updates
  const cartTable = document.querySelector("#cart-table tbody");
  if (cartTable) {
    renderCart();
    cartTable.addEventListener("click", updateCart);
  }

  // Checkout button
  const checkoutButton = document.getElementById("checkout");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", checkout);
  }
});












// Function to save product as favourite, overwriting any existing favourite
document.querySelectorAll('.add-to-favourites').forEach(button => {
    button.addEventListener('click', function() {
      const product = {
        name: this.getAttribute('data-name'),
        price: this.getAttribute('data-price')
      };
  
      // Save the new favourite, overwriting any existing favourites
      localStorage.setItem('favouriteOrder', JSON.stringify(product));
  
      alert(`${product.name} has been added to favourites, replacing the previous favourite.`);
    });
  });
  
  // Function to apply saved favourite
  document.querySelectorAll('.apply-favourites').forEach(button => {
    button.addEventListener('click', function() {
      // Retrieve the saved favourite from localStorage
      const savedOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
  
      // Check if the current product matches the saved favourite
      const product = {
        name: this.getAttribute('data-name'),
        price: this.getAttribute('data-price')
      };
  
      if (savedOrder && savedOrder.name === product.name && savedOrder.price === product.price) {
        // Add the favourite product to the order table
        const table = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
        const row = table.insertRow(-1); // Insert at the end of the table
        row.insertCell(0).textContent = savedOrder.name;
        row.insertCell(1).textContent = `$${savedOrder.price}`;
  
        alert(`${savedOrder.name} has been added from favourites to your order.`);
      } else {
        alert(`${product.name} is not in your favourites.`);
      }
    });
  });













  document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('button[type="submit"]');
    const form = document.querySelector('form');

    // Add an event listener to the submit button
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form from actually submitting

        // Validate the form inputs
        if (validateForm()) {
            // Reset the shopping cart by clearing it from localStorage
            localStorage.removeItem('cart');
            localStorage.removeItem('favouriteOrder');

            // Show an alert with the thank you message
            alert('Thanks for ordering with HealthCare. Your order will take 2-3 days to deliver.');

            // Optionally, reset the form fields
            form.reset(); // Resets the form input fields

            // If you want to clear the cart table in the page, call the renderCart function again
            renderCart(); // This should be your function to re-render the cart table (clear it)
        }
    });

    // Function to validate the form
    function validateForm() {
        const address = document.querySelector('#address').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked');

        // Check if address is provided
        if (!address) {
            alert('Please enter your address.');
            return false;
        }

        // Check if a payment method is selected
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return false;
        }

        return true; // If all validations pass, return true
    }
});


// Adding event listener to the Checkout button
document.getElementById('checkout').addEventListener('click', function() {
    // Redirect to the checkout page (you can replace 'checkout.html' with your actual page URL)
    window.location.href = 'order.html';  // Or 'checkoutPage.html' or any other URL
  });
  
