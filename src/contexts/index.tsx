'use client'
import React, {
    createContext,
    useState,
    useContext
  } from 'react'

const AppContext = createContext<any>(undefined);

export function AppWrapper({children}:{
    children: React.ReactNode;
  }){

    let [mode, setMode] = useState("mode initial value");
    let [name, setName] = useState("Yacine");
    let [chatId, setChatId] = useState(0);

    //State PRD
    let [prdId, setPrdId] = useState(0);
    let [industry, setIndustry] = useState(0);
    let [company, setCompany] = useState(0);
    let [description, setDescription] = useState(0);
    let [strategy, setStrategy] = useState(0);
    let [persona, setPersona] = useState(0);
    let [feature, setFeature] = useState(0);


    let sharedState = {
        mode,setMode,
        name,setName,
        chatId, setChatId,
        prdId, setPrdId,
        industry,setIndustry,
        company,setCompany,
        description,setDescription,
        strategy,setStrategy,
        persona,setPersona,
        feature, setFeature
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
      )

}

export function useAppContext() {
    return useContext(AppContext);
}