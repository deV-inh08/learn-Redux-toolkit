import React, { createContext, useState } from "react";

interface AppContextInterface {
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
    isEdit: false,
    setIsEdit: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: {children: React.ReactNode}) => {
    const [isEdit, setIsEdit] = useState<boolean>(initialAppContext.isEdit);

    const value = {
        isEdit,
        setIsEdit
    };


    return (
       <AppContext.Provider value={value}>
        {children}
       </AppContext.Provider>
    )
}
