document.addEventListener('DOMContentLoaded', () => {
  /* ====== эффект перемешивания логотипа ====== */
  const brandEl = document.getElementById('logo');
  const original = brandEl.dataset.text;
  const chars = original.split('');
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);

  brandEl.addEventListener('mouseenter', () => {
    brandEl.textContent = shuffle([...chars]).join('');
  });
  brandEl.addEventListener('mouseleave', () => {
    brandEl.textContent = original;
  });

  /* ====== открытие товарных модалок ====== */
  document.querySelectorAll('.product').forEach(card => {
    card.addEventListener('click', () => {
      const modal = document.getElementById(card.dataset.modal);
      if (modal) modal.style.display = 'flex';
    });
  });

  /* ====== закрытие любых модалок ====== */
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  /* ====== КОРЗИНА ====== */
  const cart = []; // массив строк‑названий
  const countEl = document.querySelector('.count');
  const cartModal = document.getElementById('modal-cart');
  const cartList = document.getElementById('cart-list');
  const emptyMsg = document.getElementById('empty-cart');
  const checkout = document.getElementById('checkout');

  // открыть корзину
  document.querySelector('.cart').addEventListener('click', () => {
    cartModal.style.display = 'flex';
  });

  /* ===== helper: перерисовать список ===== */
  function renderCart() {
    cartList.innerHTML = '';
    cart.forEach((title, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${title}
        <button class="remove-item" data-index="${i}" title="Удалить">×</button>
      `;
      cartList.appendChild(li);
    });

    countEl.textContent = cart.length;
    emptyMsg.style.display = cart.length ? 'none' : '';
    checkout.disabled = cart.length === 0;
  }

  /* ===== добавить в корзину ===== */
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    // НЕ трогаем кнопку checkout!
    if (btn.id === 'checkout') return;

    btn.addEventListener('click', () => {
      const title = btn.closest('.modal-content')
                       .querySelector('h2').textContent;
      cart.push(title);
      renderCart();
      btn.closest('.modal').style.display = 'none';
    });
  });

  /* ===== удалить из корзины (делегирование) ===== */
  cartList.addEventListener('click', e => {
    if (e.target.matches('.remove-item')) {
      const idx = +e.target.dataset.index;
      cart.splice(idx, 1);
      renderCart();
    }
  });

  /* ===== оформить заказ ===== */
  checkout.addEventListener('click', () => {
    cart.length = 0;
    renderCart();
    alert('Спасибо за заказ!');
    cartModal.style.display = 'none';
  });
});
