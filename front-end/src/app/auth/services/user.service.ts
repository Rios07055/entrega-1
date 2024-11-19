import { Injectable, signal, WritableSignal, NgZone } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = 'http://localhost:3000/api';
  currentUser = signal<User>({ username: '', password: '' });
  supabase: SupabaseClient | undefined;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.supabase = createClient(environment.supabase.URL, environment.supabase.APIKEY);
    });
  }

  async logIn(email: string, password: string) {
    try {
      const response = await axios.post<User>(`${this.api}/users/login`, { email, password });
      this.setUser(response.data);
      return {
        error: false,
        message: 'Usuario logueado correctamente',
        data: response.data
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        message: 'Usuario o contraseña incorrectos',
        data: null
      };
    }
  }

  async validateUser(): Promise<boolean> {
    if (this.currentUser().username !== "") return true;


    const token = localStorage.getItem('userLogged');
    if (!token) return false
    try {
      const response = await axios.post<User>(`${this.api}/users/validate`, {
        token
      });

      this.currentUser.set(response.data);

      return true;

    } catch (error) {
      localStorage.removeItem('userLogged');
      console.log(error)
      return false
    }

  }

  logout() {
    localStorage.removeItem('userLogged');
    this.currentUser.set({ username: '', password: '' });
  }

  async signUp(user: User) {
    try {
      const response = await axios.post<User>(`${this.api}/users/register`, user);
      this.setUser(response.data);
      return {
        error: false,
        message: 'Usuario registrado correctamente',
        data: response.data
      };
    } catch (error) {
      return {
        error: true,
        message: error instanceof AxiosError ? error.message : 'Error en la autenticación',
        data: null
      };
    }
  }

  setUser(user: User): void {
    localStorage.setItem('userLogged', user.token!.toString());
    this.currentUser.set(user);
  }

  getUser(): WritableSignal<User> {
    return this.currentUser;
  }

  async editUser(updatedUser: User) {
    try {
      const response = await axios.put<User>(`${this.api}/user/${this.currentUser().username}`, updatedUser);
      this.setUser(response.data);
      return {
        error: false,
        message: 'Usuario actualizado correctamente',
        data: response.data
      };
    } catch (error) {
      return {
        error: true,
        message: error instanceof AxiosError ? error.message : 'Error en la actualización',
        data: null
      };
    }
  }

  async uploadProfileImage(file: File, fileName: string, folderName: string = 'base') {
    const { error } = await this.supabase!.storage.from('refugioescondido')
      .upload(`${folderName}/${fileName}`, file);
    if (error) {
      return error.message;
    }

    const { data } = this.supabase!.storage.from('refugioescondido')
      .getPublicUrl(`${folderName}/${fileName}`);
    return data.publicUrl;
  }

}
