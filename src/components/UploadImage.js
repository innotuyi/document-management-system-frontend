import React, { useState, useEffect } from "react";
import axios from "axios";

const imageUrl = "http://localhost:8000/storage/";

function UploadImage() {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState("");

  const [documents, setDocument] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!file) {
        alert('Please select a file');
        return;
      }

    const formData = new FormData();
    formData.append("document", file);
    setLoading(true);
    axios
      .post("http://127.0.0.1:8001/api/upload/document", formData)
      .then((response) => {
        setLoading(false);
        window.location.reload();
        console.log("Upload successful", response.data);
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
  };

  useEffect(() => {
    async function getDocuments() {
      try {
        const response = await axios.get("http://127.0.0.1:8001/api/document");
        if (response) {
          setDocument(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getDocuments();
  }, []);

  return (
    <>
      <div class="jumbotron">
        <div class="container">
          <h1 class="display-4">Welcome to DMS-SYSTEM</h1>
          <p class="lead">We are happy to have you as customer</p>

          <form action="/upload" method="POST" enctype="multipart/form-data">
            <div class="input-group mb-3">
              <input
                type="file"
                class="form-control"
                id="document"
                onChange={handleFileChange}
                name="document"
                accept=".doc,.docx,.pdf"
                required
              />
              <label class="input-group-text" for="document">
                Choose file
              </label>
            </div>

            {loading ? (
              <button class="btn btn-block  login-btn" type="button" disabled>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="1"
                ></span>
                Please wait a moment...
              </button>
            ) : (

            <button
              type="submit"
              class="btn btn-primary"
              onClick={handleSubmit}
            >
              Upload Document
            </button>

            )}
          </form>
        </div>
      </div>

      <div class="card document justify-content-center text-center">
        <div class="card-body">
          <h5 class="card-title">Uploaded Document</h5>
          <ul>
            {documents.map((document) => (
              <li>
                <span class="mr-2 bg-primary p-1">{document.id}</span>
                <a
                  href={imageUrl + document.name}
                  key={document.id}
                  target="_blank"
                >
                  {document.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UploadImage;
