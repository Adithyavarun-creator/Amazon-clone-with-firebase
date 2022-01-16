import React from 'react'
import './Product.css'
import { ADD_TO_BASKET } from './reducer/actiontype'
import { useStateValue } from './context/StateProvider'


const Product = ({id,title,image,price,rating}) => {

     const [state,dispatch] = useStateValue()

    const addToBasket = () => {
        dispatch({
            type:ADD_TO_BASKET,
            item:{
                id:id,
                title:title,
                price:price,
                image:image,
                rating:rating
            }
        })
    }

    return (
        <div className='product' key={id}>
            <div className='product-info'>
                <p>{title}</p>
                <p className='product-price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='product-rating'>
                    {
                        Array(rating).fill().map((_,i)=>(
                            <p key={i}>⭐</p>
                        ))
                    }
                </div>
                </div>

                <img src={image} />
                <button onClick={addToBasket}>Add To Basket</button>
        </div>
    )
}

export default Product
