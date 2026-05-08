<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleUserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name'     => 'Guest User',
                'email'    => 'guest@portfolio.test',
                'password' => Hash::make('password'),
                'role'     => 'guest',
            ],
            [
                'name'     => 'Recruiter User',
                'email'    => 'recruiter@portfolio.test',
                'password' => Hash::make('password'),
                'role'     => 'recruiter',
            ],
            [
                'name'     => 'Developer User',
                'email'    => 'dev@portfolio.test',
                'password' => Hash::make('password'),
                'role'     => 'developer',
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                $userData,
            );
        }
    }
}