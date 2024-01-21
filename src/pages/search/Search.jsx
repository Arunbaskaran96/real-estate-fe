import Button from "../../components/ui/button/Button";
import classes from "./search.module.css";
import { CiLocationOn } from "react-icons/ci";

export default function Search() {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.searchContainer}>
          <p>Search Term : </p>
          <input className={classes.search} />
        </div>
        <div className={classes.typeContainer}>
          <p>Type :</p>
          <div className={classes.both}>
            <input className={classes.checkbox} type="checkbox" />
            <p style={{ marginLeft: "5px" }}>Sell & Rent</p>
          </div>
          <div className={classes.both}>
            <input className={classes.checkbox} type="checkbox" />
            <p style={{ marginLeft: "5px" }}>Sale</p>
          </div>
          <div className={classes.both}>
            <input className={classes.checkbox} type="checkbox" />
            <p style={{ marginLeft: "5px" }}>Rent</p>
          </div>
          <div className={classes.both}>
            <input className={classes.checkbox} type="checkbox" />
            <p style={{ marginLeft: "5px" }}>Offer</p>
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div style={{ fontSize: "18px" }}>Amenities : </div>
          <div className={classes.amenitiesContainer}>
            <input className={classes.amenitiesInput} type="checkbox" />
            <p style={{ marginLeft: "5px" }}>Parking</p>
          </div>
          <div className={classes.amenitiesContainer}>
            <input className={classes.amenitiesInput} type="checkbox" />
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
      </div>
      <div className={classes.right}>
        <h3>Listing Result :</h3>
        <div className={classes.listingContainer}>
          <div className={classes.listing}>
            <img
              className={classes.image}
              src="https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg"
              alt="roomImg"
            />
            <br />
            <div className={classes.bottomContainer}>
              <p className={classes.name}>Modern House</p>
              <p className={classes.location}>
                <CiLocationOn /> <span>Chennai</span>
              </p>
              <div className={classes.desContainer}>
                <p className={classes.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <p className={classes.price}>$100000</p>
              <div className={classes.bottom}>
                <p>3 Beds</p>
                <p style={{ marginLeft: "15px" }}>3 Baths</p>
              </div>
            </div>
          </div>
          <div className={classes.listing}>
            <img
              className={classes.image}
              src="https://t3.ftcdn.net/jpg/02/71/08/28/360_F_271082810_CtbTjpnOU3vx43ngAKqpCPUBx25udBrg.jpg"
              alt="roomImg"
            />
            <br />
            <div className={classes.bottomContainer}>
              <p className={classes.name}>Modern House</p>
              <p className={classes.location}>
                <CiLocationOn /> <span>Chennai</span>
              </p>
              <div className={classes.desContainer}>
                <p className={classes.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <p className={classes.price}>$100000</p>
              <div className={classes.bottom}>
                <p>3 Beds</p>
                <p style={{ marginLeft: "15px" }}>3 Baths</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
