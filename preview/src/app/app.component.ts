import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from 'ngx-image-gallery';
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
      url: "https://images.unsplash.com/photo-1507097489474-c9212a8f8597?fit=crop&w=1351&q=80", 
      altText: 'Is education residence conveying so so.',
      extUrl: 'https://unsplash.com/photos/WHPsxhB4mWQ',
      title: 'Is education residence conveying so so.', 
      thumbnailUrl: "https://images.unsplash.com/photo-1507097489474-c9212a8f8597?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1512722328319-51c3d027c228?fit=crop&w=634&q=80", 
      altText: 'He my polite be object oh change.', 
      title: 'He my polite be object oh change.',
      thumbnailUrl: "https://images.unsplash.com/photo-1512722328319-51c3d027c228?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1585054285389-200faa8a353c?fit=crop&w=1350&q=80", 
      altText: 'Separate families my on drawings do oh offended strictly elegance.', 
      thumbnailUrl: "https://images.unsplash.com/photo-1585054285389-200faa8a353c?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1475078891680-4a52da36b99f?fit=crop&w=626&q=80", 
      extUrl: 'https://unsplash.com/photos/2aomZq8JUvA',
      extUrlTarget: '_self',
      title: 'Add you viewing ten equally believe put.',
      thumbnailUrl: "https://images.unsplash.com/photo-1475078891680-4a52da36b99f?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1572933014070-3aec28ebba4d?fit=crop&w=1194&q=80", 
      altText: 'Now seven world think timed while her.', 
      extUrl: 'https://unsplash.com/photos/QPqD-w28ADc',
      title: 'Now seven world think timed while her.',
      thumbnailUrl: "https://images.unsplash.com/photo-1572933014070-3aec28ebba4d?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1484519213701-f60f23ec40c6?fit=crop&w=1350&q=80", 
      altText: 'An admiration at he discovered difficulty continuing.', 
      extUrl: 'https://unsplash.com/photos/1fuYkTG5DBc',
      title: 'An admiration at he discovered difficulty continuing.',
      thumbnailUrl: "https://images.unsplash.com/photo-1484519213701-f60f23ec40c6?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1498569086936-33ccd92e4789?fit=crop&w=700&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1498569086936-33ccd92e4789?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1522968280648-16e1237ecf46?fit=crop&w=634&q=80", 
      altText: '', 
      extUrl: 'https://unsplash.com/photos/BEsp0GzUCmQ',
      title: 'Spoil large oh he rooms on since an. Am up unwilling eagerness perceived incommode. Are not windows set luckily musical hundred can. Collecting if sympathize middletons be of of reasonably.',
      thumbnailUrl: "https://images.unsplash.com/photo-1522968280648-16e1237ecf46?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1546373727-f803b7298d14?fit=crop&w=1491&q=80", 
      altText: 'Agreed joy vanity regret met may ladies oppose who. ', 
      title: 'Agreed joy vanity regret met may ladies oppose who. ',
      thumbnailUrl: "https://images.unsplash.com/photo-1546373727-f803b7298d14?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1584598147703-b4769ffb2c89?fit=crop&w=1350&q=80", 
      altText: 'Mile fail as left as hard eyes. ', 
      extUrl: 'https://unsplash.com/photos/dr18lpelFRQ',
      title: 'Mile fail as left as hard eyes. ',
      thumbnailUrl: "https://images.unsplash.com/photo-1584598147703-b4769ffb2c89?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1481800997946-d2a9f2c82683?fit=crop&w=1316&q=80", 
      altText: 'Meet made call in mean four year it to.',
      title: 'Meet made call in mean four year it to.',
      thumbnailUrl: "https://images.unsplash.com/photo-1481800997946-d2a9f2c82683?fit=crop&w=60"
    },
    {
      url: "https://images.unsplash.com/photo-1487603527224-a650979f288e?fit=crop&w=1350&q=80", 
      altText: 'Prospect so branched wondered sensible of up.', 
      extUrl: 'https://unsplash.com/photos/oSZzkAqIRIM',
      title: 'Prospect so branched wondered sensible of up.',
      thumbnailUrl: "https://images.unsplash.com/photo-1487603527224-a650979f288e?fit=crop&w=60"
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
