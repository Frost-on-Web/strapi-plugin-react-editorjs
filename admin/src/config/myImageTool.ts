const axios = require("axios");

import { auth } from "@strapi/helper-plugin";

// Plugins for Editor.js
import Image from "@editorjs/image";

import { pluginId } from "../utils";

import ImageTool from "@editorjs/image";

const myImageTool: { [toolname: string]: ImageTool } = {
  image: {
    config: {
      field: "files.image",
      additionalRequestData: {
        data: JSON.stringify({}),
      },
      additionalRequestHeaders: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
      endpoints: {
        byUrl: `${process.env.STRAPI_ADMIN_BACKEND_URL}/${pluginId}/image/byUrl`,
      },
      uploader: {
        async uploadByFile(file: any) {
          const formData = new FormData();
          formData.append("data", JSON.stringify({}));
          formData.append("files.image", file);

          const { data } = await axios.post(
            `${process.env.STRAPI_ADMIN_BACKEND_URL}/${pluginId}/image/byFile`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${auth.getToken()}`,
              },
            }
          );

          return data;
        },
      },
    },
  },
};

export default myImageTool;
