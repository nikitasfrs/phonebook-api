# Phonebook API

## Available NPM scripts

### Install dependencies

`npm i`

### Test

`npm test`

### Populate database with testing data

`npm run populate-db`

### Start

`npm start`

### Start development mode

`npm run dev`

## Available endpoints

### GET /contacts

```
curl --location --request GET 'http://0.0.0.0:3000/contacts?sortBy=contact_id&order=DESC' \
--data-raw ''
```

### POST /contacts

```
curl --location --request POST 'http://0.0.0.0:3000/contacts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "full_name": "koko",
    "phone_work": "123",
    "phone_mobile": "123",
    "phone_other": "123",
    "phone_home": "123",
    "email": "foo@bar",
    "address": "some address"
}'
```

### PUT /contact/:id

```
curl --location --request PUT 'http://0.0.0.0:3000/contacts/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "full_name": "FOO BAARRRRR",
    "phone_work": "784-235-0127 x488",
    "phone_mobile": "1-214-402-3151 x4870",
    "phone_home": "(413) 450-0103",
    "phone_other": "611-775-8196 x5190",
    "email": "Maya_Reynolds60@hotmail.com",
    "address": "359 Jaeden Gateway"
}'
```

### DELETE /contacts/:id

```
curl --location --request DELETE 'http://0.0.0.0:3000/contacts/151' \
--data-raw ''
```

## TODO

- Increase coverage
- Integration tests
- API token access
