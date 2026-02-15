# HTTP Server Task

## Description

Build a simple HTTP Server with the following features:

### GET `/`

- Send a simple "Hello from Server" message to the client.

### GET `/info`

- Send your:
  - Email address
  - Contact number

Response should be in JSON format.

Example response:

```json
{
  "email": "your@email.com",
  "contact": "1234567890"
}
```

### POST `/tweets`

- Accept tweet data from the client (JSON format).
- Perform a fake database operation (store it in memory).
- Send an acknowledgment response confirming it was saved.

Example request body:

```json
{
  "tweet": "Hello World"
}
```

Example response:

```json
{
  "message": "Tweet saved successfully"
}
```

### GET `/tweets`

- Fetch and return all tweets stored in the fake database.
- Response should be in JSON format.

Example response:

```json
[{ "tweet": "Hello World" }, { "tweet": "Node.js is awesome" }]
```

### Logging Requirement

- Log all incoming requests.

- Include:
  - Timestamp
  - HTTP Method
  - Request URL

- Save logs in a file named:

```
log.txt
```

Example log format:

```
2026-02-14T10:15:30.123Z - GET /tweets
2026-02-14T10:16:10.456Z - POST /tweets
```
