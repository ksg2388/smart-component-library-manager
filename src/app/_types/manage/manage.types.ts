export type TComponentFormData = {
  thumbnail: File | null;
  componentName: string;
  version: string;
  description: string;
  features: string[];
  environment: string;
  fbxFile: File | null;
  vcmxFile: File | null;
  categoryId: string;
};

export type TLibrary = {
  id: number;
  selected: boolean;
  fileName: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  downloadCount: number;
  thumbnailImage: string;
  description: string;
  mainFeatures: string[];
  recommendedEnvironment: string;
  uploader: string | null;
  category: {
    id: number;
    name: string;
  };
  fileLinks: {
    fbx: string;
    vcmx: string;
  };
};
