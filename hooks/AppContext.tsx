import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { loadNewsFeed, NewsItem } from '../components/NewsLoader';


export type AppState = {
    newsItems: NewsItem[]
}


export const AppStateContext = createContext<{
    appState: AppState
    setAppState: Dispatch<SetStateAction<AppState>>
} | undefined>(undefined)


export function AppStateProvider({ children }: { children?: ReactNode}) {
    const [appState, setAppState] = useState<AppState>({
        newsItems: []
    })
    useEffect(() => {
        (async () => {
            const items = await loadNewsFeed()
            const newState: AppState = {...appState, newsItems: items}
            setAppState(newState)
        })()
    }, [])


    return (
        <AppStateContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppStateContext.Provider>
    )
}


export function useAppState() {
    const context = useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('no provider for AppStateContext')
    }
    return context
}
