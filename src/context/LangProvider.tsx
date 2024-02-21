import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LangContextProps {
    lang: string
    setLang: React.Dispatch<React.SetStateAction<string>>
}

interface LangProviderProps {
    children: ReactNode
}


const LangContext = createContext<LangContextProps | undefined>(undefined)

export const LangProvider: React.FC<LangProviderProps> = ({ children }) => {

    const [lang, setLang] = useState<object>({})

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    )
}

export const useLang = (): LangContextProps => {
    const context = useContext(LangContext)
    if (!context) {
        throw new Error('useLoader must be used within a LangProvider')
    }
    return context
}