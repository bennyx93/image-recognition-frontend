import { Link } from "react-router-dom";

const ImagesList = ({ imagesInfo }) => (
    <>
        {imagesInfo.map((image, key) => (
            <Link className="image-list-item" key={key} to={`/image/${image.id}`}>
                <li className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <a className='h5 mb-0 text-decoration-none'>{image.name}</a>
                        </div>
                    </div>
                </li>
            </Link>
        ))}
    </>
);

export default ImagesList;