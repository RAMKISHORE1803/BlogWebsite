import { useEffect, useContext, useState } from "react";
import { UserContext } from "../UserContext";

const useProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setUserInfo]);

  return { userInfo, setUserInfo, loading };
};

export default useProfile;
