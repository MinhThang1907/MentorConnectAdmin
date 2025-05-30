import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const db = getFirestore();
const auth = getAuth();

export { db, auth };
