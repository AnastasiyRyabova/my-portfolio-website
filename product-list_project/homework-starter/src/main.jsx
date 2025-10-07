import ReactDOM from 'react-dom/client';

import { ProductList } from './components/ProductList'

import './main.css';
import products from './products';

const reactRoot = ReactDOM.createRoot(document.getElementById('root'));

// TODO: Реализовать компонент ProductList
reactRoot.render(<ProductList products={products}/>);
