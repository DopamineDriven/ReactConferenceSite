import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const DataFetchReducer = (state, action) => {
    switch (action.type) {
        // data fetch initialization
        case "FETCH_INIT":
            return { 
                ...state, 
                isLoading: true, 
                isError: false 
            };
        // data fetch success
        case "FETCH_SUCCESS": 
            return {
                ...state,
                isLoading: false,
                hasErrored: false,
                errorMessage: "",
                data: action.payload
            };
        // data fetch failure
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                hasErrored: true,
                errorMessage: "Data Retrieve Failure"
            };
        // replace data
        case "REPLACE_DATA":
        // record passed (state.data) must have the attribute "id" 
        // that is, replacing one record in data that is already loaded
        // PUT   
        const newData = state.data.map(rec => {
                return rec.id === action.replacerecord.id ? action.replacerecord : rec
            });
            return {
                ...state,
                isLoading: false,
                hasErrored: false,
                errorMessage: "",
                data: newData
            }
        default: 
            throw new Error()
    }
};

// need to pass in data that will be returned immediately 
const UseAxiosFetch = (initialUrl, initialData) => {
    const [url] = useState(initialUrl);
    // returns state values isLoading, hasErrored, errorMessage, and data
    const [state, dispatch] = useReducer(DataFetchReducer, {
        isLoading: false,
        hasErrored: false,
        errorMessage: "",
        data: initialData
    });

    useEffect(() => {
        let didCancel = false;
        // follow state diagram
        // first, dispatch to reducer, init
        const fetchData = async () => {
            dispatch({ type: "FETCH_INIT" });
            // then, in a try-catch, axios issues async call 
            // to fetch data from url and await results
            try {
                let result = await axios.get(url);
                if (!didCancel) {
                    dispatch({ type: "FETCH_SUCCESS", payload: result.data })
                }
            }   catch (error) {
                if (!didCancel) {
                    dispatch({ type: "FETCH_FAILURE" })
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true
        };
        // useEffect close
    }, [url])

    const updateDataRecord = record => {
        dispatch({
            type: "REPLACE_DATA",
            replacerecord: record
        })
    };

    return { ...state, updateDataRecord }
};

export default UseAxiosFetch;
