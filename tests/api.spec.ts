import { test, expect, APIRequestContext } from "playwright/test";

const apiUrl = "https://thinking-tester-contact-list.herokuapp.com";


test("POST /users/login", async ({ request }) => {
  const response = await request.post(apiUrl + "/users/login", {
    data: {
      email: "janesh@test.com",
      password: "Test-4321",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
  const token = data.token;
  expect(token).toBeDefined();
  expect(token).toMatch(/^[a-zA-Z0-9._-]+$/);
  console.log(token);
});

test("POST /contacts", async ({ request }) => {
  var { response, token } = await getToken(request);
  let contactDetailsInput = getNewContactDetails();

  response = await request.post(apiUrl + "/contacts", {
    data: getNewContactDetails(),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  const contactData = await response.json();

  expect(contactData.firstName).toEqual(contactDetailsInput.firstName);
  expect(contactData.lastName).toEqual(contactDetailsInput.lastName);
  expect(contactData.birthdate).toEqual(contactDetailsInput.birthdate);
  expect(contactData.email).toEqual(contactDetailsInput.email);
  expect(contactData.phone).toEqual(contactDetailsInput.phone);
  expect(contactData.street1).toEqual(contactDetailsInput.street1);
  expect(contactData.street2).toEqual(contactDetailsInput.street2);
  expect(contactData.city).toEqual(contactDetailsInput.city);
  expect(contactData.stateProvince).toEqual(contactDetailsInput.stateProvince);
  expect(contactData.postalCode).toEqual(contactDetailsInput.postalCode);
  expect(contactData.country).toEqual(contactDetailsInput.country);
});


test("GET /contacts", async ({ request }) => {
  let { response, token } = await getToken(request);
  response = await request.get(apiUrl + "/contacts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});


async function getToken(request: APIRequestContext) {
  const apiUrl = "https://thinking-tester-contact-list.herokuapp.com";
  let response = await request.post(apiUrl + "/users/login", {
    data: {
      email: "janesh@test.com",
      password: "Test-4321",
    },
  });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  const token = data.token;
  return { response, token };
}

function getNewContactDetails(): any {
  return {
    firstName: "Janesh",
    lastName: "Doe",
    birthdate: "1970-01-01",
    email: "janesh@fake.com",
    phone: "8005555555",
    street1: "1 Main St.",
    street2: "Apartment A",
    city: "Anytown",
    stateProvince: "KS",
    postalCode: "12345",
    country: "USA",
  };
}
