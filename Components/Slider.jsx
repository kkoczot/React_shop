import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { getColors, getName, getPrice, mouseHover } from "../assets/utils"

export default function Slider({photos, clothes, clothesAttr, colors}) {
    return (
        <div className={clothes ? "slider-carousel" : ""}>
            {
                !clothes && <h3 style={{marginLeft: "1rem"}}>Nie można połączyć się z bazą danych sklepu.</h3>
            }
            {photos.map(photo => {
                return (
                    <div key={photo[0].id} className="slider-item">
                        <div className="slider-item-part1">
                            <Link key={photo[0].id} to={`/${photo[photo.length - 1].clothe_id}?color=${getColors(photo[photo.length - 1], clothesAttr, colors)[0]}&size=M`}>
                                <img
                                id={photo[0].id}
                                src={photo[0].path}
                                className="slider-item-img slider-item-img1"
                                />
                                <img
                                id={photo[photo.length - 1].id}
                                src={photo[photo.length - 1].path}
                                title={getName(photo[photo.length - 1], clothes)}
                                className="slider-item-img slider-item-img2"
                                onMouseEnter={(e) => mouseHover(e)}
                                onMouseLeave={(e) => mouseHover(e)}
                                />
                            </Link>
                        </div>
                        <div className="slider-item-part2">
                            <h3 className="slider-item-title">{getName(photo[photo.length - 1], clothes)}</h3>
                            <p className="slider-item-colors">Dostępna ilość kolorów: <span>{photo.length - 1}</span></p>
                            <p className="slider-item-price">Cena: <span>{getPrice(photo[photo.length - 1], clothesAttr)}zł</span></p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

Slider.propTypes = {
    photos: PropTypes.array,
    clothes: PropTypes.array,
    clothesAttr: PropTypes.array,
    colors: PropTypes.array,
}