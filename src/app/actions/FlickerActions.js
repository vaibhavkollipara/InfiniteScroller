import fetchJsonp from 'fetch-jsonp';
const api_key = "YOUR_FLICKR_API_KEY";
export function fetchPics(page){
    return (dispatch,getState) => {
        dispatch( {type:"FETCH_PICS",payload:{}} );
        fetchJsonp(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&text=mountains&per_page=10&page=${page}&format=json`,{
            jsonpCallbackFunction: 'jsonFlickrApi',
            timeout : 10000
        }).then(response => {
                response.json().then((response) => {
                    console.log(response);
                    dispatch({type: "SET_CURRENT_PAGE", payload:page+1})
                    dispatch({type: "FETCH_SUCCESSFUL", payload: response.photos.photo});
                    dispatch({type: "SET_TOTAL_PAGES", payload: response.photos.pages})
                });
        }).catch(response => {
            dispatch( {type:"FETCH_FAILED" , payload : response});
        });
    }
}
