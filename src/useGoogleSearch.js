import { useState, useEffect } from 'react';
// import API_KEY from './Keys';

const CONTEXT_KEY = '89468cbd750e0a804'; 

const { REACT_APP_API_KEY } = process.env;

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            fetch(
                `https://www.googleapis.com/customsearch/v1?key=${REACT_APP_API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
            )
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
        }
        
        fetchData()
    }, [term])

    return { data }
}

export default useGoogleSearch
