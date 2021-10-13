<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class HeritagesTableSeeder extends Seeder
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
                'country_id' => '1',
                'name' => '富士山',
                'entrance_fee' => '1000'
            ],
            [
                'country_id' => '2',
                'name' => '万里の長城',
                'entrance_fee' => '40'
            ],
            [
                'country_id' => '3',
                'name' => '海印寺蔵経板殿',
                'entrance_fee' => '3000'
            ],
            [
                'country_id' => '4',
                'name' => 'ストーンヘンジ',
                'entrance_fee' => '19'
            ],
            [
                'country_id' => '5',
                'name' => 'ローマ歴史地区、教皇領とサン・パオロ・フオーリ・レ・ムーラ大聖堂',
                'entrance_fee' => '0'
            ],
            [
                'country_id' => '6',
                'name' => 'モン・サン・ミシェル',
                'entrance_fee' => '10'
            ],
            [
                'country_id' => '7',
                'name' => 'メンフィスとその墓地遺跡-ギーザからダハシュールまでのピラミッド地帯',
                'entrance_fee' => '160'
            ],
            [
                'country_id' => '8',
                'name' => 'バーバートン・マコンジュワ山脈',
                'entrance_fee' => '0'
            ],
            [
                'country_id' => '9',
                'name' => '自由の女神像',
                'entrance_fee' => '18'
            ],
            [
                'country_id' => '10',
                'name' => 'カナディアン・ロッキー山脈自然公園群',
                'entrance_fee' => '10'
            ],
            [
                'country_id' => '11',
                'name' => '古代都市チチェン・イッツァ',
                'entrance_fee' => '232'
            ],
            [
                'country_id' => '12',
                'name' => 'リオデジャネイロ',
                'entrance_fee' => '0'
            ],
            [
                'country_id' => '13',
                'name' => 'ロス・グラシアレス',
                'entrance_fee' => '50'
            ],
            [
                'country_id' => '14',
                'name' => 'マチュピチュ',
                'entrance_fee' => '152'
            ],
            [
                'country_id' => '15',
                'name' => 'シドニー・オペラ・ハウス群',
                'entrance_fee' => '24'
            ],
            [
                'country_id' => '16',
                'name' => 'マウントクック',
                'entrance_fee' => '0'
            ],
        ];
        
        $now = Carbon::now();
        foreach($params as $param) {
            $param['created_at'] = $now;
            $param['updated_at'] = $now;
        }
        DB::table('heritages')->insert($params);
    }
}