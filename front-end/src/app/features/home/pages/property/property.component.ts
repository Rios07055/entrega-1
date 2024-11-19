import { Component } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../../../auth/services/user.service';
import { User } from '../../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  property!: Property;
  user?: User;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService, private userService: UserService) {
    this.user = userService.currentUser()
    const propertyId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(propertyId);

    this.propertyService.getPropertyById(propertyId).then((property) => {
      this.property = property;
    });
  }

  getPhotoUrl(item: any): string {
    return item.photos?.[0]?.photo_url || 'assets/default-photo.jpg';
  }

}
