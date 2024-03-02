import PropTypes from "prop-types"
import { Link, NavLink} from "react-router-dom"

export default function Header(props) {
    
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        textDecorationColor: "gold"
    }

    const activeStyleCart = {
        color: "gold"
    }
    
    return (
        <header className={!props.blur ? "blur" : ""}>
            <div className={`header-wrapper ${props.path == '/' ? "header-wrapper-max" : ""}`}>
                <Link className="header-logo" to=".">#Bluzkowo</Link>
                <nav className="header-nav">
                    <NavLink className="header-nav-name header-nav-m" to="M" style={({isActive}) => isActive ? activeStyle : null}>
                        Mężczyźni
                    </NavLink> 
                    <NavLink to="K" className="header-nav-name header-nav-k" style={({isActive}) => isActive ? activeStyle : null}>
                        Kobiety
                    </NavLink>
                    <NavLink to="/cart" aria-label="cart" className="header-nav-cart" style={({isActive}) => isActive ? activeStyleCart : null}>
                        {window.navigator.onLine ? <i className="fa-solid fa-cart-shopping"></i> : <b>C</b>}
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

Header.propTypes = {
    blur: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired
}
