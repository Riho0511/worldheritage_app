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
                'name' => '管理者',
                'email' => 'admin@admin.com',
                // 'image' => 'no-profile.png',
                'password' => Hash::make('admin-password'),
                'remember_token' => Str::random(60),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'ユーザー1',
                'email' => 'test1@test.com',
                // 'image' => 'no-profile.png',
                'password' => Hash::make('testpassword1'),
                'remember_token' => Str::random(60),
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name' => 'ユーザー2',
                'email' => 'test2@test.com',
                // 'image' => 'no-profile.png',
                'password' => Hash::make('testpassword2'),
                'remember_token' => Str::random(60),
                'created_at' => $now,
                'updated_at' => $now
            ],
        ];
        
        DB::table('users')->insert($params);
    }
}