import axios from "axios";
import { createContext } from "react";

export const DisplayContext=createContext(null);
export function DisplayContextProvider({children})
{
    const displayRecentEstate = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?pageNumber=1");
        return data;
    };

    const displayHouse = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=House&pageNumber=1");
        return data;
    };

    const displayLand = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/estate/all?typeEatateS=Land&pageNumber=1");
        return data;
    };

    const displayFeedback = async () => {
        const { data } = await axios.get("https://estatetest.onrender.com/api/feedback/all?pageNum=1");
        return data;
    };
    return <DisplayContext.Provider value={{displayRecentEstate,displayHouse,displayLand,displayFeedback}}>
        {children}
    </DisplayContext.Provider>
}
