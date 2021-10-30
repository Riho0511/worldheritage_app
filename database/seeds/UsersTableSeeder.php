<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        
        $params = [
            [
                'name' => 'ゲスト',
                'email' => 'guest@guest.com',
                // 'image' => 'no-profile.png',
                'password' => Hash::make('password'),
                'remember_token' => Str::random(60),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'テスト',
                'email' => 'test@test.com',
                // 'image' => 'no-profile.png',
                'password' => Hash::make('password'),
                'remember_token' => Str::random(60),
                'created_at' => $now,
                'updated_at' => $now
            ],
        ];
        
        DB::table('users')->insert($params);
    }
}