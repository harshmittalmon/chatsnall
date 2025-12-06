import {create} from "zustand"; 

export const useAuthStore = create( (set)=>({
    authUser: {name : "Harsh", _id: 123, age: 21},
    isLoggedIn: false,
    login: ()=>{
        console.log("We just logged in");
        set({isLoggedIn:true});
    },
    logout: ()=>{
        console.log("We just logged out");
        set({isLoggedIn: false});
    }
}));