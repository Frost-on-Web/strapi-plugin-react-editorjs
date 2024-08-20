import { useState, useCallback } from "react";

import { createReactEditorJS } from "react-editor-js";

import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";

import { myImageTool, customTools } from "../../config";

import { changeFunc, getToggleFunc } from "../Medialib/utils";
import MediaLibAdapter from "../Medialib/adapter";
import MediaLibComponent from "../Medialib/component";

const ReactEditorJS = createReactEditorJS();

type EditorProps = {
  name: string;
  value: string;
  disabled: boolean;
  onChange: (e: any) => void;
};

const Editor = (props: EditorProps) => {
  const { name, value, onChange } = props;

  console.log("Editor properties :", props);

  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);

  const mediaLibToggleFunc = useCallback(
    getToggleFunc({
      openStateSetter: setIsMediaLibOpen,
      indexStateSetter: setMediaLibBlockIndex,
    }),
    []
  );

  const handleMediaLibChange = useCallback(
    (data) => {
      changeFunc({
        indexStateSetter: setMediaLibBlockIndex,
        data,
        index: mediaLibBlockIndex,
        editor: editorInstance,
      });

      mediaLibToggleFunc();
    },
    [mediaLibBlockIndex, editorInstance]
  );

  const mediaLibTool = {
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc,
      },
    },
  };

  if (!value) return null;

  return (
    <>
      <Box borderColor={"neutral200"} hasRadius={true}>
        <Typography>
          <ReactEditorJS
            minHeight={50} // Reduce the default `300px` padding-bottom : https://github.com/codex-team/editor.js/issues/724
            tools={{ ...customTools }} // ...myImageTool, ...mediaLibTool,
            onInitialize={(editor) => {
              const api = editor.dangerouslyLowLevelInstance;

              api.isReady.then(() => {
                setEditorInstance(api);

                if (value && JSON.parse(value).blocks.length) {
                  api.render(JSON.parse(value));
                }
              });
            }}
            onChange={(api, ev) => {
              api.saver.save().then((newData) => {
                if (!newData.blocks.length) {
                  onChange({ target: { name, value: null } });
                } else {
                  onChange({
                    target: { name, value: JSON.stringify(newData) },
                  });
                }
              });
            }}
          />
        </Typography>
      </Box>
      {/* <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
      /> */}
    </>
  );
};

export default Editor;
