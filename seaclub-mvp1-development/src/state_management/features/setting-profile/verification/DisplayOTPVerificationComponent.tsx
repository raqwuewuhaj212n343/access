import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
interface InitialState {
	shouldDisplayComponent: boolean;
}

{/*(SidebarLink: Manage Verification) This will allow you to display the OTP Component when you click on verify button  */}
const initialState: InitialState = { shouldDisplayComponent: false };
const DisplayOTPVerificationComponentSlice = createSlice({
	name: "DisplayOTPVerificationComponentSlice",
	initialState,
	reducers: {
		displayOTPComponent: (
			state: InitialState,
			action: PayloadAction<InitialState>
		) => {
			state.shouldDisplayComponent = action.payload.shouldDisplayComponent;
		},
	},
});
export const { displayOTPComponent } = DisplayOTPVerificationComponentSlice.actions;
export const DisplayOTPVerificationSelector = (state: RootState) =>
	state.displayOTPComponent.shouldDisplayComponent;
const displayOTPVerificationReducer = DisplayOTPVerificationComponentSlice.reducer;
export default displayOTPVerificationReducer;
