import { configureStore } from "@reduxjs/toolkit";
import PasswordRecoveryReducer from "./features/PasswordRecoverySlice";
import getComponentReducer from "./features/setting-profile/GetSelectedComponent";
import changePasswordReducer from "./features/setting-profile/email/ChangePassword";
import displayOTPVerificationReducer from "./features/setting-profile/verification/DisplayOTPVerificationComponent";
import displayVerificationCompletedReducer from "./features/setting-profile/verification/DisplayVerificationCompletedComponent";
import { persistStore } from "redux-persist";
import GetImageToChangeInfosReducer from "./features/profile/add_section/portfolio/edit-portfolio-template/GetImageToChangeInfosSlice";
import CropImageSlice from "./features/profile/add_section/about-us/CropImageSlice";


const store = configureStore({
	reducer: {
		passwordRecovery: PasswordRecoveryReducer,
		getSelectedComponent: getComponentReducer,
		changePassword: changePasswordReducer,
		displayOTPComponent: displayOTPVerificationReducer,
		displayVerificationCompletedComponent: displayVerificationCompletedReducer,
		getImageToChangeSelector: GetImageToChangeInfosReducer,
		croppedImages: CropImageSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
