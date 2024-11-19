import { Component } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  savedProperties: Property[] = []
  constructor(private propertyService: PropertyService, private router: Router, private userService: UserService) {
    const user = userService.currentUser()

    this.userService.validateUser()

    this.propertyService.getStoredProperties()
      .then((properties) => {
        this.savedProperties = properties
        if (user.email === '') {
          Swal.fire({
            title: 'No hay propiedades',
            text: 'Inicia sesión y crea desde el menú',
            icon: 'warning'
          })
        } else if(this.savedProperties.length === 0) {
          Swal.fire({
            title: 'No hay propiedades',
            text: 'Crea una desde el menú',
            icon: 'warning'
          })
        }

      })
  }

  goToProperty(houseId: string) {
    this.router.navigate(['/property', houseId]);
  }

  getPhotoUrl(item: any): string {
    return item.photos?.[0]?.photo_url || 'assets/default-photo.jpg';
  }
}
