const usePixelate = (img, options = {}) => {
	// size: 一个大像素，占据几个像素点。
	const { width = 320, height = 320, size = 10 } = options;
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	// 初始化画布尺寸
	canvas.width = width;
	canvas.height = height;

	ctx.drawImage(img, 0, 0, width, height);

	// 统计信息后，清空画布，再画上像素画
	const pixelMap = genePixelMap(ctx, { width, height, size });
	ctx.clearRect(0, 0, width, height);
	draw(ctx, pixelMap, size);

	// 返回 canvas dom
	return {
		element: canvas,
	};
};

export { usePixelate };

const genePixelMap = (ctx, options) => {
	const pixelSet = new Set();
	const { width, height, size } = options;
	for (let x = 0; x < width; x += size) {
		for (let y = 0; y < height; y += size) {
            console.log(x, y)
			let pixelInfo = ctx.getImageData(x, y, 1, 1).data
            const [R, G, B, A] = pixelInfo
            
			const color = `rgba(${R},${G},${B},${A / 255})`
            pixelSet.add({ x, y, color })
		}
	}

	return pixelSet;
};

const draw = (ctx, pixelSet, size) => {
	pixelSet.forEach((pixelInfo) => {
		const { color, x, y } = pixelInfo;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, size, size);
	});
};
