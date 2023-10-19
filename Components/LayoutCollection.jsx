import React from "react"
import { Outlet, useOutletContext, useSearchParams } from "react-router-dom"

export default function LayoutCollection() {
    
    const [rolled, setRolled] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const colors = useOutletContext()[3] || [];

    const priceFilter = searchParams.get("price");
    const colorFilter = searchParams.get("color");

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if(key === "price") {
                if (value === null) {
                    prevParams.delete(key);
                } else {
                    prevParams.set(key, value);
                }
            } else {
                if (value === null) {
                    prevParams.delete(key);
                } else {
                    const wantedColors = prevParams.get(key)?.split('.') || []
                    if(wantedColors.includes(value)) {
                        let colors = ([...wantedColors.filter(color => color != value)].join('.'));
                        colors ? prevParams.set(key, colors) : prevParams.delete(key)
                    }
                    else {
                        prevParams.set(key, ([...wantedColors.concat(value)].join('.')));
                    }
                }
            }
            return prevParams
        })
    }

    return (
        <div className="layout-collection">
            <div className="filters">
                <div className="filters-main">
                    <button 
                        className="filters-main-title"
                        style={rolled ? {textDecorationColor: "gold"} : null}
                        onClick={() => setRolled(prev => !prev)}
                        ><h2>Filtry</h2>
                    </button>
                    <button 
                        className="filters-btn-clear"
                        onClick={() => handleFilterChange("price", null)}
                        style={priceFilter ? null : {visibility: "hidden", display: "none"}}
                    >Czyść filter cen</button>
                    <button 
                        className="filters-btn-clear"
                        onClick={() => handleFilterChange("color", null)}
                        style={colorFilter ? null : {visibility: "hidden", display: "none"}}
                    >Czyść filter koloru</button>
                </div>
                <div className="filters-section" style={rolled ? {display: "block"} : {display: "none"}}>
                    <div className="filters-section-price">
                        <h3>Cena:</h3>
                        <button
                            onClick={() => handleFilterChange("price", "h")}
                            className={
                                `filters-btn-price ${priceFilter === "h" ? "selected" : ""}`
                            }
                        >Najdroższe</button>
                        <button
                            onClick={() => handleFilterChange("price", "l")}
                            className={
                                `filters-btn-price ${priceFilter === "l" ? "selected" : ""}`
                            }
                        >Najtańsze</button>
                    </div>

                    <div className="filters-section-colors">
                        <h3>Kolory:</h3>
                        {
                            colors.length ? colors.map(color => (
                                <button 
                                    key={color.id}
                                    onClick={() => handleFilterChange("color", color.color)}
                                    className={`filters-btn-color ${colorFilter?.includes(color.color) ? "selected" : ""} ${color.color}`}
                                ></button>
                            )) : <p>Nie można połączyć się z bazą danych sklepu.</p>
                        }
                    </div>
                </div>
            </div>
            <Outlet context={useOutletContext()}/> 
        </div>
    )
}