import classes from "./profile.module.css";
import Input from "../../components/ui/input/Input";
import Avatar from "../../components/ui/Avatar/Avatar";
import Button from "../../components/ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function Profile() {
  const user = useSelector((state) => state.userSlice.user);
  const imageRef = useRef(null);
  const [formData, setFormData] = useState("");
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = image.name + new Date().getMinutes();
    const storageRef = ref(storage, fileName);
    const upload = uploadBytesResumable(storageRef, image);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setFormData({ ...formData, photo: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const inputHandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <input
          style={{ display: "none" }}
          ref={imageRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <p className={classes.header}>Profile</p>
        <div
          style={{ marginBottom: "15px" }}
          onClick={() => imageRef?.current.click()}
        >
          <Avatar
            size="def"
            src={formData.photo ? formData.photo : user.photo}
          />
          {uploadPercentage > 0 && (
            <p style={{ color: "green", fontSize: "10px" }}>
              {uploadPercentage}% upload completed
            </p>
          )}
        </div>
        <Input
          id="username"
          placeholder="Enter your username here"
          type="text"
          onChange={inputHandleChange}
        />
        <Input
          id="email"
          placeholder="Enter your email here"
          type="email"
          onChange={inputHandleChange}
        />
        <Input
          id="password"
          placeholder="Enter your password here"
          type="password"
          onChange={inputHandleChange}
        />
        <Button variant="update" value="update" />
        <Button variant="listing" value="Create listing" />
        <div className={classes.actions}>
          <p>Delete Account</p>
          <p>Sign out</p>
        </div>
        <div style={{ fontSize: "18px", color: "green", cursor: "pointer" }}>
          Show listings
        </div>
      </form>
    </div>
  );
}
