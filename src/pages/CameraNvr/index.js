import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import config from "../../utils/config";
import "./index.css";
import MyContext from "../../components/Auth";
import { useNavigate } from "react-router-dom";
const currentEnvironment = process.env.NODE_ENV || "development";
const socketEndpoint = config[currentEnvironment].socketEndpoint;

function VideoPlayer() {
	const [imageURL, setImageURL] = useState(false);
	const [Spinner, setSpinner] = useState(false);
	const [connectAttempt, setConnectAttempt] = useState(0);
	const [selectedCamera, setSelectedCamera] = useState(null);
	const { Log, setLog } = useContext(MyContext);
	const navigate = useNavigate();
	const websocket = useRef(null);
	let max_attemps = 5;

	const connectSocket = async () => {
		return new Promise((resolve, reject) => {
			websocket.current = new WebSocket("ws://localhost:9999/");
			websocket.current.onopen = () => {
				console.log("Conexão WebSocket aberta");
				resolve();
			};
			websocket.current.onerror = (error) => {
				console.error("Erro na conexão WebSocket:", error);
				reject(error);
			};
		});
	};

	const changeChannel = async (channel) => {
		setSpinner(true);
		console.log(channel);
		setSelectedCamera("Cam" + channel);

		try {
			const response = await axios.get(
				socketEndpoint + `start-stream/${channel}`
			);

			if (!response.data.error) {
				await new Promise((resolve) => setTimeout(resolve, 6000));
				await connectSocket();
				//console.log("ws");
				websocket.current.onmessage = (message) => {
					const blob = message.data;
					//console.log(blob);
					if (blob.size > 8) {
						const url = URL.createObjectURL(blob);
						//console.log(url);
						setSpinner(false);
						setImageURL(url);
					}
					websocket.current.onclose = () => {
						console.log("Conexão WebSocket fechada. Tentando reconectar...");
						setImageURL(false);
					};
				};
			} else {
				setConnectAttempt(0);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		console.log(Log);
		if (!Log) {
			navigate("/");
		}
	}, []);

	return (
		<div className="text-center ">
			<div className="mb-4 mt-4 text-center position-relative">
				{imageURL ? (
					<img src={imageURL} alt="Imagem" className="mx-auto border" />
				) : (
					<img
						src="/images/camera-desconnect.png"
						alt="Imagem"
						style={{ width: "640px", height: "480px" }}
					/>
				)}

				{Spinner ? (
					<div className="position-absolute top-50 start-50 translate-middle">
						<div
							className="spinner-border text-light"
							style={{ display: "block" }}
							role="status"></div>
					</div>
				) : (
					<div className="position-absolute top-50 start-50 translate-middle">
						<div
							className="spinner-border text-light"
							style={{ display: "none" }}
							role="status"></div>
					</div>
				)}
			</div>
			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false">
					{selectedCamera ? selectedCamera : "Selecione uma câmera"}
				</button>
				<ul className="dropdown-menu">
					<li>
						<a className="dropdown-item" onClick={() => changeChannel(1)}>
							Cam1
						</a>
					</li>
					<li>
						<a className="dropdown-item" onClick={() => changeChannel(2)}>
							Cam2
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default VideoPlayer;
