﻿# NVR-Frontend

Este projeto é dedicado à transmissão em tempo real de uma câmera IP conectada na mesma LAN, sem a necessidade de cabeamento, utilizando o protocolo de rede RTSP para a transmissão da imagem.

O projeto foi dividido em dois módulos distintos: o Front-end e o Back-end.

Front-end
O módulo do Front-end concentra-se na interface do usuário, onde estão reunidas as páginas da aplicação, além da funcionalidade de inserção de novos cadastros e visualização das imagens.

As imagens são consumidas por meio de uma conexão WebSocket estabelecida com o nosso backend.

Principais Funcionalidades:

Interface do usuário intuitiva e amigável.
Inserção facilitada de novos cadastros.
Visualização em tempo real das imagens provenientes da câmera IP.
Comunicação eficiente e assíncrona com o backend por meio de WebSockets.

Tecnologias Utilizadas:
React
