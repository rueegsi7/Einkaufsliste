import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI env variable is required');
}

const client = new MongoClient(MONGODB_URI, {
	tls: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let cachedClient = globalThis.__mongoClient;
let cachedDb = globalThis.__mongoDb;

if (!cachedClient) {
	cachedClient = client.connect();
	globalThis.__mongoClient = cachedClient;
}

if (!cachedDb) {
	cachedDb = cachedClient.then((connectedClient) => connectedClient.db('livesync'));
	globalThis.__mongoDb = cachedDb;
}

export async function connectToDatabase() {
	const db = await cachedDb;
	return {
		client: await cachedClient,
		db
	};
}
