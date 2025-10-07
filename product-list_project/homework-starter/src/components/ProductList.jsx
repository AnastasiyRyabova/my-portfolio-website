import { Card } from './Card'
import '../main.css'

export const ProductList = ({products}) => {
    return(
        <div className='main'>
            <ul className='list'>
                {products.map(product => {
                    return (      
                       <Card key={product.id} product={product}/>
                    )
                })}
            </ul>
        </div>
    )
}
export default ProductList;