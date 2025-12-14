import * as admin from 'firebase-admin';
import { envs } from './envs';

let app: admin.app.App | null = null;

export function getFirebaseApp(): admin.app.App | null {
  if (app) return app;
  const projectId = envs.firebaseProjectId || process.env.FIREBASE_PROJECT_ID;
  const clientEmail = envs.firebaseClientEmail || process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = envs.firebasePrivateKey || process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyRaw) {
    return null; // Firebase not configured; flags will default to safe values
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
  });
  return app;
}

export function getRemoteConfig(): admin.remoteConfig.RemoteConfig | null {
  const firebase = getFirebaseApp();
  return firebase ? admin.remoteConfig(firebase) : null;
}
