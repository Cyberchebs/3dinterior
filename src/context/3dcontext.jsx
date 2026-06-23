import {createContext, useRef,useContext, useCallback, useState} from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({children}) => {


    const [modelReady, setModelReady] = useState(false);
    
   



    const canRef = useRef(null);
    const modelRef = useRef(null);
    const red = 10

     const setSupraRef = useCallback((node) => {
        modelRef.current = node;
        if (node) setModelReady(true);
        }, []);


    return(
        <ThemeContext.Provider value={{canRef, red, modelRef,modelReady, setSupraRef}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);