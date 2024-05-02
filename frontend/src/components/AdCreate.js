import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import '../styles/AdCreate.css';

function AdCreate() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState([]);
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [status, setStatus] = useState("");
    const [duration, setDuration] = useState(1); // New state for duration, default to 1 week
    const [publishDate, setPublishDate] = useState(new Date()); // New state for publish date, default to today

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("email", email);
        formData.append("contact", contact);
        formData.append("duration", duration); // Append duration
        formData.append("publishDate", publishDate); // Append publish date

        if (status) {
            formData.append("status", status);
        }

        for (let i = 0; i < content.length; i++) {
            formData.append("content", content[i]);
        }

        axios.post("http://localhost:8070/advertisement/add", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(() => {
            alert("Advertisement Added");
        })
        .catch((err) => {
            alert(err);
        });
    }

    const handleFileChange = (e) => {
        setContent([...content, ...Array.from(e.target.files)]);
    };

    return (

        <div className="container2">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="title">Advertisement Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter Advertisement Title"
                        pattern="^[A-Za-z0-9\s]{1,50}$"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Advertisement Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter Advertisement Description"
                        pattern="^[A-Za-z0-9\s]{1,500}$"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="content">Upload Advertisement Content</label>
                    <input
                        type="file"
                        className="form-control"
                        id="content"
                        accept="image/*"
                        multiple
                        required
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email"
                        pattern="^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact">Contact No</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="contact"
                        placeholder="Enter Your Phone No"
                        pattern="0[0-9]{9}"
                        required
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration">Duration (in weeks)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="duration"
                        min="1"
                        step="1"
                        required
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="publishDate">Publish Date</label>
                    <br />
                    <DatePicker
                        selected={publishDate}
                        onChange={(date) => setPublishDate(date)}
                        dateFormat="yyyy-MM-dd"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AdCreate;