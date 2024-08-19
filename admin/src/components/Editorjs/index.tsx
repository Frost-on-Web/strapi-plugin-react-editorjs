import { useState, useCallback } from "react";

import { createReactEditorJS } from "react-editor-js";

import { myImageTool, customTools } from "@/config";

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

const Editor = ({ name, value, disabled, onChange }: EditorProps) => {
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

  return (
    <>
      <div
        style={{
          border: `1px solid rgb(227, 233, 243)`,
          borderRadius: `2px`,
          marginTop: `4px`,
        }}
      >
        <ReactEditorJS
          tools={{ ...myImageTool, ...mediaLibTool, ...customTools }}
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
          onInitialize={(editor) => {
            const api = editor.dangerouslyLowLevelInstance;

            api.isReady.then(() => {
              setEditorInstance(api);
              if (value && JSON.parse(value).blocks.length) {
                api.render(JSON.parse(value));
              }
            });
          }}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
      />
    </>
  );
};

Editor.defaultProps = {
  disabled: false,
  value: "",
};

export default Editor;
