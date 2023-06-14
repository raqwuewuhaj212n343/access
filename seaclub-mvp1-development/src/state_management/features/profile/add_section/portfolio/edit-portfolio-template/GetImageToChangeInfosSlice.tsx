import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/state_management/store";


interface InitialState {
  imageToCrop?: string,
  idImageToChange?: number,
}

const initialState: InitialState = { idImageToChange: 0, imageToCrop: '' };

const GetImageToChangeInfosSlice = createSlice({
  name: "GetImageToChangeInfos",
  initialState,
  reducers: {
    setImageToChange: (state:InitialState, action: PayloadAction<InitialState>) =>{
      state.imageToCrop = action.payload.imageToCrop
      
    },
    setIdImageToChange: (state:InitialState, action: PayloadAction<InitialState>) =>{
      state.idImageToChange = action.payload.idImageToChange
    }
  },
});


const GetImageToChangeInfosReducer = GetImageToChangeInfosSlice.reducer;

export const { setImageToChange, setIdImageToChange } = GetImageToChangeInfosSlice.actions;

export const GetImageToChangeIdSelector = (state: RootState) =>
  state.getImageToChangeSelector.idImageToChange;

  export const GetImageToCropSelector = (state: RootState) =>
  state.getImageToChangeSelector.imageToCrop;
  

export default GetImageToChangeInfosReducer;
