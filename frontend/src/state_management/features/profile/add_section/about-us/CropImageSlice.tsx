import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ImageTypeEnum {
    banner = 'banner',
    cardImage = 'cardImage',
    image = 'image'
}
interface ICropImageSlice {
    pageName: string
    imageIndex: number,
    imageSrc: string,
    templateNumber: number,
    imageType: ImageTypeEnum
}



const initialState: ICropImageSlice[] = [{
    pageName: '',
    imageIndex: 0,
    imageSrc: '',
    templateNumber: 1,
    imageType: ImageTypeEnum.banner
}]

export const croppedImageSlice = createSlice({
    name: 'croppedImage',
    initialState,
    reducers: {
        addAboutUsCroppedImage: (state, action: PayloadAction<ICropImageSlice>) => {
            const imageExistIndex = state.findIndex(imageInfo =>
                imageInfo.pageName === action.payload.pageName &&
                imageInfo.imageIndex === action.payload.imageIndex &&
                imageInfo.templateNumber === action.payload.templateNumber &&
                imageInfo.imageType === action.payload.imageType &&
                imageInfo.pageName === 'about-us'
            );
            if (imageExistIndex !== -1) {
                state.splice(imageExistIndex, 1, action.payload)
            } else {
                state.push(action.payload);
            }
        }
    }
})

export const { addAboutUsCroppedImage } = croppedImageSlice.actions

export default croppedImageSlice.reducer