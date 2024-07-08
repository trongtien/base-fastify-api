import sharp, { Sharp } from 'sharp';
import fs from 'fs';

export default class ResizeImage {
  #transformImage: Sharp | undefined;
  #rootPathUploadFile: string

  constructor(rootPathUploadFile: string) {
    this.#rootPathUploadFile = rootPathUploadFile
    this.#transformImage = sharp();
  }

  async run(path: string, file_name: string, type: 'POST_ESTATE') {
    if (!this.#transformImage) {
      throw Error('Driver transform undefined, can not run resize !!!');
    }
    const readStream = fs.createReadStream(path);
    if (type === 'POST_ESTATE') {
      this.formatPostEstate();
      this.resizePostEstate();

      const pathNameResize = `${this.#rootPathUploadFile}/resize/${file_name}`;
      return readStream?.pipe(this.#transformImage).toFile(pathNameResize, function (error) {
        if (error) {
          throw new Error(error.stack);
        }

        return true
      });
    }

    return readStream?.pipe(this.#transformImage);
  }

  private formatPostEstate() {
    this.#transformImage = this.#transformImage?.toFormat('webp');
  }

  private resizePostEstate() {
    this.#transformImage = this.#transformImage?.resize(500, 500);
  }
}
