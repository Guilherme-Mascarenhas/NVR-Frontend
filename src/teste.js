import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import config from "./utils/config";
const currentEnvironment = process.env.NODE_ENV || "development";
const socketEndpoint = config[currentEnvironment].socketEndpoint;

function VideoPlayer() {
	const [imagemURL, setImagemURL] = useState(null);
	const websocket = useRef(null);

	//init and desconnect of socket
	useEffect(() => {
		websocket.current = new WebSocket("ws://localhost:9999/");
		websocket.current.onopen = () => {
			console.log("Conexão WebSocket aberta");
		};

		websocket.current.onmessage = (message) => {
			const blob = message.data;
			const url = URL.createObjectURL(blob);

			setImagemURL(url);

			return () => {
				URL.revokeObjectURL(url);
				if (websocket.current) {
					console.log("WebSocket connection closed");
					websocket.current.close();
				}
			};
		};
	}, []);

	/*const changeChannel = async (event) => {
		let channel = event.target.value;

		try {
			const response = await axios.get(
				socketEndpoint + `start-stream/${channel}`
			);

			if (!response.data.error) {
				websocket.current = new WebSocket("ws://localhost:9999/");
				websocket.current.onopen = () => {
					console.log("Conexão WebSocket aberta");
				};

				websocket.current.onmessage = (message) => {
					const blob = message.data;
					const url = URL.createObjectURL(blob);

					setImagemURL(url);
				};
			}
		} catch (error) {
			console.log(error);
		}
	};*/

	return (
		<div>
			<select>
				<option value="1">Canal 1</option>
				<option value="2">Canal 2</option>
			</select>
			<img src={imagemURL} alt="Imagem" />
		</div>
	);
}

export default VideoPlayer;
