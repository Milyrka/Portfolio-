"use client";

import {createContext,useContext,useState} from "react";

export type Language="ru"|"en";
const LanguageContext=createContext<{language:Language;toggleLanguage:()=>void}>({language:"ru",toggleLanguage:()=>undefined});

export function LanguageProvider({children}:{children:React.ReactNode}){
  const [language,setLanguage]=useState<Language>("ru");
  const toggleLanguage=()=>setLanguage(current=>current==="ru"?"en":"ru");
  return <LanguageContext.Provider value={{language,toggleLanguage}}>{children}</LanguageContext.Provider>;
}

export const useLanguage=()=>useContext(LanguageContext);
