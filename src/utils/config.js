const config = {
	development: {
		apiEndpoint: "http://localhost:3001/",
		socketEndpoint: "http://localhost:3010/", //  endpoint de desenvolvimento
	},
	production: {
		apiEndpoint: "https://api.example.com", // endpoint de produção
	},
};

export default config;
