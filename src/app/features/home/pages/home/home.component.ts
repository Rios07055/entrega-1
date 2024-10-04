import { Component } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  savedProperties: Property[] = []
  constructor(private propertyService: PropertyService ,private router: Router) {
    this.savedProperties = this.propertyService.getStoredProperties()
    console.log()
    if (this.savedProperties.length === 0) {
      Swal.fire({
        title:'No hay propiedades',
        text: 'Inicia sesión y crea desde el menú',
        icon: 'warning',
      })
    }
  }

  goToProperty(houseId: string) {
    this.router.navigate(['/property', houseId]); 
  }
}
