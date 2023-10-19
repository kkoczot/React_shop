import React from "react"
import { Outlet, useLocation } from "react-router-dom"

import { db } from "../api.js"
import { onValue, ref } from 'firebase/database'

import Header from "./Header"
import Footer from "./Footer"
import Popup from "./Popup"

export default function Layout() {
    const [closed, setClosed] = React.useState(false);

    const [dataDB, setDataDB] = React.useState([]);

    const {pathname} = useLocation();

    React.useEffect(() => {
        const clothesDB = ref(db);
        return onValue(clothesDB, (snapshot) => {
            if (snapshot.exists()) {
                let itemsArray = Object.entries(snapshot.val());
        
                setDataDB([
                    itemsArray[0][1],
                    itemsArray[1][1],
                    itemsArray[2][1],
                    itemsArray[3][1],
                    itemsArray[4][1],
                    itemsArray[5][1],
                    itemsArray[6][1]
                ])
            }
        })
    }, [])

    function closePopup() {
        setClosed(true);
    }

    return (
        <div className="site-wrapper">
            <Header path={pathname} blur={closed} />
            {!closed && <Popup toggle={closePopup} />}
            <main className={!closed ? "blur" : ""} >
                <Outlet context={dataDB} />
            </main>
            <Footer blur={closed} />
        </div>
    )
}