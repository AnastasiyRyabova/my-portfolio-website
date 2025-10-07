import '../main.css'

export const Card = ({product}) => {
  const {title, price, discount, imageUrl} = product;
  return (
          <li className="item">
            <img src={`${imageUrl}`} alt="Фото товара" />
            {discount ? (
              <span className='new-price'>
                {price - (price  *  discount)} p 
                <strike className='full-price'>{price} p </strike>
              </span>
            ) : (
              <span className='price'>{price} p </span>
            )}
            <h2 className='title'>{title}</h2>
          </li>
        );
      }
export default Card;
