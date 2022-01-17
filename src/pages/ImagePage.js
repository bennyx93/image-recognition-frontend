import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ImagePage = () => {
    const { imageId } = useParams();
    const [imageInfo, setImageInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`http://localhost:8080/images/${imageId}`);
            const data = await result.json();
            setImageInfo(data);
        };
        fetchData();
    }, [imageId]);

    return (
        <>
            <h1 className="text-primary"><a href="/"><i className="bi bi-arrow-left"></i></a> {imageInfo.name}</h1>
            <img src={imageInfo.url} alt={imageInfo.name} style={{maxHeight: "300px"}}/>
            <h2 className="text-primary mt-4">Tags: </h2>
            {imageInfo.tags?.map((tag, key) => (
                <span key={key} className="badge rounded-pill bg-secondary m-1">{ tag }</span> 
            ))}
        </>
    );
}

export default ImagePage;