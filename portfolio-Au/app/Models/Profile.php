<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'page_title',
    'name',
    'username',
    'title',
    'location',
    'email',
    'availability',
    'bio',
    'about_heading',
    'about_summary',
    'about_points',
    'website_url',
    'github_url',
    'linkedin_url',
    'resume_url',
    'avatar_url',
    'cover_photo_url',
    'github_avatar_url',
    'facebook_avatar_url',
    'facebook_cover_photo_url',

])]
class Profile extends Model
{
    /**
     * Get the profile skills.
     *
     * @return HasMany<Skill, $this>
     */
    public function skills(): HasMany
    {
        return $this->hasMany(Skill::class)->orderBy('sort_order');
    }

    /**
     * Get the profile projects.
     *
     * @return HasMany<Project, $this>
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class)->orderBy('sort_order');
    }

    /**
     * Get the profile experiences.
     *
     * @return HasMany<Experience, $this>
     */
    public function experiences(): HasMany
    {
        return $this->hasMany(Experience::class)->orderBy('sort_order');
    }

    /**
     * Get the profile focus items.
     *
     * @return HasMany<FocusItem, $this>
     */
    public function focusItems(): HasMany
    {
        return $this->hasMany(FocusItem::class)->orderBy('sort_order');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'about_points' => 'array',
        ];
    }
}
