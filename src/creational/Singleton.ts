//Endures a class have only one access, and it provides a global access to it
//Example 1 : Database Connection
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connectionStatus: string = 'Disconnected';

  private constructor() {
    this.connect();
  }
  private connect(): void {
    this.connectionStatus = 'Connected';
    console.log('Database connected');
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): void {
    console.log(`Executing query: ${sql} - Status: ${this.connectionStatus}`);
  }

  public getStatus(): string {
    return this.connectionStatus;
  }
}

//usage
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log(db1 == db2);
db1.query('SELECT * FROM users');
console.log(db2.getStatus()); // "Connected"
//const obj1 = new DatabaseConnection();

//Example 2 : Configuration Manager
class Config {
  private static instance: Config;
  private settings: Map<string, string> = new Map();

  private constructor() {
    this.loadSettings();
  }

  private loadSettings(): void {
    // Load config from file once
    this.settings.set('API_URL', 'https://api.example.com');
    this.settings.set('TIMEOUT', '5000');
    this.settings.set('MAX_RETRIES', '3');
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public get(key: string): string {
    return this.settings.get(key) as string;
  }
}

const apiConfig = Config.getInstance();
const uiConfig = Config.getInstance();
console.log(apiConfig === uiConfig); // true
