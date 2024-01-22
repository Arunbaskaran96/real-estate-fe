import { useEffect, useState } from "react";
import Button from "../../components/ui/button/Button";
import classes from "./search.module.css";
import { CiLocationOn } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Search() {
  const { getItem } = useLocalStorage("token");
  const [listing, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const token = getItem();
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/getlistings?${searchQuery}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();
      if (data.length > 2) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
    };

    fetchListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`?${searchQuery}`);
  };

  const showmoreHandler = async () => {
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/getlistings?${searchQuery}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.length < 3) {
      setShowMore(false);
    }
    setListings([...listing, ...data]);
  };

  return (
    <div className={classes.container}>
      <form className={classes.left} onSubmit={handleSubmit}>
        <div className={classes.searchContainer}>
          <p>Search Term : </p>
          <input
            onChange={handleChange}
            value={sidebardata.searchTerm}
            className={classes.search}
            type="text"
            id="searchTerm"
          />
        </div>
        <div className={classes.typeContainer}>
          <p>Type :</p>
          <div className={classes.both}>
            <input
              id="all"
              onChange={handleChange}
              checked={sidebardata.type === "all"}
              className={classes.checkbox}
              type="checkbox"
            />
            <p style={{ marginLeft: "5px" }}>Sell & Rent</p>
          </div>
          <div className={classes.both}>
            <input
              id="sell"
              onChange={handleChange}
              checked={sidebardata.type === "sell"}
              className={classes.checkbox}
              type="checkbox"
            />
            <p style={{ marginLeft: "5px" }}>Sale</p>
          </div>
          <div className={classes.both}>
            <input
              id="rent"
              onChange={handleChange}
              checked={sidebardata.type === "rent"}
              className={classes.checkbox}
              type="checkbox"
            />
            <p style={{ marginLeft: "5px" }}>Rent</p>
          </div>
          <div className={classes.both}>
            <input
              id="offer"
              onChange={handleChange}
              checked={sidebardata.offer === true}
              className={classes.checkbox}
              type="checkbox"
            />
            <p style={{ marginLeft: "5px" }}>Offer</p>
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div style={{ fontSize: "18px" }}>Amenities : </div>
          <div className={classes.amenitiesContainer}>
            <input
              id="parking"
              onChange={handleChange}
              checked={sidebardata.parking === true}
              className={classes.amenitiesInput}
              type="checkbox"
            />
            <p style={{ marginLeft: "5px" }}>Parking</p>
          </div>
          <div className={classes.amenitiesContainer}>
            <input
              id="furnished"
              onChange={handleChange}
              checked={sidebardata.furnished === true}
              className={classes.amenitiesInput}
              type="checkbox"
            />
            <p style={{ marginLeft: "5px" }}>Furnished</p>
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <p className={classes.sortText}>Sort : </p>
          <select className={classes.selection}>
            <option>Latest</option>
            <option>Price low to high</option>
            <option>Price high to low</option>
            <option>Oldest</option>
          </select>
        </div>
        <Button value="Search" variant="primary" />
      </form>
      <div className={classes.right}>
        <h3 style={{ textAlign: "center" }}>
          Listing Result : {listing.length}
        </h3>
        <div className={classes.listingcontainer}>
          {listing &&
            listing.map((item) => {
              return (
                <Link
                  to={`/layout/listing/${item._id}`}
                  className={classes.listcontainer}
                >
                  <div>
                    <img
                      className={classes.roomImage}
                      src={item.imageUrls[0]}
                      alt="room"
                    />
                  </div>
                  <div style={{ paddingLeft: "20px" }}>
                    <p className={classes.name}>{item.name}</p>
                    <p className={classes.address}>
                      <CiLocationOn color="green" /> <span>{item.address}</span>
                    </p>
                    <p className={classes.descriptionText}>
                      {item.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ marginRight: "10px" }}>3 Beds</p>
                      <p>3 Baths</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          {showMore && (
            <p onClick={showmoreHandler} className={classes.showmore}>
              Show more
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
