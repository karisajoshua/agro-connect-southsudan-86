import { useState } from 'react';
import { Copy, Trash2, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaFile, getPublicUrl, useDeleteMedia } from '@/hooks/useMediaLibrary';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface MediaCardProps {
  file: MediaFile;
}

export const MediaCard = ({ file }: MediaCardProps) => {
  const [copied, setCopied] = useState(false);
  const deleteMedia = useDeleteMedia();
  const publicUrl = getPublicUrl(file.name);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Preview */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img
          src={publicUrl}
          alt={file.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopyUrl}
            className="h-8"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy URL
              </>
            )}
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            onClick={() => window.open(publicUrl, '_blank')}
            className="h-8"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* File Info */}
      <div className="p-3">
        <p className="text-sm font-medium truncate text-foreground" title={file.name}>
          {file.name}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">
            {file.metadata && typeof file.metadata.size === 'number' 
              ? formatFileSize(file.metadata.size) 
              : 'Unknown size'} •{' '}
            {formatDate(file.created_at)}
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Image</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{file.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMedia.mutate(file.name)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
