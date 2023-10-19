import { Link, useLocation } from "react-router-dom"

export default function NotFound() {
    const {pathname} = useLocation()
    return (
        <div className="not-found">
            {
                window.navigator.onLine ?
                <h1 className="not-found-title">Ups!<br /> 404</h1> :
                <h1 className="not-connected-title">Ups!<br /> Brak połączenia :/</h1>
            }
            {
                window.navigator.onLine ?
                <p className="not-found-desc">
                    Wychodzi na to, że strona <span className="not-found-path">{pathname.slice(1)}</span> nie istnieje!
                </p> :
                <p className="not-found-desc">
                    Wychodzi na to, że nie masz połączenia z internetem :(
                </p>
            }
            <Link className="not-found-link" to="/">Strona główna</Link>
        </div>
    )
}