import React, { useState } from "react";
import axios from "axios";
import config from "../../utils/config";
import "./index.css";
import { Link } from "react-router-dom";
const currentEnvironment = process.env.NODE_ENV || "development";
const apiEndpoint = config[currentEnvironment].apiEndpoint;

const Login = () => {
	const [name, setname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password || !name) {
			setError("Por favor, preencha todos os campos.");
			return;
		}

		try {
			//new user
			const response = await axios.post(apiEndpoint + "user/new", {
				name,
				email,
				password,
			});

			if (response.data.error) {
				setError(response.data.message);
			} else {
				//Exibir cadastro com sucesso
			}
		} catch (error) {
			console.error("Erro ao chamar a API:", error);
			setError("Erro ao autenticar. Tente novamente mais tarde.");
		}
	};

	return (
		<div className="login-container">
			<div className="login-form-container">
				<form onSubmit={handleSubmit}>
					<h2 className="title">Register</h2>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Nome:
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							value={name}
							onChange={(e) => setname(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email:
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="senha" className="form-label">
							Senha:
						</label>
						<input
							type="password"
							className="form-control"
							id="senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="d-flex justify-content-end">
						<button type="submit" className="btn btn-primary">
							Cadastrar
						</button>
					</div>
				</form>
			</div>
			<div className="d-flex justify-content-between">
				<div className="bottom-links">
					<Link to={"/"} className="link">
						Voltar
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
