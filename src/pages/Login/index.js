import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import config from "../../utils/config";
import "./index.css";
import MyContext from "../../components/Auth";

const currentEnvironment = process.env.NODE_ENV || "development";
const apiEndpoint = config[currentEnvironment].apiEndpoint;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { Log, setLog } = useContext(MyContext);
	console.log(Log);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setError("Por favor, preencha todos os campos.");
			return;
		}

		try {
			const response = await axios.post(apiEndpoint + "login/auth", {
				email,
				password,
			});

			if (response.data.error) {
				setError(response.data.message);
			}

			if (response.data.login) {
				setLog(true);
				navigate("/camera");
			}
		} catch (error) {
			console.error("Erro ao chamar a API:", error);
			setError("Erro ao autenticar. Tente novamente mais tarde.");
		}
	};

	return (
		<>
			<div className="login-container">
				<div className="login-form-container">
					<form onSubmit={handleSubmit}>
						<h2 className="title">Login</h2>
						{error && <p style={{ color: "red" }}>{error}</p>}
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
								Entrar
							</button>
						</div>
					</form>
				</div>
				{/*
				<div className="d-flex justify-content-between">
					<div className="bottom-links">
						<Link to={"register"} className="link">
							Cadastre-se
						</Link>
						<Link to={"recoverpass"} className="link">
							Esqueceu a senha
						</Link>
					</div>
				</div>
				*/}
			</div>
		</>
	);
};

export default Login;
