async function fetchProducts() {
  const loader = document.getElementById('loader');
  const productsContainer = document.getElementById('products');

  loader.style.display = 'block';
  productsContainer.innerHTML = '';

  try {
      const response = await fetch('/api/products');
      if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();
      if (!data.products) {
          throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
      }

      if (data.products.length === 0) {
          productsContainer.innerHTML = '<h2>Список товаров пуст</h2>';
          return;
      }

      data.products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'col-md-4 mb-4';
          productCard.innerHTML = `
              <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.price} ₽</p>
                  </div>
              </div>
          `;
          productsContainer.appendChild(productCard);
      });
  } catch (error) {
      showNotification(error.message);
  } finally {
      loader.style.display = 'none';
  }
}

function showNotification(message) {
  const notificationsContainer = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.className = 'alert alert-danger notification';
  notification.textContent = message;
  notificationsContainer.appendChild(notification);

  setTimeout(() => {
      notificationsContainer.removeChild(notification);
  }, 3000);
}


window.addEventListener('online', () => showNotification('Вы снова в сети!'));
window.addEventListener('offline', () => showNotification('Произошла ошибка, проверьте подключение к интернету.'));

fetchProducts();
