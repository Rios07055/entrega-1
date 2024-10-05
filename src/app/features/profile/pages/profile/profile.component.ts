import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../auth/services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../../../auth/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid'
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm!: FormGroup
  user;
  uploadedPhoto: string | undefined 
  
  constructor(private formBuilder: FormBuilder, private userService: UserService, ){
    this.user = this.userService.getUser()
    const photo = this.user().photo
    this.uploadedPhoto = photo ? photo : 'avatar.png'

    this.profileForm = this.formBuilder.nonNullable.group({
      username: [this.user().username, [Validators.required, Validators.minLength(3)]],
      biography: [this.user().biography, [Validators.maxLength(500)]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  

  onFileUpload(event:Event){
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null); 
      }
    });
    let inputFile = event.target as HTMLInputElement;
    if(!inputFile.files || inputFile.files.length <= 0){
      return;
    }
    const file: File = inputFile.files[0];
    const fileName = uuidv4();
    this.userService
      .uploadProfileImage(file, fileName, this.user().username)
      .then(data =>{
        this.uploadedPhoto = data!;
        this.userService.editUser({ 
          username: this.user().username,
          password: this.user().password,
          photo: this.uploadedPhoto
        });
        Swal.close();
        inputFile.value = '';
    }).catch(()=>{
      Swal.close();
        Swal.fire('Error', 'Ocurrió un error la imagen', 'error');
    });
  }

  // Gestión del evento de envío del formulario
  onSubmit(): void {
    if (!this.profileForm.valid) {  
      Swal.fire({
        text:'Debe diligenciar los campos correctamente',
        icon:'error'
      });  
      return
    }
    if (this.profileForm.value.password !== this.profileForm.value.confirmPassword){
      Swal.fire({
        text:'Las contraseñas no coinciden',
        icon:'error'
      });  
      return
    }
    const editedUser: User = {
      username: this.profileForm.value.username || this.user().username,
      biography: this.profileForm.value.biography || this.user().biography,
      password: this.profileForm.value.password || this.user().password,
    }
    this.userService.editUser(editedUser)
    Swal.fire({
      text:'Cambios realizados',
      icon:'success'
    });
    this.profileForm.reset()
  }
}
