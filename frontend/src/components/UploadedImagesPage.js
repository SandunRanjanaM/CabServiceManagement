import React, { useState, useEffect } from 'react';
import axios from 'axios';
const UploadedImagesPage = () => {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        // Fetch uploaded file data from the server
        axios.get('http://localhost:3000/uploaded-files')
            .then(response => {
                setFileData(response.data);
            })
            .catch(error => {
                console.error('Error fetching uploaded files:', error);
            });
    }, []);

    return (
        <div>
            <h1>View Uploaded Files</h1>
            {fileData && fileData.map((file, index) => (
                <div key={index}>
                    {/* Display the uploaded file */}
                    {file.type.startsWith('image/') ? (
                        <img src={`data:${file.type};base64,${file.data}`} alt={`Uploaded File ${index}`} />
                    ) : (
                        <a href={`data:${file.type};base64,${file.data}`} download={`Uploaded File ${index}`}>Download File</a>
                    )}
                </div>
            ))}
        </div>
    );
};


export default UploadedImagesPage;
