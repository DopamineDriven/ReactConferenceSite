import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const DataFetchReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_INIT":
            return {
                ...state, 
                isLoading: true, 
                isError: false 
            };
        
    }
}

const UseAxiosFetch = (initialUrl, initialData) => {
    const [url] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        hasErrored: false,
        errorMessage: "",
        data: initialData
    })

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            
        }
    })
}

export default UseAxiosFetch;