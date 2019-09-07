const fs = require('fs');

function calculate(buffer) {
    // if (buffer.toString('ascii', 12, 16) === pngFriedChunkName) {
    //     return {
    //         width: buffer.readUInt32BE(32),
    //         height: buffer.readUInt32BE(36),
    //     };
    // }
    return {
        width: buffer.readUInt32BE(16),
        height: buffer.readUInt32BE(20),
    };
}

console.log(fs.readFileSync('./404.png').toString('utf-8', 12, 16));

