import { createContext, useReducer} from 'react'

export const MenuContext = createContext()
export const menuReducer=(state, action)=>{
    switch(action.type){
        case'SET_MENU':
        return{
            menu:action.payload
        }
        case 'CREATE_MENU':
            return{
                menu:[action.payload, ...state.menu]
            }  
            case 'DELETE_MENU':
                return{
                    menu:state.menu.filter((m)=>m._id!==action.payload._id)
                }
                case 'UPDATE_MENU':
          return {
            menu: state.menu.map((m) =>m._id === action.payload._id ? action.payload : m)
          }  
            default:
                return state
    }

}

export const MenuContextProvider=({children})=>{

    const [state,dispatch]=useReducer(menuReducer,{
        menu:null
    })

    

    return(
        <MenuContext.Provider value={{...state, dispatch}}>
          {children}
        </MenuContext.Provider>
    )
}

