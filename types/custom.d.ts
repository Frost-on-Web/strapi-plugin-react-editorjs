declare module "@strapi/design-system/*";
declare module "@strapi/design-system";
declare module "@strapi/icons";
declare module "@strapi/icons/*";
//declare module "@strapi/helper-plugin";

/**
 * Cover up the missing types for the editorjs plugins
 * => Used in the admin/src/config/customTools.ts file
 */

declare module "@editorjs/image" {
  import Image from "@editorjs/image";
  export = Image;
}
declare module "@editorjs/embed" {
  import Embed from "@editorjs/embed";
  export = Embed;
}
declare module "@editorjs/table" {
  import Table from "@editorjs/table";
  export = Table;
}
declare module "@editorjs/warning" {
  import Warning from "@editorjs/warning";
  export = Warning;
}
declare module "@editorjs/code" {
  import Code from "@editorjs/code";
  export = Code;
}
declare module "@editorjs/link" {
  import Link from "@editorjs/link";
  export = Link;
}
declare module "@editorjs/raw" {
  import Raw from "@editorjs/raw";
  export = Raw;
}
declare module "@editorjs/marker" {
  import Marker from "@editorjs/marker";
  export = Marker;
}
declare module "@editorjs/checklist" {
  import Checklist from "@editorjs/checklist";
  export = Checklist;
}
declare module "@editorjs/delimiter" {
  import Delimiter from "@editorjs/delimiter";
  export = Delimiter;
}
