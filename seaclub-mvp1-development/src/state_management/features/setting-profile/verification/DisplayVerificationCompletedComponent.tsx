import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
interface InitialState {
	shouldDisplayComponent: boolean;
}

{/*(SidebarLink: Manage Verification) This will allow you to display the congratulations Component after confirming the OTP */}
const initialState: InitialState = { shouldDisplayComponent: false };
const DisplayVerificationCompletedComponentSlice = createSlice({
	name: "DisplayOTPVerificationComponentSlice",
	initialState,
	reducers: {
		displayVerificationCompletedComponent: (
			state: InitialState,
			action: PayloadAction<InitialState>
		) => {
			state.shouldDisplayComponent = action.payload.shouldDisplayComponent;
		},
	},
});
export const { displayVerificationCompletedComponent } = DisplayVerificationCompletedComponentSlice.actions;
export const DisplayVerificationCompletedSelector = (state: RootState) =>
	state.displayVerificationCompletedComponent.shouldDisplayComponent;
const displayVerificationCompletedReducer = DisplayVerificationCompletedComponentSlice.reducer;
export default displayVerificationCompletedReducer;
