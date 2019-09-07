const fs = require('fs');
const path = require('path');
const resizeImg = require('resize-img');
const { promisify } = require('util');

const imgName = process.argv[2];
const readFilePromisify = promisify(fs.readFile);
const writeFilePromisify = promisify(fs.writeFile);

(async () => {
    const imgBuffer = await readFilePromisify(
        path.resolve(__dirname, './assets', `./${imgName}`)
    );

    const thumbnailBuffer = await resizeImg(imgBuffer, {
        width: 30,
    });

    await writeFilePromisify(
        path.resolve(__dirname, './thumbnails', `./${imgName}`),
        thumbnailBuffer
    );
    console.log('生成缩略图成功！');
})();
