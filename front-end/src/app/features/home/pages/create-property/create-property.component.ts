import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { PropertyService } from '../../services/property.service';
import { UserService } from '../../../../auth/services/user.service';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.css',
})
export class CreatePropertyComponent {
  user;
  uploadedUrl = '';
  propertyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private userService: UserService
  ) {
    this.user = userService.getUser();
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      num_bedrooms: ['', [Validators.required, Validators.min(0)]],
      num_bathrooms: ['', [Validators.required, Validators.min(0)]],
      max_guests: ['', [Validators.required, Validators.min(0)]],
      price_per_night: ['', [Validators.required, Validators.min(0)]],
      latitude: ['', [Validators.required, Validators.min(0)]],
      longitude: ['', [Validators.required, Validators.min(0)]],
    });
  }
  uploadImage(event: Event) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
      },
    });
    let input = event.target as HTMLInputElement;
    if (input.files!.length <= 0) {
      return;
    }
    const fileName = uuidv4();
    let file: File = input.files![0];
    this.propertyService
      .uploadImage(file, fileName, this.user().username + 'properties')
      .then((data) => {
        this.uploadedUrl = data!;
        Swal.close();
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error inesperado',
          text: 'Intenta otra vez',
        });
        console.error(error);
      });
  }

  async onSubmit() {

    if (!this.propertyForm.valid) {
      Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
      console.log(this.propertyForm.errors);
      return;
    }

    const propertyData = {
      id: uuidv4(),
      photo_url: this.uploadedUrl,
      owner: this.user().username,
      title: this.propertyForm.value.title,
      address: this.propertyForm.value.address,
      price_per_night: this.propertyForm.value.price_per_night,
      num_bedrooms: this.propertyForm.value.num_bedrooms,
      num_bathrooms: this.propertyForm.value.num_bathrooms,
      max_guests: this.propertyForm.value.max_guests,
      latitude: this.propertyForm.value.latitude,
      longitude: this.propertyForm.value.longitude,
      description: this.propertyForm.value.description,
    };
    // localStorage.setItem('properties', JSON.stringify(properties));

    try {
      await this.propertyService.createProperty(propertyData);
      Swal.fire({
        icon: 'success',
        text: 'La propiedad ha sido creada con éxito',
      });
      this.router.navigate(['/'])
      this.propertyForm.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'La propiedad no pudo ser creada con éxito',
      });
    }

  }
}
