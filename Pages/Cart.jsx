import React from "react"
import { Link, useOutletContext } from "react-router-dom";
import { ref, update } from "firebase/database";
import { db } from "../api.js"
import { getName } from "../assets/utils.js"

export default function Cart() {

    const [bought, setBought] = React.useState({status: false, message: 0});
    const [boughtError, setBoughtError] = React.useState({status: false, message: ""});
    const [cookieData, setCookieData] = React.useState(getRawCookies());
    const dataDB = useOutletContext()[1];
    const clothes = useOutletContext()[0];

    function getRawCookies() {
        const cookies = document.cookie;
        if(!cookies) return false;
        const decodeCookie = decodeURIComponent(cookies);
        return decodeCookie.split('=')[1]; 
    }

    function getCookies() {
        return JSON.parse(getRawCookies());
    }

    function checkZeros(price) {
        if(String(price).indexOf('.') === -1) {
            return `${price}.00`
        } else {
            return price.toFixed(2)
        }
    }

    function deleteCookie(cookie) {
        const d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000);
        const expires = "expires="+d.toUTCString();

        const decodeCookie = decodeURIComponent(document.cookie);
        if(decodeCookie) {
            const dataCookie = JSON.parse(decodeCookie.split('=')[1]);
            const newCookie = dataCookie.filter(dCookie => {if(!(dCookie.id == cookie.id && dCookie.size == cookie.size && dCookie.color == cookie.color)) return 1})
            if(newCookie?.length) {
                document.cookie = `clothes=${encodeURIComponent(JSON.stringify(newCookie))};${expires};path=/`
            } else {
                document.cookie = "clothes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            }
        }
        setCookieData(getRawCookies());
    }

    function checkErrors() {
        if(!getRawCookies()) {
            setBoughtError({status: true, message: "Wygląda na to, że nie ma już bluzek w twoim koszyku."});
            return false
        }
        if(!dataDB || !navigator.onLine) {
            setBoughtError({status: true, message: "Nie można połączyć się z bazą danych sklepu."})
            return false
        }
        return true
    }

    function deleteAllCookies() {
        if(checkErrors()) {
            try {
                const decodeCookie = decodeURIComponent(document.cookie)
                const dataCookie = JSON.parse(decodeCookie.split('=')[1]);
                dataCookie.map((dCookie) => {
                    if(dataDB[dCookie.thisId - 1].amount >= dCookie.amount) { //dataDB[dCookie.thisId - 1].amount == dCookie.item.amount
                        const reference = ref(db, 'clothes_attribs/' + (dCookie.thisId - 1));
                        update(reference, {
                            amount: (Number(dCookie.item.amount) - Number(dCookie.amount)),
                        })
                    } else {
                        window.alert(`Nie można kupić bluzki ${getName({clothe_id: dCookie.id}, clothes)} ponieważ w między czasie została wykupiona`);
                        setBought(prev => { return {...prev, message: "n"}});
                    }
                })
                setBought(prev => { return {...prev, status: true}});
            } catch (error) {
                setBoughtError({status: true, message: error.message})
            }
        }
        document.cookie= `clothes="";expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        setCookieData(getRawCookies());
    }

    return (
        <div className="cart">
            {
                (bought.status && !(boughtError.status)) && (
                    <div className="cart-bought">
                        <h3 className="cart-bought-title">Dziękujemy za kliknięcie guzika!</h3>
                        <p className="cart-bought-desc">Ilość koszulek danego koloru i rozmiaru została zmniejszona o kupioną ilość.</p>
                        <strong>
                            <p style={{display: bought.message === 'n' ? "block" : "none"}}>(Ilość części koszulek nie została zmniejszona przez i tak zbyt małą ich liczbę!)</p>
                        </strong>
                        <a className="specific-info-add-to-cart cart-btn-bought" rel="noreferrer" target="_blank" href="https://koszulkowo.com/" >Strona koszulkowo.com</a>
                        <Link className="specific-info-add-to-cart cart-btn-bought" to="/">Strona główna</Link>
                    </div>
                )
            }
            {
                boughtError.status && (
                    <div className="cart-bought">
                        <h3 className="cart-bought-title">Ups! Wystąpił błąd!</h3>
                        <p className="cart-bought-desc">{boughtError.message}</p>
                        <a className="specific-info-add-to-cart cart-btn-bought" rel="noreferrer" target="_blank" href="https://koszulkowo.com/" >Strona koszulkowo.com</a>
                        <Link className="specific-info-add-to-cart cart-btn-bought" to="/">Strona główna</Link>
                    </div>
                )
            }
            {
                (document.cookie && !(boughtError.status)) && getCookies().map((cookie, i) => (
                    <div className="cart-item" key={i}>
                            <Link to={`/${cookie.id}?size=${cookie.size}&color=${cookie.color}`}>
                                <img className="cart-item-img" src={cookie.path} />
                            </Link>
                            <div className="cart-item-desc">
                                <p>Ilość: {cookie.amount}</p>
                                <p>Rozmiar: {cookie.size}</p>
                                <p>Kolor: {cookie.color}</p>
                                <p>Cena: {checkZeros(cookie.price)}zł</p>
                            </div>
                            <button className="cart-item-delete" onClick={() => deleteCookie(cookie)}>
                                <i className="fa-solid fa-circle-xmark"></i>
                            </button>
                    </div>
                ))
            }
            {
                !document.cookie && <h1 style={{display: bought.status ? "none" : boughtError.status ? "none" : "block"}} className="cart-warning">Nie masz jeszcze prodtuktów w koszyku!</h1>
            }
            {
                (document.cookie && !(boughtError.status)) ? 
                <div className="cart-sumup">
                    <p className="cart-sumup-info">Całkowita ilość bluzek: <span>{getCookies().reduce((acc, cookie) => acc + cookie.amount,0)}</span></p>
                    <p className="cart-sumup-info">Całkowita cena do zapłaty: <span>{checkZeros(getCookies().reduce((acc, cookie) => acc + cookie.price * cookie.amount,0))}</span>zł</p>
                    <button className="cart-sumup-btn" disabled={bought.status} onClick={() => deleteAllCookies()}>KUP!</button>
                </div>
                : null
            }
        </div>
    )
}