import { useState, useEffect } from "react";

// Import des images
import bg1 from './assets/Images/9.jpg';
import bg2 from './assets/Images/10.jpg';
import bg3 from './assets/Images/11.jpg';
import bg4 from './assets/Images/12.jpg';
import bg5 from './assets/Images/13.jpg';
import bg6 from './assets/Images/14.jpg';
import bg7 from './assets/Images/15.jpg';
import bg8 from './assets/Images/16.jpg';
import bg9 from './assets/Images/17.jpg';
import bg10 from './assets/Images/13.jpg';

function App() {
  // Liste des backgrounds possibles
  const backgrounds = [bg1, bg2, bg3, bg4, bg5,bg6,bg7,bg8,bg9,bg10];

  // États pour le background et la citation actuels
  const [background, setBackground] = useState(backgrounds[0]);
  const [quote, setQuote] = useState("Chargement de la citation...");

  // Fonction pour changer le background
  const changeBackground = () => {
    const randomBgIndex = Math.floor(Math.random() * backgrounds.length);
    setBackground(backgrounds[randomBgIndex]);
  };

  // Fonction pour récupérer une citation via l'API
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content); // Mettre à jour la citation
    } catch (error) {
      console.error("Erreur lors de la récupération de la citation :", error);
      setQuote("Impossible de charger une citation. Réessayez plus tard.");
    }
  };

  // Utiliser setInterval avec useEffect pour changer le contenu
  useEffect(() => {
    const interval = setInterval(() => {
      changeBackground();
      fetchQuote(); // Récupérer une nouvelle citation
    }, 5000); // Change toutes les 5 secondes

    // Nettoyage pour éviter des fuites de mémoire
    return () => clearInterval(interval);
  });

  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Conteneur flou pour le texte */}
      <div className="bg-black/30 w-[800px] backdrop-blur-sm p-10 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed">
            <path d="m228-240 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T458-480L320-240h-92Zm360 0 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T818-480L680-240h-92ZM320-500q25 0 42.5-17.5T380-560q0-25-17.5-42.5T320-620q-25 0-42.5 17.5T260-560q0 25 17.5 42.5T320-500Zm360 0q25 0 42.5-17.5T740-560q0-25-17.5-42.5T680-620q-25 0-42.5 17.5T620-560q0 25 17.5 42.5T680-500Zm0-60Zm-360 0Z"/>
          </svg>
        </div>
        <h1 className="text-white text-3xl font-semibold transition-all duration-1000">{quote}</h1>
        <p>{}</p>
       
      </div>
    </div>
  );
}

export default App;
