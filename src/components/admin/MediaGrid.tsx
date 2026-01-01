import { useMediaFiles } from '@/hooks/useMediaLibrary';
import { MediaCard } from './MediaCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

export const MediaGrid = () => {
  const { data: files, isLoading, error } = useMediaFiles();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Failed to load media files. Please try again.</p>
      </div>
    );
  }

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <ImageOff className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No images uploaded yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Upload images using the area above
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {files.map((file) => (
        <MediaCard key={file.id} file={file} />
      ))}
    </div>
  );
};
