import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useUploadMedia } from '@/hooks/useMediaLibrary';
import { Button } from '@/components/ui/button';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const MediaUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const uploadMedia = useUploadMedia();

  const validateFiles = (files: File[]): File[] => {
    return files.filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        return false;
      }
      return true;
    });
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      
      const fileArray = Array.from(files);
      const validFiles = validateFiles(fileArray);
      
      if (validFiles.length === 0) {
        return;
      }

      uploadMedia.mutate(validFiles);
    },
    [uploadMedia]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-primary/50'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {uploadMedia.isPending ? (
          <>
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-muted-foreground">Uploading...</p>
          </>
        ) : (
          <>
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                Drag and drop images here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to select files
              </p>
            </div>
            <input
              type="file"
              accept={ACCEPTED_TYPES.join(',')}
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="media-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="media-upload" className="cursor-pointer">
                <ImageIcon className="h-4 w-4 mr-2" />
                Select Images
              </label>
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, PNG, WebP, GIF • Max 5MB per file
            </p>
          </>
        )}
      </div>
    </div>
  );
};
