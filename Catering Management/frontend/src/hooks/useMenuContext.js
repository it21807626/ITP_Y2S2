import { MenuContext } from "../context/menuContext"
import { useContext } from "react"

export const useMenucontext=()=>{
    const context=useContext(MenuContext)

    if(!context){
        throw Error('useMenuContext must be used insde an menuContextProvider')
    }

    return context
}

export default useMenucontext