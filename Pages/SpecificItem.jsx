import React from "react"
import { useOutletContext, useParams, useSearchParams } from "react-router-dom"
import { 
    checkIfExists,
    getColors,
    getName,
    getPrice,
    getSpecificDesc,
    getSpecificItem,
    getSpecificPhotos
} from "../assets/utils";

import NotFound from "./NotFound"

export default function SpecificItem() {
    const dataDB = useOutletContext();

    const [checkCloser, setCheckCloser] = React.useState(false);
    const [addedToCart, setAddedToCart] = React.useState("");
    const [currentImagePath, setCurrentImagePath] = React.useState(null);
    const [currentInfo, setCurrentInfo] = React.useState("desc");
    const [amountOfClothe, setAmountOfClothe] = React.useState(1);
    
    const [searchParams, setSearchParams] = useSearchParams()
    const sizeFilter = searchParams.get("size");
    const colorFilter = searchParams.get("color");
    const id = {clothe_id: useParams().id}
    const sizes = dataDB[6] || [];
    
    if(!checkIfExists(id.clothe_id, dataDB[1], colorFilter, dataDB[3], sizeFilter, sizes)) return <NotFound />
    
    const thesePhotos = getSpecificPhotos(id.clothe_id, dataDB[4]) || [];
    const theseColors = getColors(id, dataDB[1], dataDB[3]) || [];
    const clothesAttr = dataDB[1] || [];
    const clothes = dataDB[0] || [];
    const clothesPhotos = dataDB[2];
    const specificItem = getSpecificItem(id.clothe_id, sizeFilter, sizes, colorFilter, dataDB[3], clothesAttr, sizes);
    const currentClothePhotoData = clothesPhotos.filter(cp => cp.clothes_attrib_id == specificItem.id)[0];
    const currentPhoto = thesePhotos.filter(photo => photo.id == currentClothePhotoData.photo_id)[0];
    
    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if(value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams
        })
    }

    function showAddToCartInfo() {
        if(!addedToCart) {
            setAddedToCart("show-add-info");
            setTimeout(() => setAddedToCart(""), 2000);
        } else {
            setAddedToCart("");
        }
    }

    function setCookie(amount) {
        showAddToCartInfo();
        const thisCookie = checkCookie();

        const decodeCookie = decodeURIComponent(document.cookie);
        const dataCookie = decodeCookie ? JSON.parse(decodeCookie.split('=')[1]) : false;

        const d = new Date();
        d.setTime(d.getTime() + 24*60*60*1000);
        const expires = "expires="+d.toUTCString();

        let data = null;

        if(!thisCookie) {
            if(dataCookie) {
                data = JSON.stringify([{id: Number(id.clothe_id), item: specificItem, thisId: specificItem.id, amount: amount, size: sizeFilter, color: colorFilter, price: specificItem.price, path: currentPhoto.path}, ...dataCookie]);
            } else {
                data = JSON.stringify([{id: Number(id.clothe_id), item: specificItem, thisId: specificItem.id, amount: amount, size: sizeFilter, color: colorFilter, price: specificItem.price, path: currentPhoto.path}]);
            }
        } else {
            thisCookie.amount = amount;
            thisCookie.size = sizeFilter;
            thisCookie.color = colorFilter;
            thisCookie.item = specificItem;
            if(dataCookie) {
                data = JSON.stringify([{...thisCookie}, ...dataCookie.filter(item => {if(!(item.id == id.clothe_id && item.size == sizeFilter && item.color == colorFilter)) return 1})]);
            } else {
                data = JSON.stringify([{...thisCookie}]);
            }
        }
        document.cookie = `clothes=${encodeURIComponent(data)};${expires};path=/`
    }
    function checkCookie() {
        let decodeCookie = decodeURIComponent(document.cookie);
        const data = decodeCookie ? JSON.parse(decodeCookie.split('=')[1]) : false;
        if(!data) return false;
        return data.filter(item => {if(item.id == id.clothe_id && item.size == sizeFilter && item.color == colorFilter) return item})[0]
    }

    return (
        <>
            <div className={`specific-check-closer ${checkCloser ? "check-closer-open" : ""}`}>
                <img title="kliknij aby zmniejszyć" onClick={() => setCheckCloser(false)} src={currentImagePath || currentPhoto.path} />
            </div>
            <div className="specific">
                <div className={`add-info ${addedToCart}`}>Dodano do koszyka</div>
                <div className="specific-images">
                    <img className="specific-image" title="kliknij aby powiększyć" onClick={() => setCheckCloser(true)} src={currentImagePath || currentPhoto.path} />
                    <div className="specific-images-all">
                        {
                            thesePhotos.map(photo => (
                               <button className="none-btn" key={photo.id}>
                                    <img
                                    src={photo.path}
                                    data-path={photo.path}
                                    onClick={(e) => setCurrentImagePath(e.target.dataset.path)}
                                    className="specific-image-thumbnail"
                                    />
                               </button>
                                ))
                            }
                    </div>
                </div>
                <div className="specific-info">
                    <h1 className="specific-info-title">{getName(id, dataDB[0])}</h1>
                    <p className="specific-info-price">Cena: {getPrice(id, dataDB[1])}zł</p>
                    <div className="specific-info-colors">
                        <p>Kolory: </p>
                        {
                            theseColors.map((color, i) => (
                                <button
                                key={i}
                                onClick={() => handleFilterChange("color", color)}
                                className={`filters-btn-color ${color} ${colorFilter === color ? "selected" : ""}`}
                                ></button>
                                ))
                            }
                    </div>
                    <div className="specific-info-sizes">
                        <p>Rozmiary: </p>
                        {
                            sizes.map((size) => (
                                <button
                                key={size.id}
                                onClick={() => handleFilterChange("size", size.size)}
                                className={`filters-size-btn ${sizeFilter === size.size ? "selected" : ""}`}
                                >{size.size}</button>
                                ))
                            }
                    </div>

                    <p className="specific-info-amount" style={{color: specificItem?.amount ? "black" : "red"}}>Dostępna ilość: {specificItem?.amount}</p>
                    <div className="specific-info-add">
                        <button
                            className="specific-info-decrement"
                            disabled={!specificItem?.amount}
                            onClick={() => setAmountOfClothe(prev => prev - 1 < 1 ? 1 : prev - 1)}
                            >-</button>
                        <span className="specific-info-current-amount">{amountOfClothe}</span>
                        <button
                            className="specific-info-increment"
                            disabled={!specificItem?.amount}
                            onClick={() => setAmountOfClothe(prev => prev + 1 > specificItem?.amount ? specificItem?.amount : prev + 1)}
                            >+</button>
                        <button
                            className="specific-info-add-to-cart"
                            disabled={specificItem?.amount === 0}
                            onClick={() => setCookie(amountOfClothe)}
                        > Dodaj do koszyka </button>
                    </div>

                </div>
            </div>
            <div className="specific-desc">
                <button onClick={() => setCurrentInfo("desc")} className={`specific-desc-btn ${currentInfo === "desc" ? "selectedBtn": ""}`}>
                    <h3>Opis</h3>
                </button>
                <button onClick={() => setCurrentInfo("colors")} className={`specific-desc-btn ${currentInfo === "colors" ? "selectedBtn": ""}`}>
                    <h3>Kolory</h3>
                </button>
                <hr style={{borderWidth: "4px", margin: "0 0.5em"}} />
                <div style={{display: currentInfo === "desc" ? "block" : "none"}} className="specific-desc-info">
                    {
                        getSpecificDesc(id.clothe_id, clothes).map((d, i) => (
                            <p key={i+100}>{d}</p>
                            ))
                        }
                </div>
                <div style={{display: currentInfo === "colors" ? "block" : "none"}} className="specific-desc-colors">
                    {
                        theseColors.map((color, i) => (
                            <p key={i+200}>{color}</p>
                            ))
                        }
                </div>
            </div>
        </>
    )
}