import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike,AiFillDownCircle } from "react-icons/ai";
import { BiCaretDown } from "react-icons/bi";
import Comments from "./Components/Comments";
import SuggessioVedio from "./Components/SuggessioVedio";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBare from "./Components/NavBare";
import MainVedio from "./Components/MainVedio";
import { useEffect, useState } from "react";
import "./Components/Style.css"
import { DataComm, dataVed } from "./Components/DataCommentaire";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import useMiddleware from './middleware';


function App() {
  useEffect(() => {
    const visitData = {
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      // Vous pouvez ajouter d'autres informations ici, comme l'agent utilisateur, etc.
    };
  
    fetch('https://beta.cyber-shield.fr/api2/track-visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
  }, [])
const [commentaires, setCommentaires] =  useState(DataComm);
const [vedio, setVedio] = useState(dataVed)

  const handelAdd = (newText) => {
    let newAction = {imgs: "https://yt3.ggpht.com/ytc/AKedOLTksCvRHRkQybOPPFMN2LawgVt3a7NhXmogEw=s88-c-k-c0x00ffffff-no-rj",
         name: "D.R. Just",
         per:"il y a 3 an",
         body: newText,
         like: <AiOutlineLike />,
         dilike: <AiOutlineDislike />,
         but:<BiCaretDown/>,
         aff:"Afficher les 52 réponse"
        };
        setCommentaires([...commentaires, newAction]);
  };
 
  const handelAddVed = (x,y,z,) => {
    let newVed = {srcve: x,
    titleve: y,
    vu:"887 498 vues ",
    poi:".",
    dat:z,
    pt:"Traversy Media",
    ic:<AiFillDownCircle/>,
        };
        setVedio([...vedio, newVed]);
  };
// Exemple avec fetch dans un composant React


// Fonction pour envoyer les détails de la requête au serveur


  return (
    <div className="App" >
      <NavBare />
    
      <Row style={{ marginLeft: 100, marginRight: 20 }} >

        <Col xs={12} md={8}>
          <MainVedio  />
          <Comments add={handelAdd}commentair={commentaires} />

     
        </Col>
        <Col md={4} xs={6}>
        <SuggessioVedio listVedio={vedio} addv={handelAddVed}/>

      </Col>
      
    </Row>
    </div>
  );
}

export default App;
