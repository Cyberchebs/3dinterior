import {createContext, useRef,useContext, useState, useEffect} from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({children}) => {


    const [modelReady, setModelReady] = useState(false);
    const [isSection2Visible, setIsSection2Visible] = useState(false)
    
   



    const canRef = useRef(null);
    const modelRef = useRef(null);
    const red = 10

        useEffect(() => {
    if (modelRef.current) {
        modelRef.current.rotation.set(0, 1.5, 0) // adjust this value
    }
    }, [modelRef.current])

    return(
        <ThemeContext.Provider value={{canRef, red, modelRef,modelReady,isSection2Visible, setIsSection2Visible}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);