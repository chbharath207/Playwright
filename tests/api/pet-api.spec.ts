import { test, expect } from '@playwright/test';
import { PetApi } from '../../src/api';

test('creates and retrieves a pet using the API framework', async ({ request }) => {
  const petApi = new PetApi(request);
  const petId = Date.now();

  const petPayload = {
    id: petId,
    category: {
      id: 1,
      name: 'Dogs',
    },
    name: 'Bruno',
    photoUrls: ['https://example.com/bruno.jpg'],
    tags: [
      {
        id: 1,
        name: 'friendly',
      },
    ],
    status: 'available',
  };

  const createResult = await petApi.createPet(petPayload);

  expect(createResult.status, `Create pet failed: ${JSON.stringify(createResult.body)}`).toBe(200);
  expect(createResult.body).toMatchObject({
    id: petId,
    name: 'Bruno',
    status: 'available',
  });

  const createdPetId = createResult.body.id;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const getResult = await petApi.getPet(createdPetId);

  expect(getResult.status, `Get pet failed: ${JSON.stringify(getResult.body)}`).toBe(200);
  expect(getResult.body).toMatchObject({
    id: createdPetId,
    name: 'Bruno',
    status: 'available',
  });
});

test('returns 404 when a pet ID does not exist', async ({ request }) => {
  const petApi = new PetApi(request);
  const invalidPetId = 999999999999;

  const result = await petApi.getPet(invalidPetId);

  expect(result.status).toBe(404);
  expect(result.body).toMatchObject({
    code: 1,
    type: 'error',
    message: 'Pet not found',
  });
});

test('returns 404 when trying to delete a pet that does not exist', async ({ request }) => {
  const petApi = new PetApi(request);
  const invalidPetId = 999999999999;

  const result = await petApi.deletePet(invalidPetId);

  expect(result.status).toBe(404);
});