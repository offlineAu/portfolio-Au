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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->default('Portfolio');
            $table->string('name');
            $table->string('username');
            $table->string('title');
            $table->string('location');
            $table->string('email');
            $table->string('availability')->nullable();
            $table->text('bio');
            $table->string('about_heading')->default('Hi, I am Airl');
            $table->text('about_summary');
            $table->json('about_points')->nullable();
            $table->string('website_url')->nullable();
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('resume_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
