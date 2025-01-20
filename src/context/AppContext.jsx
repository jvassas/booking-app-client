import { createContext } from "react";
import { providers } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const value = {
        providers
    }

    return(

        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider