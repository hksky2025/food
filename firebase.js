/* ============================================================
   小廚料理手帳 — firebase.js
   Firebase 連線模組 — 唯一需要改動 firebaseConfig 的地方
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ─── 你的 Firebase 設定 ──────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBB-oyBKoTYNHy60C9tMOkYA4HFuSsypr8",
  authDomain:        "food-97698.firebaseapp.com",
  projectId:         "food-97698",
  storageBucket:     "food-97698.firebasestorage.app",
  messagingSenderId: "1026575280660",
  appId:             "1:1026575280660:web:e141380a8d0e3df5f55501"
};
// ─────────────────────────────────────────────────────────────

let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("🔥 Firebase 連接成功！");
} catch (e) {
  console.error("Firebase 初始化失敗，請檢查 Config", e);
}

// ─── 公開 API ────────────────────────────────────────────────
window.db_api = {

  /** 讀取所有食譜 */
  list: async () => {
    if (!db) return [];
    const snap = await getDocs(collection(db, "recipes"));
    return snap.docs.map(d => d.data());
  },

  /** 儲存 / 更新食譜（以 id 為 key）*/
  save: async (recipe) => {
    if (!db) throw new Error("Database not connected");
    await setDoc(doc(db, "recipes", recipe.id), recipe);
  },

  /** 刪除食譜 */
  delete: async (id) => {
    if (!db) throw new Error("Database not connected");
    await deleteDoc(doc(db, "recipes", id));
  }
};

// 通知 React App Firebase 已就緒
window.dispatchEvent(new Event("firebase-ready"));
