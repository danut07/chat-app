import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user.email);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "fdb6add5-3a50-4e62-821a-ff93098e1fbd",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "eb9abc82-406d-4fe9-96c3-6715e2411e1b",
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  const handleLogout = async () => {
    await auth.signOut();

    history.push("/");
  };

  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">OviApp</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh-66px)"
        projectID="fdb6add5-3a50-4e62-821a-ff93098e1fbd"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
