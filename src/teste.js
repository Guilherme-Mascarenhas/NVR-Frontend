  import React, {useState,useEffect, useRef } from 'react';
  import jsmpeg from 'jsmpeg';

  function blobToDataURL(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }


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

    
        // Limpar URL quando o componente for desmontado para evitar vazamentos de memória
       
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
