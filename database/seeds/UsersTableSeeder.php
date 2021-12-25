<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $params = [
            [
                'name' => '管理者',
                'email' => 'admin@admin.com',
                'image' => 'no-profile.png',
                'password' => Hash::make('admin-password'),
                'email_verified_at' => new DateTime(),
                'remember_token' => Str::random(60),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ユーザー1',
                'email' => 'test1@test.com',
                'image' => 'no-profile.png',
                'password' => Hash::make('testpassword1'),
                'email_verified_at' => new DateTime(),
                'remember_token' => Str::random(60),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ユーザー2',
                'email' => 'test2@test.com',
                'image' => 'no-profile.png',
                'password' => Hash::make('testpassword2'),
                'email_verified_at' => new DateTime(),
                'remember_token' => Str::random(60),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ];
        
        DB::table('users')->insert($params);
    }
}