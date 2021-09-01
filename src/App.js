import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Posts from "./Components/Posts";
import axios from "./Components/axios";
import Profile from "./Components/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authentication from "./Components/Authentication";
import SignUp from "./Components/SignUp";
import { AuthContext } from "./Components/Context";
import Allcomments from "./Components/Allcomments";
import Edit from "./Components/Edit";

function App() {
  const [posts, setPosts] = useState([]);
  const [isLogged, setIslogged] = useState({
    name: "",
    id: "",
    loginstatus: false,
  });

  useEffect(() => {
    axios
      .get("/post/", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem("accessToken")]);
  return (
    <AuthContext.Provider value={{ isLogged, setIslogged }}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Header />
              <div className="app_container">
                <div className="left">
                  {posts?.map((post) => {
                    return (
                      <Posts
                        key={post?._id}
                        imgUrl={post?.imgUrl}
                        username={post?.username}
                        caption={post?.caption}
                        comments={post?.comments}
                        id={post?._id}
                      />
                    );
                  })}
                </div>
                <div className="right">
                  <Profile />
                </div>
              </div>
            </Route>
            <Route path="/login">
              <Authentication />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/specific_post/:id">
              <Header />
              <Allcomments />
            </Route>
            <Route path="/profile">
              <Header />
              <Profile />
            </Route>
            <Route path="/edit">
              <Header />
              <Edit />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
