import { useState } from "react";

import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";

type MediaLibComponentProps = {
  isOpen: boolean;
  onChange: (data: any) => void;
  onToggle: () => void;
};

const MediaLibComponent = ({
  isOpen,
  onChange,
  onToggle,
}: MediaLibComponentProps) => {
  // const { components } = useLibrary();
  // const [data, setData] = useState(null);

  // if (!components) return <div>Loading...</div>;
  // const MediaLibraryDialog = components["media-library"];

  // const handleInputChange = (data: any) => {
  //   if (data) {
  //     setData(data);
  //   }
  // };

  // const handleSelectAssets = (files: any) => {
  //   const formattedFiles = files.map((f: any) => ({
  //     alt: f.alternativeText || f.name,
  //     url: prefixFileUrlWithBackendUrl(f.url),
  //     width: f.width,
  //     height: f.height,
  //     size: f.size,
  //     mime: f.mime,
  //     formats: f.formats,
  //   }));
  //   onChange(formattedFiles);
  // };

  if (!isOpen) {
    return null;
  }

  return (
    <div>TODO</div>
    // <MediaLibraryDialog
    //   allowedTypes={["images"]}
    //   onClose={onToggle}
    //   onInputMediaChange={handleInputChange}
    //   onSelectAssets={handleSelectAssets}
    // />
  );
};

MediaLibComponent.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
};

export default MediaLibComponent;
