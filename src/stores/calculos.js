import {defineStore} from "pinia";
import {ref} from "vue";

export const useCalculosStore = defineStore("calculosStore", () => {
    const datos = ref()

    const add = (dato) =>{
        console.log(dato);
        datos.value = dato;
    }

    return{
        datos,
        add,
    };
})