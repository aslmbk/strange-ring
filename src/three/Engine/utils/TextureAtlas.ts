import * as THREE from "three";

export class TextureAtlas {
  private loader: THREE.TextureLoader;

  constructor(textureLoader?: THREE.TextureLoader) {
    this.loader = textureLoader ?? new THREE.TextureLoader();
  }

  public async load(texturePaths: string[]): Promise<THREE.DataArrayTexture> {
    const loadedTextures = await Promise.all(
      texturePaths.map((path) => {
        return this.loadTexture(path);
      })
    );

    const width = loadedTextures[0].image.width;
    const height = loadedTextures[0].image.height;
    const depth = loadedTextures.length;

    const size = width * height;
    const data = new Uint8Array(4 * size * depth);

    for (let i = 0; i < depth; i++) {
      const img = loadedTextures[i].image;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d")!;
      context.drawImage(img, 0, 0);
      const imgData = context.getImageData(0, 0, width, height).data;

      // data.set(imgData, i * size * 4);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcY = height - 1 - y;
          const srcPos = (srcY * width + x) * 4;
          const dstPos = (i * size + y * width + x) * 4;

          data[dstPos] = imgData[srcPos];
          data[dstPos + 1] = imgData[srcPos + 1];
          data[dstPos + 2] = imgData[srcPos + 2];
          data[dstPos + 3] = imgData[srcPos + 3];
        }
      }
    }

    const texture = new THREE.DataArrayTexture(data, width, height, depth);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  private loadTexture(path: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (texture) => resolve(texture),
        undefined,
        (err) => reject(err)
      );
    });
  }
}
