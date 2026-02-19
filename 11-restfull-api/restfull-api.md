# RESTful API

- RESTful API is an API architecture style.

## Statelessness

- The server does not store client session data.
- Each request must contain all required information.
- Data is stored in a database or cloud storage.

## Uniform Interface

- Uses meaningful API endpoints.
- Uses standard HTTP methods:
  - GET → Fetch data
  - POST → Create data
  - PUT/PATCH → Update data
  - DELETE → Remove data

## Caching

- Allows responses to be cached.
- Reduces repeated database calls.
- Improves performance.

## Client–Server Architecture

- Frontend and backend are separated.
- Communication usually happens using JSON.
- Both systems can be developed independently.
