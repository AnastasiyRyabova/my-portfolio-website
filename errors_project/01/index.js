export function calculateDiscount(price, percent) {
  if (typeof price !== 'number' || typeof percent !== 'number') {
      throw new TypeError('Оба аргумента должны быть числами');
  }
  return (price / 100) * percent;
}

export function getMarketingPrice(product) {
  try {
      const productObject = JSON.parse(product);

      return productObject.prices ? productObject.prices.marketingPrice || null : null;
  } catch (error) {
      return null;
  }
}

function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
      reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  try {
      const image = await fetchAvatarImage(userId);
      return image.url;
  } catch (error) {
      return '/images/default.jpg';
  }
}
