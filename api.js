import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const appSettings = {databaseURL: "https://reactshop-eeb2c-default-rtdb.europe-west1.firebasedatabase.app/"}

const app = initializeApp(appSettings)
export const db = getDatabase(app)