
document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'de';
  applyLanguage(lang);
  document.querySelectorAll('.lang-select').forEach(el => {
    el.addEventListener('click', () => {
      const selectedLang = el.getAttribute('data-lang');
      localStorage.setItem('lang', selectedLang);
      applyLanguage(selectedLang);
    });
  });
  updateCartUI();
});

function applyLanguage(lang) {
  if (!translations[lang]) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleCart() {
  const panel = document.getElementById('cart-panel');
  panel.classList.toggle('open');
  updateCartUI();
}

function addToCart(button) {
  const card = button.closest('.product-card');
  const id = card.dataset.id;
  const name = card.dataset.name;
  const price = parseFloat(card.dataset.price);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total');
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartList.innerHTML += `
      <li>${item.name} (${item.qty}x) - ${(item.price * item.qty).toFixed(2)}€
        <button onclick="removeFromCart(${index})">✖</button>
      </li>
    `;
  });
  totalDisplay.textContent = total.toFixed(2);
}
