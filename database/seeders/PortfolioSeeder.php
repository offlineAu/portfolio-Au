<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\FocusItem;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $profile = Profile::query()->updateOrCreate(
            ['username' => 'Au'],
            [
                'page_title' => 'Portfolio',
                'name' => 'Airl Joriz R. Janoplo',
                'username' => 'Au',
                'title' => 'Web Developer',
                'location' => 'Bukidnon, Philippines',
                'email' => 'janoplo.airljoriz@gmail.com',
                'availability' => 'Open to internships and junior full-stack roles',
                'bio' => 'I am an aspiring Web Developer focused on building practical, responsive, and user-friendly web applications. I am eager to learn more about this industry and I am willing to learn in a work environment.',
                'about_heading' => 'Hi, I am Airl',
                'about_summary' => 'Web Developer focused on building functional subsystems, dashboards, and automation tools.',
                'about_points' => [
                    'Currently exploring Laravel and MVC-based system architecture.',
                    'Experienced in developing real workflow dashboards and data-driven interfaces.',
                    'Comfortable building full-stack student and internship projects from scratch.',
                ],
                'github_url' => 'https://github.com',
                'linkedin_url' => 'https://linkedin.com',
                'avatar_url' => null,
                'cover_photo_url' => null,
            ]
        );

        Skill::query()->where('profile_id', $profile->id)->delete();
        foreach ([
            ['name' => 'Python', 'category' => 'Backend'],
            ['name' => 'HTML', 'category' => 'Frontend'],
            ['name' => 'CSS', 'category' => 'Frontend'],
            ['name' => 'JavaScript', 'category' => 'Frontend'],
            ['name' => 'Google Apps Script', 'category' => 'Automation'],
            ['name' => 'Google Cloud Platform', 'category' => 'Cloud'],
            ['name' => 'PHP', 'category' => 'Backend'],
            ['name' => 'Laravel', 'category' => 'Backend'],
            ['name' => 'MySQL', 'category' => 'Database'],
            ['name' => 'PostgreSQL', 'category' => 'Database'],
            ['name' => 'Hugging Face', 'category' => 'AI'],
            ['name' => 'React', 'category' => 'Frontend'],
            ['name' => 'TypeScript', 'category' => 'Frontend'],
            ['name' => 'Node.js', 'category' => 'Backend'],
        ] as $index => $skill) {
            Skill::query()->create([
                'profile_id' => $profile->id,
                'name' => $skill['name'],
                'category' => $skill['category'],
                'sort_order' => $index + 1,
            ]);
        }

        Project::query()->where('profile_id', $profile->id)->delete();
        foreach ([
            [
                'name' => 'Sentisphere',
                'description' => 'A Web System and Mobile Application for Student Emotional Tracking Through NLP-Powered Sentiment Analysis.',
                'primary_language' => 'Laravel',
                'tech_stack' => ['Laravel', 'React', 'Python', 'Hugging Face', 'Expo Go', 'MySQL'],
                'stars_count' => 6,
                'forks_count' => 2,
            ],
            [
                'name' => 'Syntax.sip',
                'description' => 'A mobile application for coffee shop customers to order and pay for their drinks.',
                'primary_language' => 'React Native',
                'tech_stack' => ['React Native', 'Expo Go', 'PostgreSQL'],
                'stars_count' => 4,
                'forks_count' => 1,
            ],
            [
                'name' => 'Government Subsystems',
                'description' => 'Using Google Apps Script and Google Cloud Platform for automation and data processing.',
                'primary_language' => 'JavaScript',
                'tech_stack' => ['Google Apps Script', 'Google Cloud Platform', 'HTML', 'CSS', 'JavaScript'],
                'stars_count' => 8,
                'forks_count' => 3,
            ],
        ] as $index => $project) {
            Project::query()->create([
                'profile_id' => $profile->id,
                'name' => $project['name'],
                'description' => $project['description'],
                'primary_language' => $project['primary_language'],
                'tech_stack' => $project['tech_stack'],
                'stars_count' => $project['stars_count'],
                'forks_count' => $project['forks_count'],
                'sort_order' => $index + 1,
                'is_featured' => true,
            ]);
        }

        Experience::query()->where('profile_id', $profile->id)->delete();
        foreach ([
            [
                'role' => 'Student Full Stack Web Developer',
                'organization' => 'University of Science and Technology of Southern Philippines',
                'period' => '2025 - 2026',
                'details' => 'Developed a school project called Sentisphere, a web system and mobile application for student emotional tracking through NLP-powered sentiment analysis. The main purpose of the web system is to display the data collected from the mobile application.',
            ],
            [
                'role' => 'Intern Web Developer',
                'organization' => 'Commission on Higher Education (Region X)',
                'period' => '2026 - Present',
                'details' => 'Developed web application subsystems and maintained existing systems for CHED.',
            ],
            [
                'role' => 'Quality Assurance Specialist',
                'organization' => "CK Children's Publishing",
                'period' => 'June 2024',
                'details' => 'Performed functional and non-functional quality assurance testing on mobile applications and websites.',
            ],
        ] as $index => $experience) {
            Experience::query()->create([
                'profile_id' => $profile->id,
                'role' => $experience['role'],
                'organization' => $experience['organization'],
                'period' => $experience['period'],
                'details' => $experience['details'],
                'sort_order' => $index + 1,
            ]);
        }

        FocusItem::query()->where('profile_id', $profile->id)->delete();
        foreach ([
            'Learning more about web development and improving my skills in manual coding.',
            'Exploring new technologies and frameworks to enhance my development capabilities.',
            'Building my portfolio manually to strengthen my understanding of architecture and UI implementation.',
            'Helping CHED Region 10 in developing subsystems using Google Apps Script.',
        ] as $index => $focusItem) {
            FocusItem::query()->create([
                'profile_id' => $profile->id,
                'content' => $focusItem,
                'sort_order' => $index + 1,
            ]);
        }
    }
}
