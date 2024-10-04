import { Injectable, NgZone } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  supabase: SupabaseClient | undefined;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      this.supabase = createClient(
        environment.supabase.URL,
        environment.supabase.APIKEY
      );
    })
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

  getStoredProperties(){
    // Las propiedades se guardan en el local storage
    const savedPropertiesData = localStorage.getItem('properties');
    if (savedPropertiesData) {
      return JSON.parse(savedPropertiesData);
    }
    else { return [] }
  }
}
