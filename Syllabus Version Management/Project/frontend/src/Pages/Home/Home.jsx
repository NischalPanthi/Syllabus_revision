import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const Home = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getPrograms = async () => {
      const response = await axios.get("/api/program/all");
      setPrograms(response.data);
    };
    getPrograms();
  }, []);
  useEffect(() => {
    if (!user.accessToken) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="home">
      <div className="homeContainer">
        <h4>Programs In Bachelors</h4>
        <div className="bottom">
          {programs?.filter((program)=>program?.level==="Bachelors").map((program) => {
            return (
              <Link
                to={`/programs/${program?.programCode}`}
                key={program?._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="item">
                  <img src={`/program-image/${program?.imgString}`} alt="" />
                  <p>
                    <b>Name</b> : {program?.name}
                  </p>
                  <p>
                    <b>Level</b> : {program?.level}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="homeContainer">
        <h4>Programs In Masters</h4>
        <div className="bottom">
          {programs?.filter((program)=>program?.level==="Masters").map((program) => {
            return (
              <Link
                to={`/programs/${program?.programCode}`}
                key={program?._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="item">
                  <img src={`/program-image/${program?.imgString}`} alt="" />
                  <p>
                    <b>Name</b> : {program?.name}
                  </p>
                  <p>
                    <b>Level</b> : {program?.programCode}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
