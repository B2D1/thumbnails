const Koa = require('koa');
const cors = require('koa-cors');
const fs = require('fs');
const path = require('path');
const resizeImg = require('resize-img');
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));

const app = new Koa();
app.use(cors());

app.use(async ctx => {
    if (ctx.request.path === '/') {
        ctx.set('Content-Type', 'text/html');
        ctx.body = fs.createReadStream(
            path.resolve(__dirname, './nodeToThumbnail.html')
        );
        return;
    }
    if (ctx.request.path === '/generateThumbnail') {
        const { imgName, width } = ctx.query;
        const readFilePromisify = promisify(fs.readFile);

        const imgInfo = await sizeOf(
            path.resolve(__dirname, './assets', `./${imgName}`)
        );

        const imgBuffer = await readFilePromisify(
            path.resolve(__dirname, './assets', `./${imgName}`)
        );

        const thumbnailBuffer = await resizeImg(imgBuffer, {
            width: parseInt(width),
        });

        ctx.body = {
            type: imgInfo.type,
            base64URL: thumbnailBuffer.toString('base64'),
        };
        return;
    }
    if (ctx.request.path === '/blurThumbnails') {
        ctx.set('Content-Type', 'text/html');
        ctx.body = fs.createReadStream(
            path.resolve(__dirname, './blurToThumbnail.html')
        );
        return;
    }
    const filePath = ctx.request.path;
    ctx.set('Content-Type', `image/${filePath.split('.')[1]}`);
    ctx.body = fs.createReadStream(path.resolve(__dirname, `./${filePath}`));
    return;
});

app.listen(3000, () => {
    console.log('server is listening at :3000');
});
