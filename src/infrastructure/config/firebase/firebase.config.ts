import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ConfigService } from "@nestjs/config";
import { AppLogger } from "../../logger/logger.service";

const logger = new AppLogger();
logger.setContext('FirebaseConfig');

const configService = new ConfigService();

const firebaseConfig = {
    apiKey: configService.get('FIREBASE_API_KEY'),
    authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
    databaseURL: configService.get('FIREBASE_DATABASE_URL'),
    projectId: configService.get('FIREBASE_PROJECT_ID'),
    storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
    appId: configService.get('FIREBASE_APP_ID'),
    measurementId: configService.get('FIREBASE_MEASUREMENT_ID'),
};

let app;
let database;

const isConfigValid =
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== 'AIzaSyA_placeholder' &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== 'placeholder-id';

if (isConfigValid) {
    try {
        logger.log(`Initializing Firebase with project: ${firebaseConfig.projectId}`);
        app = initializeApp(firebaseConfig);
        database = getDatabase(app);
    } catch (error) {
        logger.error('Failed to initialize Firebase', error);
    }
} else {
    logger.warn(`Firebase configuration is missing or using placeholders. Current Project ID: ${firebaseConfig.projectId}`);
    logger.warn('Firebase features will be limited.');
}

export const db = database;