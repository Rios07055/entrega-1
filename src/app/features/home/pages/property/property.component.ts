import { Component } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
  property!: Property;

  constructor(private route: ActivatedRoute) {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      const properties: Property[] = JSON.parse(localStorage.getItem('properties') || '[]');
      this.property = properties.find(prop => prop.id === propertyId)!;
      console.log(this.property)
    }
  }
}
