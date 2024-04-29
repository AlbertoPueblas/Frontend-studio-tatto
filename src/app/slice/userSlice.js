import { createSlice } from "@reduxjs/toolkit";

// creamos nuestro pasillo para el usuario (slice de user)
export const userSlice = createSlice({
    name: "user", // nombre del pasillo
    initialState: { // estado inicial del pasillo
        token: "",
        decodificado: {
            name: "",
            email: "",
            id: ""
        },
    },

    // distintas acciones que puedo realizar en este pasillo (todas reciben un state y un action y devuelven un nuevo estado)
    reducers: {
        login: (state, action) => {

            return {
                ...state,
                ...action.payload,
            }
        },

        logout: (state, action) => {

            return {
                token: "",
                decodificado: {
                    name: "",
                    email: "",
                    id: ""
                },
                vecesLogeado: state.vecesLogeado
            }
        },
        
        deleteUser: (state, action) => {

        
            return {
                ...state,
            }
        }
    }
})

// exportamos las acciones a las que accederemos a través del useDispatch para escribir en el almacén
export const {login, logout, deleteAcount} = userSlice.actions

// definimos y exportamos los métodos que nos permitirán venir al almacén a leer información
export const getUserData = (state) => state.user
export const getLoggedAmount = (state) => state.user.vecesLogeado
export const amIAdmin =(state) => state.user.decodificado.role === "ADMIN"

export default userSlice.reducer;