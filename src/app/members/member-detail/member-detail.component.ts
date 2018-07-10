import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from '../../../../node_modules/ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;
  tab = 0;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      this.tab = params['tab'];
      this.selectTab(this.tab);
    });

    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 5,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      }
    ];

    this.galleryImages = this.getImages();

  }

  getImages() {
    const images = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      images.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return images;
  }

  selectTab(tabId: number) {
    if (this.memberTabs.tabs[tabId] != null) {
      this.memberTabs.tabs[tabId].active = true;
    }
  }

}
