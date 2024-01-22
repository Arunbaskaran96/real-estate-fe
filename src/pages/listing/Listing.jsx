import { useParams } from "react-router-dom";
import classes from "./listing.module.css";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaLocationDot } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import Button from "../../components/ui/button/Button";

export default function Listing() {
  const [listing, setListing] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { getItem } = useLocalStorage("token");
  const token = getItem();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListing();
  }, [id]);

  const getListing = async () => {
    try {
      setLoading(true);
      const data = await fetch(`/api/getlist/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const result = await data.json();
      if (result.success === false) {
        setError(result.message);
      } else {
        setListing(result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Carousel
              className={classes.carousel}
              autoPlay
              interval={1000}
              infiniteLoop={true}
            >
              {listing.imageUrls?.map((item) => {
                return (
                  <div key={item._id}>
                    <img src={item} />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div style={{ width: "70%", margin: "auto" }}>
            <div>
              <h3>
                {listing.name} - $ {listing.regularPrice} / month
              </h3>
              <div className={classes.addressContainer}>
                <FaLocationDot color="green" />
                <span>{listing.address}</span>
              </div>
              <div className={classes.btnContainer}>
                <button className={classes.rent}>
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </button>
                {listing.discountPrice > 0 && (
                  <button className={classes.discount}>
                    ${listing.discountPrice} discount
                  </button>
                )}
              </div>
              <div className={classes.description}>
                <span>Description -</span>
                {listing.description}
              </div>
              <div
                className={classes.amenities}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  width: "50%",
                }}
              >
                <div>
                  <IoBedOutline color="green" />
                  <span style={{ color: "green", paddingLeft: "10px" }}>
                    {listing.bedrooms} Beds
                  </span>
                </div>
                <div>
                  <FaBath color="green" />
                  <span style={{ color: "green", paddingLeft: "10px" }}>
                    {listing.bathrooms} Baths
                  </span>
                </div>
                <div>
                  <FaParking color="green" />
                  <span style={{ color: "green", paddingLeft: "10px" }}>
                    {listing.parking ? "Parking" : "No parking"}
                  </span>
                </div>
                <div>
                  <FaChair color="green" />
                  <span style={{ color: "green", paddingLeft: "10px" }}>
                    {listing.furnished ? "Furnished" : "No furnished"}
                  </span>
                </div>
              </div>
            </div>
            <Button value="Contact landlord" variant="primary" />
          </div>
        </>
      )}
    </>
  );
}
