// rafce
import React from "react";
import Resize from "react-image-file-resizer";
import axios from "axios";
import {BACKEND_URL} from "./../../../configurl.js";

const textuser = localStorage.getItem("token");
const objuser = JSON.parse(textuser);
const authtoken = objuser && objuser.token;

const FileUpload = ({ values, setValues, loading, setLoading }) => {

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);

      let allfileUpload = values.images; //[]
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${BACKEND_URL}/api/cloudinary/images`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: authtoken,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
               // alert(JSON.stringify(allfileUpload ))
                allfileUpload.push(res.data);
                console.log("allfileupload in then", allfileUpload);
                setValues({ ...values, images: allfileUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true)
    console.log(public_id);
    // const img = values.images
    const { images } = values;
    axios
      .post(
        `${BACKEND_URL}/api/cloudinary/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: authtoken,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        //err
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <>
      <br />
      {/* {JSON.stringify(values.images)} */}
      <div className="flex gap-2 my-2">
        {values.images &&
          values.images.map((c) => (
            <div>
              <div
                className="flex flex-row"
                onClick={() => handleRemove(c.public_id)}
                style={{ cursor: "pointer" }}
                count="X"
              >
         
                <div  />
                  
                <img
                  src={c.url}
                  className="object-cover w-32 h-32 mx-auto "
                />
                 <label className="mx-5 text-2xl text-red-600">  X </label>   
              </div>
              
            </div>
          ))}
      </div>

      <hr />
      <div className="form-group">
        <label className="btn btn-primary">
          Choose File...
          <input
            onChange={handleChangeFile}
            className="form-control"
            type="file"
            hidden
            multiple
            accept="images/*"
            name="file"
          />
        </label>
      </div>
      <br />
    </>
  );
};

export default FileUpload;
