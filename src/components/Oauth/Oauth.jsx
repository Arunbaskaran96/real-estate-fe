import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase";
import Button from "../ui/button/Button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/user/userSlice";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setItem } = useLocalStorage("auth");
  const user = useSelector((state) => console.log(state));
  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const data = await fetch("/api/googleauth", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            username: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        });
        const res = await data.json();
        if (res.success !== false) {
          dispatch(loginSuccess(res));
          setItem(res);
          navigate("/layout/home");
        }
      } else {
        console.log("google auth failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={handleClick}
        value="Connect with Google"
        variant="secondary"
      />
    </div>
  );
}
