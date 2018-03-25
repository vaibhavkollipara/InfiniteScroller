const defaultState = {
    pics : [],
    error : null,
    loading : false,
    page : 1,
    totalPages : 1
}

export default (state=defaultState,action) => {
    switch(action.type){
        case "FETCH_PICS":
            return {...state,error : null, loading:true}
        case "FETCH_SUCCESSFUL":
            return {...state, error : null, loading: false, pics : [...state.pics,...action.payload]}
        case "FETCH_FAILED":
            return {...state, loading:false, error: action.payload}
        case "SET_CURRENT_PAGE":
            return {...state, page: action.payload}
        case "SET_TOTAL_PAGES":
            return {...state, totalPages : action.payload}
        default :
            return state
    }
}
