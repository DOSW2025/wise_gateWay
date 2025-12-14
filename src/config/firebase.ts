import * as admin from 'firebase-admin';
import { Logger } from '@nestjs/common';
import { envs } from './envs';

const logger = new Logger('FirebaseConfig');
let appPromise: Promise<admin.app.App | null> | null = null;

export async function getFirebaseApp(): Promise<admin.app.App | null> {
  if (appPromise) return appPromise;
  appPromise = (async () => {
    const projectId = envs.firebaseProjectId;
    const clientEmail = envs.firebaseClientEmail;
    const privateKeyRaw = envs.firebasePrivateKey;

    logger.log(`Firebase initialization - ProjectID: ${projectId || 'MISSING'}, Email: ${clientEmail ? 'SET' : 'MISSING'}, PrivateKey: ${privateKeyRaw ? 'SET (' + privateKeyRaw.substring(0, 30) + '...)' : 'MISSING'}`);

    if (!projectId || !clientEmail || !privateKeyRaw) {
      logger.warn('Firebase not fully configured - feature flags will use default values');
      return null; // Firebase not configured; flags will default to safe values
    }

    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

    // If an app is already initialized (e.g., hot reload), reuse it
    const existingApps = admin.apps;
    if (existingApps && existingApps.length > 0) {
      logger.log('Reusing existing Firebase app instance');
      return existingApps[0];
    }

    try {
      const app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
      logger.log('✅ Firebase Admin initialized successfully');
      return app;
    } catch (error) {
      logger.error(`❌ Firebase initialization failed: ${error instanceof Error ? error.message : error}`);
      throw error;
    }
  })();
  return appPromise;
}

export async function getRemoteConfig(): Promise<admin.remoteConfig.RemoteConfig | null> {
  const firebase = await getFirebaseApp();
  return firebase ? admin.remoteConfig(firebase) : null;
}
