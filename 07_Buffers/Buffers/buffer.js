import { Buffer } from 'node:buffer';

/// Allocates a new Buffer of size bytes. If fill is `undefined`, theBuffer will be zero-filled.
// const myBuffer = Buffer.alloc(4);
// console.log(myBuffer); // <Buffer 00 00 00 00> /// Each pair represent 1 bit
// myBuffer[0] = 1;
// console.log(myBuffer); //<Buffer 01 00 00 00> /// It made up of array so array method can be used

// console.log(Buffer.from('9')); // <Buffer 39> /// stores character '9' → ASCII 57 → hex 39
// console.log(Buffer.from([9])); // <Buffer 09>  /// stores numeric 9 directly → hex 09

// Buffer.allocUnsafe(size);

/// `Buffer.allocUnsafe(4)`  is a function takes the size is in bytes and It allocates memory , without clearing it, so previously stored bytes may still exist in that space until you overwrite them.  That’s why it’s called “unsafe”.

// console.log(Buffer.alloc(16).fill([1]));

/// `fill(defaultValue)` is  to fill the butter bits with given value

// const myNameInbuffer = Buffer.alloc(10);
// myNameInbuffer.write('meghsham');
// console.log(myNameInbuffer); // <Buffer 6d 65 67 68 73 68 61 6d 00 00>
// console.log(myNameInbuffer.toString()); // Meghsham

/// Concatenating buffers

// const nameBuffer1 = Buffer.from('meghsham');
// const nameBuffer2 = Buffer.from(' ');
// const nameBuffer3 = Buffer.from('kapure');
// const nameMergedBuffer = Buffer.concat([nameBuffer1, nameBuffer2, nameBuffer3]);

// console.log(nameMergedBuffer); // <Buffer 6d 65 67 68 73 68 61 6d 20 6b 61 70 75 72 65>
// console.log(nameMergedBuffer.toString()); // meghsham kapure
