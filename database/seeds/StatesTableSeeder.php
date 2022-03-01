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
            ['name' => 'アジア'],
            ['name' => 'ヨーロッパ'],
            ['name' => 'アフリカ'],
            ['name' => '北アメリカ'],
            ['name' => '南アメリカ'],
            ['name' => 'オセアニア']
        ];
        
        $now = Carbon::now();
        foreach($params as $param) {
            $param['created_at'] = $now;
            $param['updated_at'] = $now;
        }
        DB::table('states')->insert($params);
    }
}