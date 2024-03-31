if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

class Config {
    public isDevelopment = process.env.NODE_ENV === "development";
    public isProduction = process.env.NODE_ENV === "production";
    public port = 0;
    public sqlHost = "";
    public sqlUser = "";
    public sqlPassword = "";
    public sqlDatabase = "";
}

class DevelopmentConfig extends Config {
    public port = 3001;
    public sqlHost = "localhost";
    public sqlUser = "root";
    public sqlPassword = "";
    public sqlDatabase = "tours"; // Database Name
}

class ProductionConfig extends Config {
    public port = +process.env.PORT;
    public sqlHost = "u-cdbr-west-03.cleardb.net";
    public sqlUser = "b740d2abef1b24";
    public sqlPassword = "db309269";
    public sqlDatabase = "heroku_94ad5cec32a715b";
}

// mysql://b740d2abef1b24:db309269@eu-cdbr-west-03.cleardb.net/heroku_94ad5cec32a715b?reconnect=true

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
