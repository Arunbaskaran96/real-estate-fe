import React, { useEffect, useState } from "react";
import classes from "./home.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

export default function Home() {
  const { getItem } = useLocalStorage("token");
  const token = getItem();
  const [offers, setOffers] = useState([]);
  const [rents, setRents] = useState([]);
  const [sale, setSale] = useState([]);

  useEffect(() => {
    getOffers();
  }, []);

  const getOffers = async () => {
    try {
      const result = await fetch("/api/getlistings?offer=true&limit=3", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();
      setOffers(data);
      getRents();
    } catch (error) {
      console.log(error);
    }
  };

  const getRents = async () => {
    try {
      const result = await fetch("/api/getlistings?type=rent&limit=3", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();
      setRents(data);
      getSale();
    } catch (error) {
      console.log(error);
    }
  };

  const getSale = async () => {
    try {
      const result = await fetch("/api/getlistings?type=sell&limit=3", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await result.json();
      setSale(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h2>Find your next perfect</h2>
        <h2>place with ease</h2>
        <p className={classes.para}>
          G-Estate will help you find your home fast, easy and comfortable.
        </p>
        <p style={{ color: "grey", marginBottom: "25px" }}>
          Our expert support are always available.
        </p>
        <Link to="/layout/search" className={classes.start}>
          Let's start now
        </Link>
      </div>
      <div style={{ marginLeft: "15px" }}>
        <div className={classes.offers}>
          <p className={classes.offerType}>Recent offers</p>
          <Link
            to={`/layout/search?offer=true`}
            style={{ textAlign: "center" }}
            className={classes.showmore}
          >
            Show more offers
          </Link>
          <div className={classes.offerContainer}>
            {offers &&
              offers.map((item) => {
                return (
                  <Link
                    to={`/layout/listing/${item._id}`}
                    className={classes.offer}
                  >
                    <img
                      className={classes.img}
                      src={item.imageUrls[0]}
                      alt="pics"
                    />
                    <br />
                    <div
                      style={{
                        padding: "0px 10px",
                      }}
                    >
                      <p className={classes.companyName}>{item.name}</p>
                      <p className={classes.address}>
                        <FaLocationDot color="green" /> {item.location}
                      </p>
                      <p className={classes.des}>{item.description}</p>
                      <p className={classes.price}>$ {item.regularPrice}</p>
                      <div className={classes.bottom}>
                        <div
                          style={{
                            marginRight: "15px",
                            paddingBottom: "5px",
                          }}
                        >
                          {item.bedrooms} Beds
                        </div>
                        <div>{item.bathrooms} Baths</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className={classes.rent}>
          <div style={{ marginLeft: "15px" }}>
            <div className={classes.offers}>
              <p className={classes.offerType}>Recent places for rent</p>
              <Link to="/layout/search?type=rent" className={classes.showmore}>
                Show more offers
              </Link>
              <div className={classes.offerContainer}>
                {rents &&
                  rents.map((item) => {
                    return (
                      <Link
                        to={`/layout/listing/${item._id}`}
                        className={classes.offer}
                      >
                        <img
                          className={classes.img}
                          src={item.imageUrls[0]}
                          alt="pics"
                        />
                        <br />
                        <div
                          style={{
                            padding: "0px 10px",
                          }}
                        >
                          <p className={classes.companyName}>{item.name}</p>
                          <p className={classes.address}>
                            <FaLocationDot color="green" /> {item.address}
                          </p>
                          <p className={classes.des}>{item.description}</p>
                          <p className={classes.price}>$ {item.regularPrice}</p>
                          <div className={classes.bottom}>
                            <div
                              style={{
                                marginRight: "15px",
                                paddingBottom: "5px",
                              }}
                            >
                              {item.bedrooms} Beds
                            </div>
                            <div>{item.bathrooms} Baths</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.sale}>
          <div style={{ marginLeft: "15px" }}>
            <div className={classes.offers}>
              <p className={classes.offerType}>Recent places for sale</p>
              <Link to="/layout/search?type=sell" className={classes.showmore}>
                Show more offers
              </Link>
              <div className={classes.offerContainer}>
                {sale &&
                  sale.map((item) => {
                    return (
                      <Link
                        to={`/layout/listing/${item._id}`}
                        className={classes.offer}
                      >
                        <img
                          className={classes.img}
                          src={item.imageUrls[0]}
                          alt="pics"
                        />
                        <br />
                        <div
                          style={{
                            padding: "0px 10px",
                          }}
                        >
                          <p className={classes.companyName}>{item.name}</p>
                          <p className={classes.address}>
                            <FaLocationDot color="green" /> {item.address}
                          </p>
                          <p className={classes.des}>{item.description}</p>
                          <p className={classes.price}>$ {item.regularPrice}</p>
                          <div className={classes.bottom}>
                            <div
                              style={{
                                marginRight: "15px",
                                paddingBottom: "5px",
                              }}
                            >
                              {item.bedrooms} Beds
                            </div>
                            <div>{item.bathrooms} Baths</div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
            <div className={classes.rent}></div>
            <div className={classes.sale}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
