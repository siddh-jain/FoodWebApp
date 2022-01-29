import axios from "axios";
import { useState } from "react";


const Home = (props) => {
  //localStorage.clear();

  const email = localStorage.getItem('loggedEmail');
  const [name,setName]=useState("");


  if (localStorage.getItem('log') === "1") {

    axios
    .post("https://siddhfoodwebapp.herokuapp.com/user/profile",{"email":email})
    .then((response) => {
      //console.log(response.data);
      setName(response.data.name);
    })
    .catch(function (error) {
      console.log(error);
    });

    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome {name}</h1>

      </div>
    );
  }
  else if (localStorage.getItem('log') === "2") {

    axios
    .post("https://siddhfoodwebapp.herokuapp.com/vendor/profile",{"email":email})
    .then((response) => {
      //console.log(response.data);
      setName(response.data.manager_name);
    })
    .catch(function (error) {
      console.log(error);
    });
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome {name}</h1>

      </div>
    );
  }
  else {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Either Register or Login
        </h1>
      </div>
    );
  }

};

export default Home;
