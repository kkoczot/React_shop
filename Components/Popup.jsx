import PropTypes from "prop-types"

export default function Popup({toggle}) {

    return (
        <div className="popup">
            <button className="popup-btn" onClick={() => {toggle()}}>X</button>
            <h1 className="popup-title">uwaga</h1>
            <p className="popup-text">
                Niniejsza strona jest tylko projektem. Nie można na niej nic kupić.
                Wszelkie zdjęcia pochodzą ze strony <a className="popup-link" rel="noreferrer" target="_blank" href="https://koszulkowo.com/">koszulkowo</a>.
                Na niej również można (było) dokonać zakupu koszulek użytych w tym projekcie.
            </p>
        </div>
    )
}

Popup.propTypes = {
    toggle: PropTypes.func.isRequired,
}