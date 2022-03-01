<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $params = [
            ['unit' => '円'],
            ['unit' => '元'],
            ['unit' => 'ウォン'],
            ['unit' => 'イギリスポンド'],
            ['unit' => 'ユーロ'],
            ['unit' => 'エジプトポンド'],
            ['unit' => 'ランド'],
            ['unit' => 'アメリカ合衆国ドル'],
            ['unit' => 'カナダドル'],
            ['unit' => 'メキシコ・ペソ'],
            ['unit' => 'レアル'],
            ['unit' => 'アルゼンチン・ペソ'],
            ['unit' => 'ソル'],
            ['unit' => 'オーストラリア・ドル'],
            ['unit' => 'ニュージーランド・ドル'],
        ];
        
        $now = Carbon::now();
        foreach($params as $param) {
            $param['created_at'] = $now;
            $param['updated_at'] = $now;
        }
        DB::table('currencies')->insert($params);
    }
}