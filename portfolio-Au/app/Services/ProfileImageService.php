<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfileImageService
{
    public function storeProfileImage(
        UploadedFile $file,
        ?string $currentUrl,
        string $directory,
    ): string {
        $this->deleteLocalProfileImage($currentUrl);

        $path = $file->store($directory, 'public');

        return Storage::disk('public')->url($path);
    }

    public function deleteLocalProfileImage(?string $url): void
    {
        if ($url === null || $url === '') {
            return;
        }

        $prefix = Storage::disk('public')->url('');

        if (! str_starts_with($url, $prefix)) {
            return;
        }

        $relativePath = ltrim(substr($url, strlen($prefix)), '/');

        if ($relativePath !== '') {
            Storage::disk('public')->delete($relativePath);
        }
    }
}
