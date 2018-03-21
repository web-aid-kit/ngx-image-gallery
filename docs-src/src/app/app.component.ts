import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { NgForm } from "@angular/forms";
import _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  
  images: GALLERY_IMAGE[] = [
    {
      url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260", 
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      title: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260", 
      altText: 'woman-in-black-blazer-holding-blue-cup', 
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/630833/pexels-photo-630833.jpeg?w=1260", 
      altText: 'adventure-enjoyment-explore-girl', 
      thumbnailUrl: "https://images.pexels.com/photos/630833/pexels-photo-630833.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/618542/pexels-photo-618542.jpeg?w=1260", 
      extUrl: 'https://www.pexels.com/photo/adventure-beautiful-enjoyment-freedom-618542/',
      extUrlTarget: '_self',
      title: 'adventure-beautiful-enjoyment-freedom',
      thumbnailUrl: "https://images.pexels.com/photos/618542/pexels-photo-618542.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/597329/pexels-photo-597329.jpeg?w=1260", 
      altText: 'art-materials-arts-and-crafts-bloom-blooming', 
      extUrl: 'https://www.pexels.com/photo/art-materials-arts-and-crafts-bloom-blooming-597329/',
      title: 'art-materials-arts-and-crafts-bloom-blooming',
      thumbnailUrl: "https://images.pexels.com/photos/597329/pexels-photo-597329.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/618547/pexels-photo-618547.jpeg?w=1260", 
      altText: 'adult-beard-blur-business', 
      extUrl: 'https://www.pexels.com/photo/adult-beard-blur-business-618547/',
      title: 'adult-beard-blur-business',
      thumbnailUrl: "https://images.pexels.com/photos/618547/pexels-photo-618547.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/597331/pexels-photo-597331.jpeg?w=1260",
      thumbnailUrl: "https://images.pexels.com/photos/597331/pexels-photo-597331.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/590516/pexels-photo-590516.jpeg?w=1260", 
      altText: '', 
      extUrl: 'https://www.pexels.com/photo/adult-beard-beverage-blur-590516/',
      title: 'Beards are the men thing. We always feel proud of our beards. My love towards Beard, made to collect some awesome quotes and sayings on beard.',
      thumbnailUrl: "https://images.pexels.com/photos/590516/pexels-photo-590516.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/586335/pexels-photo-586335.jpeg?w=1260", 
      altText: 'beverage-cafe-coffee-cup', 
      title: 'beverage-cafe-coffee-cup',
      thumbnailUrl: "https://images.pexels.com/photos/586335/pexels-photo-586335.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/586333/pexels-photo-586333.jpeg?w=1260", 
      altText: 'chair-deck-chair-guitar-musical-instrument', 
      extUrl: 'https://www.pexels.com/photo/chair-deck-chair-guitar-musical-instrument-586333/',
      title: 'chair-deck-chair-guitar-musical-instrument',
      thumbnailUrl: "https://images.pexels.com/photos/586333/pexels-photo-586333.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/582433/pexels-photo-582433.jpeg?w=1260", 
      altText: 'blur-cellphone-close-up-focus',
      title: 'blur-cellphone-close-up-focus',
      thumbnailUrl: "https://images.pexels.com/photos/582433/pexels-photo-582433.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/573563/pexels-photo-573563.jpeg?w=1260", 
      altText: 'beard-business-businessman-businesswoman', 
      extUrl: 'https://www.pexels.com/photo/beard-business-businessman-businesswoman-573563/',
      title: 'beard-business-businessman-businesswoman',
      thumbnailUrl: "https://images.pexels.com/photos/573563/pexels-photo-573563.jpeg?w=60"
    },
  ];

  conf: GALLERY_CONF = {
    imageBorderRadius: '3px',
    imageOffset: '20px',
    showDeleteControl: true,
    showCloseControl: true,
    showExtUrlControl: true,
    showImageTitle: true,
    showThumbnails: true,
    closeOnEsc: true,
    reactToKeyboard: true,
    reactToMouseWheel: true,
    reactToRightClick: false,
    thumbnailSize: 30,
    backdropColor: 'rgba(13,13,14,0.85)',
    inline: false,
    showArrows: true,
    imagePointer: true
  };

  range = _.range;

  constructor(){}

  ngOnInit() {}

  // open gallery
  openGallery(form: NgForm) {
    this.conf = form.value;
    this.ngxImageGallery.open(0);
  }

  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }
}
