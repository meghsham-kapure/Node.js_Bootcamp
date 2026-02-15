# Buffers

### 1. What "Buffer" Means in Node.js

- In Node.js, a temporary storage area in memory for handling raw binary data directly is buffer which helps in Efficiently read from / write to memory when dealing with binary/raw data in files, network transmissions, streams, protocols.

### 2. Foundation: How Computers Store Data

- Everything in a computer is ultimately stored as binary (0s and 1s) → base-2 system.
- Each bit = 0 or 1; group of 8 bits = 1 byte.
- Binary alone is hard to read/understand for humans we use represent the data in :
  - Decimal (base-10)
  - Hexadecimal (base-16): very common for raw data (0-9, A-F), compact & easy for memory.
  - Binary is for direct machine level operations
- Different bit lengths fo data means how much that data can grow in term value (8-bit, 16-bit, 64-bit).

### 3. From Numbers → Characters (Encoding)

- Characters, emojis, text aren't stored directly, they use character encodings.
- Most common today: UTF-8 (variable length, backward compatible with ASCII).
  - Example: 'H' → Unicode code point U+0048 → in UTF-8 → hex 0x48 (1 byte).
  - Emoji or non-Latin characters may take 2–4 bytes.
- Other encodings: UTF-16 (JavaScript strings mostly use this internally), UTF-32.
- Same hex value can mean different things depending on the encoding used to interpret it.
- Collection of encoded bytes → becomes readable string when decoded properly.

### 4. Memory & Buffer Concept (Simple Analogy)

- Computer memory is sequence of bytes (like fixed slots).
- You can:
  - Allocate a chunk of memory.
  - Write raw bytes (hex values) into it.
  - Read those bytes back.
- Buffer = exactly this: a controlled, temporary region of raw memory (bytes) that your program can write to and read from directly.
- Node.js Buffers give safe(r) access to this raw memory level.

### 5. Why Buffers Are Needed in Node.js

JavaScript limitations make direct binary handling difficult:

| Aspect          | JavaScript (normal strings)           | Node.js Buffer                                          |
| --------------- | ------------------------------------- | ------------------------------------------------------- |
| Encoding        | Mostly UTF-16                         | Raw bytes (no forced encoding)                          |
| Memory location | Inside V8 heap                        | Outside V8 heap (raw, faster for binary)                |
| Manipulation    | Text-oriented, inefficient for binary | Direct byte-level read/write                            |
| Risk            | Safer, garbage collected              | More control → possible memory leaks/crashes if misused |

- Buffers are essential for:
  - File system (`fs` module) → reading/writing binary files (images, PDFs, executables).
  - Network → TCP, HTTP bodies, WebSockets (raw packets).
  - Streams → handling data in chunks (not loading entire file at once).
  - Binary protocols, crypto, image processing, etc.

## Binary, Buffers & Typed Arrays (Node.js)

1. Everything in a computer is binary
   - Files, text, images, numbers — all stored as continuous 0s and 1s (bytes).
   - Any visible spacing is just formatting for humans.

2. Files store bytes continuously
   - A file is just a sequence of bytes.
   - A “space” in a text file is actually a byte (`00100000` in ASCII), not empty memory.

3. Typed Arrays (JavaScript)
   - Special arrays for working with raw binary data.
   - Fixed size.
   - Fixed data type (e.g., `Int8Array`, `Uint8Array`, `Float32Array`).
   - More memory-efficient than normal JS arrays.

4. Buffer (Node.js)
   - `Buffer` is built on top of `Uint8Array`.
   - Used to handle raw binary data (files, streams, network packets).
   - Many Node.js APIs return or accept Buffers.
   - Even though `Buffer` is global, best practice is:

     ```js
     import { Buffer } from 'buffer';
     ```
