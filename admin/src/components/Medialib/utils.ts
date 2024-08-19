export const getToggleFunc = ({
  openStateSetter,
  indexStateSetter,
}: {
  openStateSetter: (arg0: (arg0: boolean) => boolean) => void;
  indexStateSetter: (arg0: number) => void;
}) => {
  return (idx?: number) => {
    if (idx || idx === 0) {
      indexStateSetter(idx);
    }

    openStateSetter((prev: boolean) => !prev);
  };
};

export const changeFunc = ({
  indexStateSetter,
  editor,
  data,
  index,
}: {
  indexStateSetter: (arg0: number) => void;
  editor: any;
  data: any;
  index: number;
}) => {
  let insertedBlocksCount = 0;

  data.forEach((entry: any) => {
    if (!entry.mime.includes("image")) {
      return;
    }

    const newBlockType = "image";
    const newBlockData = {
      file: {
        url: entry.url.replace(window.location.origin, ""),
        mime: entry.mime,
        height: entry.height,
        width: entry.width,
        size: entry.size,
        alt: entry.alt,
        formats: entry.formats,
      },
      caption: "",
      withBorder: false,
      withBackground: false,
      stretched: false,
    };

    editor.blocks.insert(
      newBlockType,
      newBlockData,
      {},
      index + insertedBlocksCount,
      true
    );
    insertedBlocksCount++;
  });

  editor.blocks.delete(index + insertedBlocksCount);
  indexStateSetter(-1);
};
