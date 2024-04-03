import React, {useState,useEffect, useRef } from 'react';


function VideoPlayer() {
  const [imagemURL, setImagemURL] = useState(null);
  const websocket = useRef(null);

  useEffect(() => {
    websocket.current = new WebSocket('ws://localhost:9999/');
    websocket.current.onopen = () => {
      console.log('Conexão WebSocket aberta');
    };
    
    websocket.current.onmessage = (message) => {
      const blob = message.data;
      const url = URL.createObjectURL(blob);
      // Atualizar o estado com o URL
      setImagemURL(url);
      websocket.current.close();
      return () => URL.revokeObjectURL(url); 
    }    
  }, []);

    return (
      <div>
        {imagemURL && (
          <img src={imagemURL} alt="Imagem" />
        )}
      </div>
    );
  };
  export default VideoPlayer;
