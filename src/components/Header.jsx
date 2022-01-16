import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon  from '@material-ui/icons/ShoppingBasket'
import { useStateValue } from './context/StateProvider'
import { auth } from '../firebase'

const Header = () => {

    const [{basket,user},dispatch] = useStateValue()

    const handleSignIn = () => {
        if(user) {
            auth.signOut()
        }
    }

    return (
        <div className='header'>
            <Link to="/">
            <img className='header-logo'
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>

        <div className='header-search'>
            <input className='header-searchInput' type="text" />
            <SearchIcon className='header-searchIcon'/>
        </div>

        <div className='header-nav'>
            <Link to={!user && '/login'}>
            <div className='header-option' onClick={handleSignIn}>
                <span className='header-optionLineOne'>
                    Hello Guest
                </span>
                <span className='header-optionLineTwo'>
                    {
                        user ? "Sign Out" : "Sign In"
                    }
                </span>
            </div>
            </Link>

            <Link to="/orders">
            <div className='header-option'>
            <span className='header-optionLineOne'>
                    Returns
                </span>
                <span className='header-optionLineTwo'>
                    Orders
                </span>
            </div>
            </Link>

            <div className='header-option'>
            <span className='header-optionLineOne'>
                    Your
                </span>
                <span className='header-optionLineTwo'>
                    Prime
                </span>
            </div>

            <Link to="/checkout">
            <div className='header-optionBasket'>
                <ShoppingBasketIcon />
                <span className='header-optionLineTwo header-basketCount'>
                    {basket?.length}
                </span>
            </div>
            </Link>
        </div>
        </div>
    )
}

export default Header
