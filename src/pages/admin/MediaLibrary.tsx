import { Image } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { MediaGrid } from '@/components/admin/MediaGrid';

const MediaLibrary = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
        <p className="text-muted-foreground">
          Upload and manage images for your products and content
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Upload images to use across your products and content. Click "Copy URL" to get the link for pasting into product image fields.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MediaUploader />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>
            All your uploaded media files. Hover over an image to copy its URL or delete it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MediaGrid />
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLibrary;
