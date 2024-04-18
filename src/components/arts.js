import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const Art = (props) => (
  // <div className="card-container">
  //   <img
  //     src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
  //     alt="Books"
  //     height="200"
  //   />
  //   <div className="desc">
  //     <h2><a href="#" onClick={() => { props.editBook(props.keyt); }}>{props.title}</a></h2>
  //     <h3>{props.author}</h3>
  //     <p>{props.description}
  //       <button className='btn btn-danger delete' onClick={() => { props.deleteBook(props.keyt); }}>X</button>
  //     </p>
  //   </div>
  // </div>

  <div class="photo-container">
    <div class="photo">
      <img src={props.src} alt={props.alt} width="200" />
    </div>
    <div class="comments-section">
      <div>
        <h4>Bids</h4>
        <ul>
          {props.bids.map((bid) => (
            <li>
              <strong>{bid.user}:</strong> {bid.bid}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div class="addbid">
      <form class="comment-form">
        <input type="text" placeholder="Your name"  />
        <input type="number" placeholder="Add a higher bid"  />
        <button type="submit" onClick={() => { props.editArt(props.keyt, ); }}>Submit Your Higher Bid</button>
      </form>
    </div>
  </div>
);

export default function Books() {
  const [arts, setArts] = useState([]);

  const [updatedArt, setUpdatedArt] = useState([]);

  const [user, setOnChangeUser] = useState(``);
  const [bid, setOnChangeBid] = useState(``);

  useEffect(() => {
    axios
      .get(backend_url + "/api/arts")
      .then((response) => {
        setArts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editArt = (id) => {

    axios
    .get(backend_url + "/api/arts/" + id)
    .then((response) => {
      setUpdatedArt(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    const updatedArt2 = updatedArt
    updatedArt.push({"user": user, "bid": bid});
    setUpdatedArt(updatedArt2);

    console.log(updatedArt);

    console.log(`${backend_url}/api/art/${id}`);

    axios
      .post(`${backend_url}/api/art/${id}`, updatedArt)
      .then((res) => {
        window.location = '/';
      });
  };

  return (
    <div class="App">
      <div class="photo-gallery">
        {arts.map((art) => {
          return (
            <Art
              src={art.src}
              alt={art.alt}
              bids={art.bids}
              key={art._id}
              keyt={art._id}
              editArt={editArt}
            />
          );
        })}
      </div>
    </div>
  );
}
