import classes from "./profile.module.css";
import Input from "../../components/ui/input/Input";
import Avatar from "../../components/ui/Avatar/Avatar";
import Button from "../../components/ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  updateStart,
  updateUserError,
  updateUser,
  deleteStart,
  deleteUserError,
  deleteUser,
  signoutuser,
} from "../../redux/user/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.userSlice.user);
  const imageRef = useRef(null);
  const [formData, setFormData] = useState("");
  const [image, setImage] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const navigate = useNavigate();
  const { removeItem, getItem } = useLocalStorage("token");
  const token = getItem();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userSlice);
  const [listings, setListings] = useState([]);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = image.name + new Date().getMinutes();
    const [listings, setListings] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      const res = await fetch(`/api/edituser/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserError(data));
      } else {
        dispatch(updateUser(data));
        navigate("/layout/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signoutHandler = () => {
    removeItem();
    dispatch(signoutuser());
  };

  const deleteHandler = async () => {
    try {
      dispatch(deleteStart());
      const result = await fetch(`/api/deleteuser/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await result.json();
      if (data.success === false) {
        dispatch(deleteUserError(data));
      } else {
        dispatch(deleteUser());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showListingHandler = async () => {
    try {
      const result = await fetch(`/api/getlistings/${user._id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();
      if (data.success === false) {
        console.log(data.message);
      } else {
        setListings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListingHandler = async (id) => {
    try {
      const data = await fetch(`/api/deletelisting/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      const result = await data.json();
      if (result.success === false) {
        setDeleteError(result.message);
      } else {
        setListings(listings.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
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
          defaultValue={user.username}
          onChange={inputHandleChange}
        />
        <Input
          id="email"
          placeholder="Enter your email here"
          type="email"
          defaultValue={user.email}
          onChange={inputHandleChange}
        />
        <Input
          id="password"
          placeholder="Enter your password here"
          type="password"
          onChange={inputHandleChange}
        />
        <Button
          disabled={loading}
          variant={loading ? "loading..." : "update"}
          value="update"
        />
      </form>
      <Link style={{ textDecoration: "none" }} to="/layout/create-listing">
        <Button variant="listing" value="Create listing" />
      </Link>
      <div className={classes.actions}>
        <p onClick={deleteHandler}>Delete Account</p>
        <p onClick={signoutHandler}>Sign out</p>
      </div>
      <p
        onClick={showListingHandler}
        style={{
          fontSize: "18px",
          color: "green",
          cursor: "pointer",
          textDecoration: "none",
          marginBottom: "20px",
        }}
        className={classes.showlisting}
      >
        Show listings
      </p>

      {listings.length > 0 &&
        listings.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px 0px",
              }}
            >
              <img
                className={classes.listingImg}
                src={item.imageUrls[0]}
                alt="roompic"
              />
              <p>{item.name}</p>
              <div
                style={{
                  display: "flex",
                  width: "80px",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  to={`/layout/update-listing/${item._id}`}
                  style={{
                    cursor: "pointer",
                    color: "blueviolet",
                    textDecoration: "none",
                  }}
                >
                  Edit
                </Link>
                <div
                  onClick={() => deleteListingHandler(item._id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  Delete
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
