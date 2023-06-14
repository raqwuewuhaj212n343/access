import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from "../../store";
interface InitialState {
	component: ReactNode;
}
{/* Component: SidebarLinks */}
{/* This will allow you to select the component linked to the SidebarLink which you clicked on in the Sidebar */}
const initialState: InitialState = { component: null };
const GetSelectedComponentSlice = createSlice({
	name: "GetSelectedComponentSlice",
	initialState,
	reducers: {
		setComponent: (
			state: InitialState,
			action: PayloadAction<InitialState>
		) => {
			state.component = action.payload.component;
		},
	},
});
export const { setComponent } = GetSelectedComponentSlice.actions;
export const getComponentSelector = (state: RootState) =>
	state.getSelectedComponent.component;
const getComponentReducer = GetSelectedComponentSlice.reducer;
export default getComponentReducer;
