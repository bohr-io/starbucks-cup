const Jimp = require('jimp');

exports.handler = async (event) => {
    const name = event.queryStringParameters.name;

    // Carregue a imagem do copo de café
    const image = await Jimp.read('cup.jpg');

    // Carregue uma fonte
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    // Calcule a posição centralizada horizontalmente
    const textWidth = Jimp.measureText(font, name);
    const x = (image.bitmap.width - textWidth) / 2;

    // Posicione o texto a 150px da parte inferior da imagem
    const y = image.bitmap.height - 150;

    // Escreva o nome na imagem
    image.print(font, x, y, name);

    // Converta a imagem para buffer
    const bufferImage = await image.getBufferAsync(Jimp.MIME_JPEG);

    const response = {
        statusCode: 200,
        headers: { 'Content-Type': 'image/jpeg' },
        body: bufferImage.toString('base64'),
        isBase64Encoded: true,
    };

    return response;
};