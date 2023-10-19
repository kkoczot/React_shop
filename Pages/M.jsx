import { Link, useOutletContext, useSearchParams } from "react-router-dom"

import { getColors, getName, getPhotos, getPrice, mouseHover } from "../assets/utils";

export default function M() {
    const [searchParams] = useSearchParams();
    const priceFilter = searchParams.get("price");
    const colorFilter = searchParams.get("color");

    const dataDB = useOutletContext();
    const menPhotos = getPhotos(dataDB[4], "M");
    const clothes = dataDB[0];
    const clothesAttr = dataDB[1];
    const colors = dataDB[3];

    let elements = menPhotos.map(photo =>  (
        <div 
        key={photo[0].id} 
        className="collection-item"
        data-price={getPrice(photo[photo.length - 1], clothesAttr)}
        data-colors={getColors(photo[photo.length - 1], clothesAttr, colors)}
        >
            <div className="collection-img">
                <Link to={`/${photo[photo.length - 1].clothe_id}?color=${getColors(photo[photo.length - 1], clothesAttr, colors)[0]}&size=M`}>
                    <img
                    id={photo[0].id}
                    src={photo[0].path}
                    className="collection-first"
                    />
                    <img
                    id={photo[photo.length - 1].id}
                    src={photo[photo.length - 1].path}
                    title={getName(photo[photo.length - 1], clothes)}
                    className="collection-second"
                    onMouseLeave={(e) => mouseHover(e)}
                    onMouseEnter={(e) => mouseHover(e)}
                    />
                </Link>
            </div>
            <div className="collection-desc">
                <h3 className="collection-desc-title">{getName(photo[photo.length - 1], clothes)}</h3>
                <p className="collection-desc-colors">Dostępna ilość kolorów: <span>{photo.length - 1}</span></p>
                <p className="collection-desc-price">Cena: <span>{getPrice(photo[photo.length - 1], clothesAttr)}zł</span></p>
            </div>
        </div>
    ))

    if (priceFilter === 'h') {
        elements = elements.sort((a, b) => b.props["data-price"] - a.props["data-price"]);
    } else if (priceFilter === 'l') {
        elements = elements.sort((a, b) => a.props["data-price"] - b.props["data-price"]);
    }

    if (colorFilter) {
        const currentColors = colorFilter?.split('.');

        elements = elements.filter(element => {
            const arrayOfTruth = currentColors.map(cColor => element.props["data-colors"].includes(cColor) ? true : false)
            return arrayOfTruth.every(item => item)
        })
    }

    return (
        <div className="collection">
            <p>Męskie bluzki</p>
            <div className="collection-grid">
                {
                    elements.length > 0 ? elements
                    : clothes ? <h1>Nie ma bluzek odpowiadających szukanej kolorystyce :/</h1>
                    : <h1>Nie można połączyć się z bazą danych sklepu.</h1>
                }
            </div>
        </div>
    )
}