import React from 'react'
import './Checkout.css'

import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './context/StateProvider'

const Checkout = () => {

    const [{basket,user},dispatch] = useStateValue()

    return (
        <div className='checkout'>
            <div className='checkout-left'>
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                className='checkout-ad' alt=""/>

                <div>
                    <h3>Hello, {user.email}</h3>
                    <h2 className='checkout-title'>Your Shopping basket</h2>
                    {
                        basket.map((item)=>(
                            <CheckoutProduct 
                            key={item.id}
                            id={item.id}
                            rating={item.rating}
                            image={item.image}
                            price={item.price}
                            title={item.title}
                            />
                        ))
                    }
                </div>
            </div>

            <div className='checkout-right'>
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
