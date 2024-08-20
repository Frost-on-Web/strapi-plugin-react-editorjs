import { Strapi } from "@strapi/strapi";
import { parseMultipartData } from "@strapi/utils";

import fs from "fs";
import path from "path";
import axios from "axios";

import ogs from "open-graph-scraper";

import { LocalFileData } from "get-file-object-from-local-path";

import { pluginId } from "../utils";

export default ({ strapi }: { strapi: Strapi }) => ({
  /**
   * Retrieve meta information from a URL (in order to display them in the editor, like a preview thing)
   */
  link: async (ctx) => {
    const result = await new Promise((resolve) => {
      ogs(ctx.query, (error, results, response) => {
        const imageUrl =
          results.ogImage && results.ogImage.url
            ? { url: results.ogImage.url }
            : undefined;

        resolve({
          success: 1,
          meta: {
            title: results.ogTitle,
            description: results.ogDescription,
            image: imageUrl,
          },
        });
      });
    });

    ctx.send(result);
  },

  /**
   * Upload a file from the user's local system
   */
  byFile: async (ctx) => {
    try {
      const { files } = parseMultipartData(ctx);

      const [uploadedFile] = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {},
          files: Object.values(files),
        });

      ctx.send({
        success: 1,
        file: uploadedFile,
      });
    } catch (e) {
      ctx.send(
        {
          success: 0,
          message: e.message,
        },
        500
      );
    }
  },

  /**
   * Upload a file from an URL
   */
  byURL: async (ctx) => {
    try {
      const { url } = ctx.request.body;
      const { name, ext } = path.parse(url);
      const filePath = `./public/${name}${ext}`;

      const response = await axios.get(url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "binary");

      await fs.promises.writeFile(filePath, buffer);

      const fileData = new LocalFileData(filePath);

      const file = {
        path: filePath,
        name: fileData.name,
        type: fileData.type,
        size: Buffer.byteLength(buffer),
      };

      const [uploadedFile] = await strapi
        .plugin("upload")
        .service("upload")
        .upload({
          data: {},
          files: file,
        });

      await fs.promises.unlink(filePath);

      ctx.send({
        success: 1,
        file: uploadedFile,
      });
    } catch (e) {
      ctx.send(
        {
          success: 0,
          message: e.message,
        },
        500
      );
    }
  },
});
