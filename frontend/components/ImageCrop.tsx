import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactCrop, { Crop, PercentCrop, PixelCrop } from "react-image-crop";

interface IImageCropProps {
	imageURL: string;
	disableCrop: boolean;
	scale: number;
	rotate: number;
	setCroppedImageFile: React.Dispatch<React.SetStateAction<File | null>>;
	aspect: number;
	circularCrop?: boolean;
}
const TO_RADIANS = Math.PI / 180;
const ImageCrop = ({
	circularCrop,
	imageURL,
	disableCrop,
	scale,
	rotate,
	setCroppedImageFile,
	aspect,
}: IImageCropProps) => {
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [crop, setCrop] = useState<Crop>(
		// 	{
		// 	unit: "%",
		// 	x: 5,
		// 	y: 5,
		// 	width: 90,
		// 	height: 90,
		// }
	);

	const handleCropComplete = (crop: PixelCrop, percentCrop: PercentCrop) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const image = imageRef.current;
		const pixelRatio = window.devicePixelRatio;
		if (!ctx) {
			throw new Error("No 2d context");
		}
		if (!image) {
			throw new Error("No image");
		}
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
		canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

		ctx.scale(pixelRatio, pixelRatio);
		ctx.imageSmoothingQuality = "high";

		const cropX = crop.x * scaleX;
		const cropY = crop.y * scaleY;
		const rotateRads = rotate * TO_RADIANS;
		const centerX = image.naturalWidth / 2;
		const centerY = image.naturalHeight / 2;

		ctx.save();
		ctx.translate(-cropX, -cropY);
		ctx.translate(centerX, centerY);
		ctx.rotate(rotateRads);
		ctx.scale(scale, scale);
		ctx.translate(-centerX, -centerY);
		ctx.drawImage(
			image,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight
		);

		ctx.restore();

		// const dataUrl = canvas.toDataURL()
		canvas.toBlob((blob) => {
			if (blob) {
				// Create a File object from the Blob
				const file = new File([blob], "cropped-image.png", {
					type: "image/png",
					lastModified: Date.now(),
				});
				setCroppedImageFile(file);
			}
		}, "image/png");
	};

	return (
		<ReactCrop
			crop={crop}
			onChange={(_, percentCrop) => setCrop(percentCrop)}
			onComplete={handleCropComplete}
			aspect={aspect}
			className="h-full w-full flex justify-center items-center"
			keepSelection={true}
			disabled={disableCrop}
			circularCrop={circularCrop}
		>
			<Image
				className="object-contain"
				ref={imageRef}
				width={500}
				height={100}
				src={imageURL}
				alt="imageUrl"
				style={{
					height: `${circularCrop ? "257px" : "205px"}`,
					width: "100%",
					transform: `scale(${scale}) rotate(${rotate}deg)`,
				}}
			/>
		</ReactCrop>
	);
};

export default ImageCrop;
