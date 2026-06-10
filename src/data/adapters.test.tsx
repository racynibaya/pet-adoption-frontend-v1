import { describe, it, expect } from 'vitest';
import { apiPetToPetCard, shelterCityOf } from './adapters';
import type { ApiPet } from '@/services/api';

const BASE_PET: ApiPet = {
  id: 7,
  name: 'Biscuit',
  species: 'DOG',
  breed: 'Aspin',
  ageMonths: 14,
  gender: 'MALE',
  size: 'MEDIUM',
  status: 'AVAILABLE',
  shelterId: 2,
  description: 'A gentle, playful pup.',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('apiPetToPetCard', () => {
  it('maps core backend fields onto the card view model', () => {
    const card = apiPetToPetCard(BASE_PET);
    expect(card.id).toBe(7);
    expect(card.name).toBe('Biscuit');
    expect(card.species).toBe('DOG');
    expect(card.shelterId).toBe(2);
    expect(card.description).toBe('A gentle, playful pup.');
  });

  it('derives display defaults (bg/color/svg) from species', () => {
    const card = apiPetToPetCard(BASE_PET);
    expect(card.bg).toBeTruthy();
    expect(card.color).toBeTruthy();
    expect(card.svg).toBeTruthy();
  });

  it('orders images primary-first and exposes the primary as imageUrl', () => {
    const card = apiPetToPetCard({
      ...BASE_PET,
      images: [
        {
          id: 1,
          petId: 7,
          imageUrl: 'secondary.jpg',
          publicId: 'a',
          isPrimary: false,
          createdAt: '',
        },
        {
          id: 2,
          petId: 7,
          imageUrl: 'primary.jpg',
          publicId: 'b',
          isPrimary: true,
          createdAt: '',
        },
      ],
    });
    expect(card.imageUrl).toBe('primary.jpg');
    expect(card.imageUrls).toEqual(['primary.jpg', 'secondary.jpg']);
  });

  it('leaves image fields undefined when there are no images', () => {
    const card = apiPetToPetCard(BASE_PET);
    expect(card.imageUrl).toBeUndefined();
    expect(card.imageUrls).toBeUndefined();
  });

  it('falls back to empty strings when shelter is absent', () => {
    const card = apiPetToPetCard(BASE_PET);
    expect(card.shelterName).toBe('');
    expect(card.shelterCity).toBe('');
  });
});

describe('shelterCityOf', () => {
  it('trims the city', () => {
    expect(shelterCityOf({ city: '  Davao  ' })).toBe('Davao');
  });

  it('returns empty string for null/undefined shelter', () => {
    expect(shelterCityOf(null)).toBe('');
    expect(shelterCityOf(undefined)).toBe('');
  });
});
