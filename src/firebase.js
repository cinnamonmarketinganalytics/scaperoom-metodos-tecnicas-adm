import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  updateDoc, 
  serverTimestamp,
  collection
} from "firebase/firestore";

// Configuração fornecida pelo usuário para o projeto metodos-tecnicas-adm
const firebaseConfig = {
  apiKey: "AIzaSyCjr8JkiXSxn_CIKPbrxLrWf54NVHKmLzM",
  authDomain: "metodos-tecnicas-adm.firebaseapp.com",
  projectId: "metodos-tecnicas-adm",
  storageBucket: "metodos-tecnicas-adm.firebasestorage.app",
  messagingSenderId: "683900704027",
  appId: "1:683900704027:web:1f22aaca471c71b9e3afbe"
};

// Inicialização do Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper para obter referência do documento da sessão da equipe ('alfa' ou 'beta')
export const getTeamDocRef = (teamKey) => {
  const cleanKey = teamKey.toLowerCase().includes('alfa') ? 'alfa' : 'beta';
  return doc(db, "sessions", cleanKey);
};

export { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  updateDoc, 
  serverTimestamp,
  collection
};
