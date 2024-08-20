/**
 * Cover up the missing types for the editorjs plugins
 * => Used in the admin/src/config/customTools.ts file
 */

declare module "@editorjs/paragraph" {
  import Paragraph from "@editorjs/paragraph";
  export = Paragraph;
}
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
declare module "@editorjs/list" {
  import List from "@editorjs/list";
  export = List;
}
declare module "@editorjs/warning" {
  import Warning from "@editorjs/warning";
  export = Warning;
}
declare module "@editorjs/header" {
  import Header from "@editorjs/header";
  export = Header;
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

declare module "@editorjs/quote" {
  import Quote from "@editorjs/quote";
  export = Quote;
}
declare module "@editorjs/link" {
  import Link from "@editorjs/link";
  export = Link;
}
