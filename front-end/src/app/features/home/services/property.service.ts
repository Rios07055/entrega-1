import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import axios from 'axios';
import { Property } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {


  api: string = 'http://localhost:3000/api';


  supabase: SupabaseClient | undefined;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.supabase = createClient(
        environment.supabase.URL,
        environment.supabase.APIKEY
      );
    })
  }

  async createProperty(data:any) {
    try {
      await axios.post(`${this.api}/listing`, data);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getPropertyById(id:string) {
    try {
      const { data } = await axios.get(`${this.api}/listing/${id}`);
      return data
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async uploadImage(file: File, fileName: string, folderName: string = 'base') {
    const { error } = await this.supabase!.storage.from('refugioescondido')
      .upload(`${folderName}/${fileName}`, file);
    if (error) {
      console.log(error.message);
      return;
    }

    const { data } = this.supabase!.storage.from('refugioescondido')
      .getPublicUrl(`${folderName}/${fileName}`);
    return data.publicUrl;
  }

  async getStoredProperties() {
    try {
      const { data } = await axios.get(`${this.api}/listing`);
      return data
    } catch (error) {
      return []
    }
  }
}
