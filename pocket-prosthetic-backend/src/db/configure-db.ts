import MysqlDataSource from "./datasource";

const configureDB = async () => {
	try {
		console.log("Connecting to mysql database...");
		await MysqlDataSource.initialize();
	} catch (error) {
		console.log("Failed to set up adapters: " + error);
	}
};

configureDB();
