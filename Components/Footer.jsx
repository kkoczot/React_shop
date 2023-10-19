import PropTypes from "prop-types"
export default function Footer(props) {
    return (
        <footer className={!props.blur ? "blur" : ""}>
            <p className="footer-contact"><a href="mailto:kacper04business@gmail.com">kontakt: kacper04business@gmail.com</a></p>
            <p className="footer-link">Oryginalna <a rel="noreferrer" href="http://koszulkowo.com" target="_blank">STRONA</a>, z której zaczerpnięto motywy</p>
            <p className="footer-rights">copyright © {new Date().getFullYear()} bluzkowo. <br /> all rights reserved</p>
        </footer>
    )
}

Footer.propTypes = {
    blur: PropTypes.bool.isRequired,
}