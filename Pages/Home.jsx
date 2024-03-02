import { useOutletContext } from "react-router-dom"

import { getPhotos, getRandomPhotos } from "../assets/utils"

import Slider from "../Components/Slider"
import bannerUrl from "../assets/banner.jpg"

export default function Home() {
    const dataDB = useOutletContext();
    const menPhotos = getRandomPhotos(getPhotos(dataDB[4], "M"));
    const womenPhotos = getRandomPhotos(getPhotos(dataDB[4], "K"));

    return (
        <div className="home">
            <div className="home-banner-wrapper">
                <img className="home-banner" alt="Homepage banner" src={bannerUrl} />
                <p className="home-banner-desc">Witaj na <span><span>#</span>Bluzkowo</span></p>
            </div>
            <div className="home-content">
                <h1 className="home-title">Najlepsze bluzki z zabawnymi nadrukami!</h1>
            
                <h3 className="home-slider-title">Bluzki męskie:</h3>
                <div className="home-slider-wrapper">
                    {<Slider photos={menPhotos} clothes={dataDB[0]} clothesAttr={dataDB[1]} colors={dataDB[3]} />}
                </div>

                <h3 className="home-slider-title" style={{marginTop: "2rem"}}>Bluzki damskie:</h3>
                <div className="home-slider-wrapper">
                    {<Slider photos={womenPhotos} clothes={dataDB[0]} clothesAttr={dataDB[1]} colors={dataDB[3]} />}
                </div>
            </div>
        </div>
    )
}
