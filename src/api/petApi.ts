import { APIRequestContext } from '@playwright/test';
import { BaseApi } from './baseApi';

export interface PetCategory {
  id: number;
  name: string;
}

export interface PetTag {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  category: PetCategory;
  name: string;
  photoUrls: string[];
  tags: PetTag[];
  status: 'available' | 'pending' | 'sold' | string;
}

export class PetApi extends BaseApi {
  constructor(request: APIRequestContext, baseUrl = 'https://petstore.swagger.io/v2/') {
    super(request, baseUrl);
  }

  createPet(pet: Pet) {
    return this.post<Pet>('pet', pet);
  }

  getPet(petId: number | string) {
    return this.get<Pet>(`pet/${petId}`);
  }

  deletePet(petId: number | string) {
    return this.delete<unknown>(`pet/${petId}`);
  }
}
