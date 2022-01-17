import React, {useState} from 'react';

const ImageUpload = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [objectDetection, setObjectDetection] = useState(true);
    const [message, setMessage] = useState('');

    const handleChange = () => {
        setObjectDetection(!objectDetection);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        var data = new FormData();
        var imagedata = document.querySelector('input[type="file"]').files[0];
        if (imagedata) {
            data.append("image-file", imagedata);
        } else {
            imagedata = new File([""], "");
            data.append("image-file", imagedata);
        }
        data.append("name", name);
        data.append("image-url", url);
        if (objectDetection) {
            data.append("object-detection", objectDetection);
        }
        try {
            let res = await fetch("http://localhost:8080/images", {
                method: "POST",
                body: data,
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setName("");
                setUrl("");
                setObjectDetection(true);
                setMessage("Image uploaded successfully");
            } else {
                setMessage("Some error occurred");
            }
        } catch (err) {
            console.log(err);
            setMessage("Some error occurred");
        }
    };

    return (
        <>
        <h1 className="text-primary"><a href="/"><i className="bi bi-arrow-left"></i></a> Upload Image</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
                <label className="form-label">Name of File:
                    <input className="form-control" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div className="row g-3 mb-3">
                <div className="col-md-6">
                    <label className="form-label">Upload Image
                        <input className="form-control" type="file" name="image-file" autoComplete="off"/>
                    </label>
                </div>
                <div className="col-md-6">
                    <label className="form-label">or URL:
                        <input className="form-control" type="url" name="image-url" value={url} onChange={(e) => setUrl(e.target.value)} autoComplete="off"/>
                    </label>
                </div>
            </div>
            <div className="mb-3 form-check">
            <label className="form-label">Enable Object Detection:
                <input className="form-check-input" type="checkbox" name="object-detection" checked={objectDetection} onChange={handleChange} />
            </label>
            </div>
            <button type="submit" className="btn btn-primary">Upload</button>
        </form>
        <div className="mt-4">{message ? <div className="alert alert-secondary" role="alert">{message}</div> : null}</div>
        </>
    )
};

export default ImageUpload;