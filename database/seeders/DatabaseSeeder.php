<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            VoyagerDatabaseSeeder::class,
        ]);
        User::factory()->create([
            'name' => 'dev',
            'email' => 'dev@dev.com',
            'password' => 'dev',
            'role_id' => 1,
        ]);
       
    }
}
