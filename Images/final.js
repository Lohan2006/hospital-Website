// Initialize cart and favourites from localStorage if available
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

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
        <td>${item.quantity}</td>
        <td>$${itemTotal.toFixed(2)}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      </tr>`;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Render favourites items in a table
function renderFavourites() {
  const favouritesTable = document.querySelector("#favourites-table tbody");

  favouritesTable.innerHTML = ""; // Clear the table
  favourites.forEach((item) => {
    favouritesTable.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
      </tr>`;
  });
}

// Remove an item from the cart
function updateCart(event) {
  const index = event.target.getAttribute("data-index");
  if (event.target.classList.contains("remove-item")) {
    cart.splice(index, 1);
    renderCart();
    localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
  }
}

// Handle the contact form submission
function handleContactFormSubmission(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Here you would typically send the data to a server or handle it as needed
  alert(`Contact form submitted:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Render cart and favourites when the page loads
  renderCart();
  renderFavourites();

  // Add event listener to remove item from cart
  const cartTable = document.querySelector("#cart-table tbody");
  if (cartTable) {
    cartTable.addEventListener("click", updateCart);
  }

  // Handle contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmission);
  }
});
