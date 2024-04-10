import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice ({
    name: 'user',
    initialState: {
        token:"",
        decoded: {
            name:"",
            email:"",
            id:""
        },
        vecesLogeado: 5
    },

    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload,
                vecesLogeado: state.vecesLogeado +1
            }
        },

        logOut: (state, action) => {
            return {
                token:"",
                decoded: {
                    name:"",
                    email:"",
                    id:""
                },
                vecesLogeado: state.vecesLogeado
            }
        },
        resetCount: (state, action) => {
            return {
               ...state,
                vecesLogeado: 0
            }
        }
    }
})

export const { login, logOut, resetCount } = userSlice.actions;
export const getUserData = (state) => state.user
export const getLoggedAmount = (state) => state.user.vecesLogeado
export default userSlice.reducer