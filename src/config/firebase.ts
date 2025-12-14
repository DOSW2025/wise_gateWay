import * as admin from 'firebase-admin';
import { envs } from './envs';

let appPromise: Promise<admin.app.App | null> | null = null;

export async function getFirebaseApp(): Promise<admin.app.App | null> {
  if (appPromise) return appPromise;
  appPromise = (async () => {
    const projectId = envs.firebaseProjectId;
    const clientEmail = envs.firebaseClientEmail;
    const privateKeyRaw = envs.firebasePrivateKey;

    if (!projectId || !clientEmail || !privateKeyRaw) {
      return null; // Firebase not configured; flags will default to safe values
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

    // If an app is already initialized (e.g., hot reload), reuse it
    const existingApps = admin.apps;
    if (existingApps && existingApps.length > 0) {
      return existingApps[0];
    }

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  })();
  return appPromise;
}

export async function getRemoteConfig(): Promise<admin.remoteConfig.RemoteConfig | null> {
  const firebase = await getFirebaseApp();
  return firebase ? admin.remoteConfig(firebase) : null;
}
