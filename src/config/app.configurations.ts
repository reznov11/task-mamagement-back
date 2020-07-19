export default (): any => ({
  database: {
    host: process.env.MONGO_DB_URI,
  },
  envFilePath: ['.env.local', '.env.production'],
  isGlobal: true,
  ignoreEnvFile: false,
});
