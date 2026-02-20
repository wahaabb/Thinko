import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData, dummyChats } from "../assets/assets"

const AppContext = createContext()
export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedchats, setSelectedChats] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUser = async () => {
        setUser(dummyUserData)
    }
    const fetchUserChats = async () => {
        setChats(dummyChats),
            setSelectedChats(dummyChats[0])
    }
    
useEffect(()=>{
if (theme==='dark') {
    document.documentElement.classList.add('dark')
}else{
        document.documentElement.classList.remove('dark')
}
localStorage.setItem('theme', theme)
},[theme])

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchUserChats()
        }
        else {
            setChats([]),
                setSelectedChats(null)
        }
    }, [user])

    const value = {
        navigate, user, setUser, fetchUser, chats, setChats,
        selectedchats, setSelectedChats, theme, setTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => useContext(AppContext)