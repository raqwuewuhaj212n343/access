import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface InitialState {
	email: string;
}
{/* This will allow you to get the mail of the user that want to change his password  */}
const initialState: InitialState = { email: "" };
const PasswordRecoverySlice = createSlice({
	name: "passwordRecoverySlice",
	initialState,
	reducers: {
		getUserEmail: (
			state: InitialState,
			action: PayloadAction<InitialState>
		) => {
			state.email = action.payload.email;
		},
	},
});
export const { getUserEmail } = PasswordRecoverySlice.actions;
export const PasswordRecoverySelector = (state: RootState) =>
	state.passwordRecovery.email;
const PasswordRecoveryReducer = PasswordRecoverySlice.reducer;
export default PasswordRecoveryReducer;
