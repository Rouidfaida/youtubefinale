import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { CgPlayListAdd } from "react-icons/cg";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const MainVedio = () => {
  return (
    <div style={{ marginTop: "80px", marginBottom: "40px" }}>
      <iframe
        width="900"
        height="506"
        src="https://www.youtube.com/embed/w7ejDZ8SWv8"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write;
			   encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <h5>React JS Crash Course 2021</h5>
      <div className="divmv1">
        <p className="pmv1">2 145 vues </p>
        {/* <p className="pmv2"
       
        >
          .
        </p> */}
        <p className="pmv1">. 25 sept. 2020</p>
        <div style={{ marginLeft: "300px", display: "flex" }}>
          <AiOutlineLike />
          <p className="pmv3">85 </p>

          <AiOutlineDislike style={{ marginLeft: "20px" }} />
          <p className="pmv3">85 </p>

          <div style={{ display: "flex", marginLeft: "100px" }}>
            <RiShareForwardLine />
            <p className="pmv3">PARTAGER </p>
            <CgPlayListAdd />
            <p className="pmv3">ENREGISTRER </p>
            <BiDotsHorizontalRounded />
          </div>
        </div>
      </div>
      <hr className="hrm" />

      <hr className="hrm2" />
      <div className="divmv1">
        <img
          className="imgv"
          src=" https://yt3.ggpht.com/ytc/AKedOLQNNdMoVv4oz_Owgw-ndHJqr2tc5Tvn0MmT-QKc=s176-c-k-c0x00ffffff-no-rj"
          alt=""
        />

        <div style={{ display: "block", marginLeft: "20px" }}>
          <p className="pmv3">React Js Developer</p>
          <p className="pmv4">1,16 k abonnés</p>
          <p className="pmv5">
            This Video Shows you How to create an #User Interface website to
            #react .<br />
            Subscribe my channel and press the bell icon for new notification.
          </p>
          <p className="pmv6">PLUS</p>
        </div>
        <button
          style={{
            backgroundColor: " #e7e7e7",
            color: "black",
            width: 80,
            height: 32,
            marginLeft: "250px",
            border: "none",
          }} /* Gray */
        >
          Abonné
        </button>
        <IoIosNotificationsOutline
          style={{ width: "30px", height: "30px", marginRight: "12px" }}
        />
      </div>
      <hr style={{ border: "2px", marginTop: "10px" }} />

      <div style={{ display: "flex" }}>
        <p className="pmv7">1 899 commentaires</p>
        <HiOutlineMenuAlt2 style={{ marginLeft: 50 }} />
        <p className="pmv8">TRIER PAR</p>
      </div>
    </div>
  );
};

export default MainVedio;
