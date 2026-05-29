<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('github_avatar_url')->nullable()->after('resume_url');
            $table->string('facebook_avatar_url')->nullable()->after('github_avatar_url');
            $table->string('facebook_cover_photo_url')->nullable()->after('facebook_avatar_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'github_avatar_url',
                'facebook_avatar_url',
                'facebook_cover_photo_url',
            ]);
        });
    }
};
