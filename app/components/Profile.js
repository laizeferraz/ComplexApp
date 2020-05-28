import React, { useEffect, useContext, useState } from "react";
import Axios from "axios";
import Page from "./Page";
import { useParams } from "react-router-dom";
import StateContext from "../StateContext";
import ProfilePosts from "./ProfilePosts";

function Profile() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar:
      "https://gravatar.com/avatar/8ed140ae29a4912a1929c7a4a45885d3?s=128",
    isFollowing: false,
    counts: { postCount: "", folllowerCount: "", followingCount: "" },
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await Axios.post(
          `/profile/${username}`,
          {
            token: appState.user.token,
          },
          {
            cancelToken: ourRequest.token,
          }
        );
        setProfileData(response.data);
      } catch (e) {
        console.log("There was a problem or the request was cancelled.");
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);
  return (
    <Page title="Profile Screen">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} />
        {profileData.profileUsername}

        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.folllowerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  );
}

export default Profile;
