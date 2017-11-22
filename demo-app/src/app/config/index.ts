// gallery configuration

import {GALLERY_CONF, GALLERY_IMAGE} from "ngx-image-gallery";

export const DEMO_GALLERY_CONF_INLINE: GALLERY_CONF = {
  imageOffset: '0px',
  imagePointer: true,
  showDeleteControl: false,
  showCloseControl: false,
  showExtUrlControl: false,
  closeOnEsc: true,
  showImageTitle: false,
  inline: true,
  backdropColor: 'default'
};

export const DEMO_GALLERY_CONF: GALLERY_CONF = {
  imageOffset: '0px',
  showDeleteControl: false,
  showCloseControl: true,
  showImageTitle: false,
  inline: false,
  backdropColor: 'rgba(13,13,14,0.85)'
};

// gallery images
export const DEMO_GALLERY_IMAGE: GALLERY_IMAGE[] = [
  {
    url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260",
    altText: 'woman-in-black-blazer-holding-blue-cup',
    title: 'woman-in-black-blazer-holding-blue-cup',
    thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
  },
  {
    url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260",
    altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain',
    extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
    thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
  },
];
