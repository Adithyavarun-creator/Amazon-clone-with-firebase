import React from 'react'
import './Order.css'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './context/StateProvider'
import { getBasketTotal } from './reducer/reducer'


const Order = ({order}) => {

    const [{basket},dispatch] = useStateValue(0)

    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
        
        <p className='order-id'>
            <small>{order.id}</small>
        </p>
        {
            order.data.basket.map(item => (
                <CheckoutProduct  
                id={item.id}
                image={item.image}
                key={item.key}
                price={item.price}
                rating={item.rating}
                title={item.title}
                hideButton
                />
            ))
        }

                        <CurrencyFormat
                            renderText={(value) =>(
                                <>
                        <h3>Order total is {value}</h3>
                                </>
                        )}
                        decimalScale={2}
                        value={order.data.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        />
        </div>
    )
}

export default Order
