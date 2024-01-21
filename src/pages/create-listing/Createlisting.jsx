import { useState } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import classes from "./createlisting.module.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Createlisting() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const { getItem } = useLocalStorage("token");
  const token = getItem();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImages = (e) => {
    setError(null);
    setImages(e.target.files);
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageUpload = () => {
    if (images.length > 0) {
      const promises = [];
      setImageUploading(true);
      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: urls,
          });
          setImageUploading(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setImageUploading(false);
        });
    } else {
      setError("Atleast one image should be upload");
    }
  };

  const handleChange = (e) => {
    setError(null);
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (e.type === "text") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.type === "number") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const deleteHandler = (index) => {
    const deleteImage = formData.imageUrls.filter((_, i) => i != index);
    setFormData({ imageUrls: deleteImage });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("Atleast one image should be upload");
    } else {
      if (formData.regularPrice < formData.discountPrice) {
        setError("Regular price should be maximum than discount price");
      } else {
        try {
          const data = await fetch("/api/createlisting", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              ...formData,
              userRef: user,
            }),
          });
          const result = await data.json();
          if (result.success === false) {
            setError(result.message);
          } else {
            navigate(`/layout/listing/${result._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className={classes.container}>
      <h3>Create a Listing</h3>
      <form onSubmit={formHandler} className={classes.minicontainer}>
        <div className={classes.left}>
          <Input
            id="name"
            onChange={handleChange}
            placeholder="Name"
            value={formData.name}
            type="text"
            required
          />
          <textarea
            id="description"
            className={classes.textarea}
            placeholder="Description"
            value={formData.description}
            type="text"
            onChange={handleChange}
            required
          />
          <Input
            id="address"
            placeholder="Address"
            value={formData.address}
            type="text"
            onChange={handleChange}
            required
          />
          <div className={classes.checkboxContainer}>
            <div className={classes.checkbox}>
              <input
                id="sell"
                checked={formData.type === "sell"}
                className={classes.checkboxIcon}
                type="checkbox"
                onChange={handleChange}
              />
              <span className={classes.checkboxType}>Sell</span>
            </div>
            <div className={classes.checkbox}>
              <input
                id="rent"
                checked={formData.type === "rent"}
                className={classes.checkboxIcon}
                type="checkbox"
                onChange={handleChange}
              />
              <span className={classes.checkboxType}>Rent</span>
            </div>
            <div className={classes.checkbox}>
              <input
                id="parking"
                className={classes.checkboxIcon}
                type="checkbox"
                checked={formData.parking}
                onChange={handleChange}
              />
              <span className={classes.checkboxType}>Parking spot</span>
            </div>
            <div className={classes.checkbox}>
              <input
                checked={formData.furnished}
                id="furnished"
                className={classes.checkboxIcon}
                type="checkbox"
                onChange={handleChange}
              />
              <span className={classes.checkboxType}>Furnished</span>
            </div>
            <div className={classes.checkbox}>
              <input
                checked={formData.offer}
                id="offer"
                className={classes.checkboxIcon}
                type="checkbox"
                onChange={handleChange}
              />
              <span className={classes.checkboxType}>Offer</span>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className={classes.numberInputContainer}>
              <input
                id="bedrooms"
                className={classes.numberInput}
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <span>Beds</span>
            </div>
            <div className={classes.numberInputContainer}>
              <input
                id="bathrooms"
                className={classes.numberInput}
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <span>Baths</span>
            </div>
          </div>
          <div className={classes.offerPrice}>
            <input
              id="regularPrice"
              className={classes.offerInput}
              type="number"
              required
              onChange={handleChange}
            />
            <div className={classes.priceContainer}>
              <p>Regular Price</p>
              <span>($ / Month)</span>
            </div>
          </div>
          {formData.offer && (
            <div className={classes.offerPrice}>
              <input
                id="discountPrice"
                className={classes.offerInput}
                type="number"
                onChange={handleChange}
              />
              <div className={classes.priceContainer}>
                <p>Offer Price</p>
                <span>($ / Month)</span>
              </div>
            </div>
          )}
        </div>
        <div className={classes.right}>
          <div className={classes.uploadContainer}>
            <div className={classes.filecontainer}>
              <input
                multiple
                accept="image/*"
                onChange={(e) => handleImages(e)}
                type="file"
              />
            </div>
            <button
              onClick={handleImageUpload}
              type="button"
              className={classes.uploadBtn}
              disabled={imageUploading}
            >
              {imageUploading ? "Loading..." : "Upload"}
            </button>
          </div>
          <div>
            {formData &&
              formData.imageUrls.map((item, index) => {
                return (
                  <div key={index} className={classes.roomImgContainer}>
                    <img className={classes.roomImg} src={item} />
                    <button
                      onClick={() => deleteHandler(index)}
                      className={classes.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            disabled={imageUploading}
            variant="primary"
            value="Create Listing"
          />
        </div>
      </form>
    </div>
  );
}
