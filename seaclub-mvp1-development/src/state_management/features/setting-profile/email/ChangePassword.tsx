import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
interface InitialState {
	displayComponent: boolean;
    setCurrentEmail?: string
}
{/*(Component: SidebarLinks  > Manage Email) This will allow you to display the password Component and get the user email when you click on (more icon > change password )  */}
const initialState: InitialState = { displayComponent: false, setCurrentEmail: "" };
const ChangePasswordSlice = createSlice({
	name: "ChangePasswordSlice",
	initialState,
	reducers: {
		displayPasswordComponent: (
			state: InitialState,
			action: PayloadAction<InitialState>
		) => {
			state.displayComponent = action.payload.displayComponent;
            state.setCurrentEmail = action.payload.setCurrentEmail;
		},
	},
});
export const { displayPasswordComponent } = ChangePasswordSlice.actions;
export const displayPassworComponentSelector = (state: RootState) =>
	state.changePassword.displayComponent;
export const getCurrentUserEmailSelector = (state: RootState) =>
	state.changePassword.setCurrentEmail;
const changePasswordReducer = ChangePasswordSlice.reducer;
export default changePasswordReducer;
