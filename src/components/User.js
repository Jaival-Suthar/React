import { useEffect, useState } from "react";

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Dummy",
    location: "Default",
    avatar_url: "",
    bio: "N/A"
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("https://api.github.com/users/Jaival-Suthar");
      const data = await response.json();
      setUserInfo(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="user-card">
      <img className="user-card-img" src={userInfo.avatar_url} alt="User Avatar"
      onContextMenu={e => e.preventDefault()}
      draggable={false}
      onDragStart={e => e.preventDefault()}
      style={{ userSelect: "none" }}/>
      <h2>Name: {userInfo.name}</h2>
      <h3>Location: {userInfo.location}</h3>
      <h4>Bio: {userInfo.bio}</h4>
    </div>
  );
};

export default User;
