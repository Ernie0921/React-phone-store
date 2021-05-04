import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();  //context API 
//Provider- pass data into our components 
//Consumer- grap props anywhere from our application 

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct
    };
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=> {
            return {products:tempProducts}
        })
    }

    getitem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product; 
    }

    handleDetail = (id) => {
       const product = this.getitem(id);
        this.setState(() =>{
            return{detailProduct:product}
        })
    }

    addToCart = (id) => {
        console.log(`hello from add to cart.id is ${id}`)
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,

            }}>
                {this.props.children}
            </ProductContext.Provider>
            
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };




