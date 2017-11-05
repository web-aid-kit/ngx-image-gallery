export interface GALLERY_CONF {
	imageBorderRadius?: string;
	imageOffset?: string;
	showDeleteControl?: boolean;
	showCloseControl?: boolean;
	showExtUrlControl?: boolean;
	showImageTitle?: boolean;
	showThumbnails?: boolean;
	thumbnailsLength?: number;
}

export interface GALLERY_IMAGE {
	url: string;
	thumbnailUrl?: string;
	altText?: string;
	title?: string;
	extUrl?: string;
	extUrlTarget?: string;
}