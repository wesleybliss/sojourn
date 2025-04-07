import * as store from '@/store'

export const toggleTheme = () => {
    
    store.theme.setValue(
        store.theme.getValue() === 'light'
            ? 'dark'
            : 'light')
    
}
