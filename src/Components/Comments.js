import React, { useState } from "react";

const Comments = ({ commentair, add }) => {
  const [name, setName] = useState({ newComment: "" });
  const handleChange = (e) => {
    setName({ newComment: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    add(name.newComment);
    setName({ newComment: "" });
  };

  const [shows, setShows] = useState({ show: true });

  const handleShowPerson = () => {
    setShows({ shows: !shows.show });
  };
  return (
    <div>
      <div className="divComm">
        <img
          className="imgcomm"
          src=" https://yt3.ggpht.com/yti/APfAmoG7rAAZHK3ivvaDC5rgprEcfl2GKSoI464T6g=s88-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <div style={{ display: "block" }}>
          <input
            onClick={handleShowPerson}
            placeholder="Ajouter un commentaire public... "
            style={{
              width: "850px",
              border: 0,
              borderBottom: "2px solid grey",
              outline: 0,
              fontFamily: "Roboto, Noto, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              marginLeft: 15,
              lineHeight: "20px",
              color: "grey",
              padding: "7px 7px",
              background: "transparent",
              marginBottom: "40px",
              transition: "borderColor 0.2s",
            }}
            type="text"
            value={name.newComment}
            onChange={handleChange}
          ></input>

          {!shows.show ? (
            <div>
              <hr className="hr1"
                
              />

              <button
                className="btncomm"
                /* Gray */
                onClick={handleSubmit}
              >
                AJOUTER UN COMMENTAIRE
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {commentair.map((el) => (
        <div style={{ display: "flex" }}>
          <img className="imgcomm" src={el.imgs} alt="" />
          <div className="divc1">
            <div className="divc2">
              <p className="pco1"> {el.name}</p>
              <p className="pc2">{el.per}</p>
            </div>

            <p>{el.body}</p>
            <div  className="divc4">
              <div className="divc4">
                {el.like}
                <p className="pc3">1,6 k</p>
              </div>
              <div className="divc3">
                {el.dilike}
                <p className="pc3">Répondre</p>
              </div>
            </div>
            <div className="divc4">
              <div className="divc5">{el.but}</div>
              <p className="pc4">{el.aff}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
