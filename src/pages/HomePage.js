import React, {useState, useEffect, useCallback} from 'react';
import ImagesList from '../components/ImagesList';
import SearchBox from '../components/SearchBox';

const HomePage = () => {

    const [imagesInfo, setImagesInfo] = useState([]);
    let [queryString, setQueryString] = useState("");

    // Use Callback since it prevents an infinite loop
    // it ensures that the function is only re-created if its dependencies changed
    const fetchData = useCallback(() => {
        const queryText = queryString.length > 0 ? `?objects="${queryString}"` : "";

        fetch(`http://localhost:8080/images${queryText}`)
            .then(response => response.json())
            .then(data => setImagesInfo(data))
            .catch(err => console.log(err));
    }, [queryString]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
        <h1 className="text-primary">Welcome to Python Image Recognizer</h1>
        <SearchBox queryString={queryString} onQueryChange={(myString) => {setQueryString(myString)}} />
        <ImagesList imagesInfo={imagesInfo} />

        <a href="/images/upload"><button type="button" className="mt-4 btn btn-secondary">Upload Image</button></a>
        </>
    );
}

export default HomePage;