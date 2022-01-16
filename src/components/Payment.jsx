import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './context/StateProvider'
import { getBasketTotal } from './reducer/reducer';
import CurrencyFormat from 'react-currency-format';
import './Payment.css'
import { EMPTY_BASKET } from './reducer/actiontype';
import { Link,useHistory } from 'react-router-dom';
import axios from '../axios'
import { CardElement, useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
//for database firestore
import { db } from '../firebase';

const Payment = () => {
    const [{user,basket},dispatch] = useStateValue();
    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()

    const [error,setError] = useState(null)
    const [disabled,setDisabled] = useState(true)
    const [processing,setProcessing] = useState("")
    const [succeeded,setSucceeded] = useState(false)
    const [clientSecret,setClientSecret] = useState(true)

    useEffect(()=>{
        const getClientSecret = async () => {
            const response = await axios({
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    },[basket])

    console.log(`The secret is ===> ${clientSecret}`);

    const handleSubmit = async(event) => {
        //stripe stuffs
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type:EMPTY_BASKET
            })

            history.replace('/orders')
        })
    }


    const handleChange = (event) => {
        //changes in cardelement when customer types
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <div className='payment-container'>
                <h1>
                    Checkout (
                        <Link to='/checkout'>{basket.length} items</Link>
                    )
                </h1>
                <div className='payment-section'>
                    <div className='payment-title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment-address'>
                        <p>{user.email}</p>
                        <p>Anywhere throughout world</p>
                        <p>Cannot be sent to your address</p>

                    </div>
                </div>

                <div className='payment-section'>
                <div className='payment-title'>
                    <h3>Review items and delivery</h3>
                </div>
                    <div className='payment-items'>
                        {
                            basket.map((item)=>(
                                <CheckoutProduct 
                                image={item.image}
                                key={item.id}
                                id={item.id}
                                rating={item.rating}
                                title={item.title}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className='payment-section'>
                <div className='payment-title'>
                    <h3>Payment Method</h3>
                    </div>
                    <div className='payment-details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement 
                            onChange={handleChange}
                            />
                            <div className='payment-priceContainer'>
                            <CurrencyFormat
                            renderText={(value) =>(
                                <>
                        <h3>Order total is {value}</h3>
                                </>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        />
                        <button 
                        disabled={processing || disabled || succeeded}>
                            <span>{processing ? 
                            <p>Processing</p> : "Buy Now"    
                        }</span>
                        </button>
                            </div>

                            {
                                error && <div>{error}</div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
