import { pluginId } from "../../../utils";

import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";

// import Quote from "@editorjs/quote";
// import LinkTool from "@editorjs/link";

const customTools = {
  paragraph: {
    // We override the by-default "paragraph" plugin in order to accept (just one) blank line : https://github.com/codex-team/editor.js/issues/2218
    class: Paragraph,
    inlineToolbar: true,
    config: {
      preserveBlank: true,
    },
  },
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message",
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  marker: {
    class: Marker,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,

  // quote: {
  //   class: Quote,
  //   inlineToolbar: true,
  //   config: {
  //     quotePlaceholder: 'Quote',
  //     captionPlaceholder: 'Quote`s author',
  //   },
  // },
  // LinkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: `/api/${pluginId}/link`,
  //   },
  // },
};

export default customTools;
