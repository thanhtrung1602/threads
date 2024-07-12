import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import actionRuder from "./actionSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import createFilter, { Transform } from "redux-persist-transform-filter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveSubsetBlacklistFilter: Transform<any, any, any> = createFilter(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (inboundState: any, key: string) => {
    if (key === "auth") {
      const { id, idUser, username, image } =
        inboundState.login.currentUser || {};
      return {
        ...inboundState,
        login: {
          ...inboundState.login,
          currentUser: { id, idUser, username, image },
        },
      };
    }
    return inboundState;
  },
  // Không cần thao tác khi lấy dữ liệu từ local storage
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (inboundState: any, key: string) => inboundState,
  { whitelist: ["auth"] }
);

// Tạo mã hóa dữ liệu
const encryptor = encryptTransform({
  secretKey: "my-super-secret-key",
  onError: function (error) {
    // Xử lý lỗi mã hóa
    console.error("Encryption error:", error);
  },
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [saveSubsetBlacklistFilter, encryptor],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  api: actionRuder,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
