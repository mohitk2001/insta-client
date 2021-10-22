export const Add_for_Post=(number)=>{
    return {
        type:"Add",
        payload:number
    }
}

export const add_details=(details)=>{
    return {
        type:"Add_details",
        payload:details
    }
}