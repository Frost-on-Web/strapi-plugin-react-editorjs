import { prefixFileUrlWithBackendUrl, useLibrary } from "@strapi/helper-plugin";

type MediaLibProps = {
  isOpen: boolean;
  onChange: (files: any[]) => void;
  onToggle: () => void;
};

const MediaLib = ({ isOpen, onChange, onToggle }: MediaLibProps) => {
  const { components } = useLibrary();

  if (!isOpen) {
    return null;
  }

  if (!components) return <div>Loading...</div>;

  const MediaLibraryDialog = components["media-library"];

  const handleSelectAssets = (files: any) => {
    const formattedFiles = files.map((f: any) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
    }));

    onChange(formattedFiles);
  };

  return <div>TODO</div>;
};

export default MediaLib;
