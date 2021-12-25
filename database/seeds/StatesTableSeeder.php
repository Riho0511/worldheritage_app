<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class StatesTableSeeder extends Seeder
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
                'name' => 'アジア',
                'created_at' => new DateTime(),
            ],
            [
                'name' => 'ヨーロッパ',
                'created_at' => new DateTime(),
            ],
            [
                'name' => 'アフリカ',
                'created_at' => new DateTime(),
            ],
            [
                'name' => '北アメリカ',
                'created_at' => new DateTime(),
            ],
            [
                'name' => '南アメリカ',
                'created_at' => new DateTime(),
            ],
            [
                'name' => 'オセアニア',
                'created_at' => new DateTime(),
            ]
        ];
        
        DB::table('states')->insert($params);
    }
}