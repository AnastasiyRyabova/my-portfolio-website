import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";



class App extends React.Component {
  constructor(props){
    super(props) 
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Стул черный',
          img: 'chair-grey.jpeg',
          desc: 'Lorem ipsum dolor sit amet',
          category: 'chair',
          price: '49.99',
        },
        {
          id: 2,
          title: 'Стул белый',
          img: 'chair-white.jpeg',
          desc: 'Lorem ipsum dolor sit amet',
          category: 'chair',
          price: '49.99',
        },
        {
          id: 3,
          title: 'Диван',
          img: 'sofa.jpeg',
          desc: 'Lorem ipsum dolor sit amet',
          category: 'sofa',
          price: '99.05',
        },
        {
          id: 4,
          title: 'Стол',
          img: 'table.webp',
          desc: 'Lorem ipsum dolor sit amet',
          category: 'table',
          price: '130',
        },
        {
          id: 5,
          title: 'Светильник', 
          img: 'wall-light.jpeg',
          desc: 'Lorem ipsum dolor sit amet',
          category: 'light',
          price: '13.85',
        }
      ],
      showFullItem: false,
      fullItem: {}
    }
    this.state.currentItems = this.state.items
    this.addToOrder  = this.addToOrder.bind(this)
    this.deleteOrder  = this.deleteOrder.bind(this)
    this.chooseCategory  = this.chooseCategory.bind(this)
    this.onShowItem  = this.onShowItem.bind(this)
  }
  render() {
    return (
    <div className="wrapper">
      <Header orders={this.state.orders} onDelete={this.deleteOrder} />
      <Categories chooseCategory={this.chooseCategory} />
      <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
      {this.state.showFullItem  && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/> }
      <Footer />
    </div>
    );
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({ showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    if(category === 'all'){
      this.setState({currentItems: this.state.items})
      return
    }
    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }
  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el => el.id !== id)})
  }
  addToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === item.id)
      isInArray = true
    })
    if(!isInArray)
     this.setState({orders: [...this.state.orders, item]})
  }
}

export default App;
