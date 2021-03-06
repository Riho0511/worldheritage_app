<?php

use Illuminate\Database\Seeder;

class CountriesTableSeeder extends Seeder
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
                'name' => '日本',
                'official_name' => '日本国',
                'capital' => '東京',
                'time_difference' => '0',
                'plane_movement' => '0',
                'state_id' => '1',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => '中国',
                'official_name' => '中華人民共和国',
                'capital' => '北京',
                'time_difference' => '1',
                'plane_movement' => '4',
                'state_id' => '1',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => '韓国',
                'official_name' => '大韓民国',
                'capital' => 'ソウル',
                'time_difference' => '0',
                'plane_movement' => '2',
                'state_id' => '1',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'イギリス',
                'official_name' => 'グレートブリテン及び北アイルランド連合王国',
                'capital' => 'ロンドン',
                'time_difference' => '8',
                'plane_movement' => '12',
                'state_id' => '2',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'イタリア',
                'official_name' => 'イタリア共和国',
                'capital' => 'ローマ',
                'time_difference' => '7',
                'plane_movement' => '13',
                'state_id' => '2',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'フランス',
                'official_name' => 'フランス共和国',
                'capital' => 'パリ',
                'time_difference' => '8',
                'plane_movement' => '12',
                'state_id' => '2',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'エジプト',
                'official_name' => 'エジプト・アラブ共和国',
                'capital' => 'カイロ',
                'time_difference' => '7',
                'plane_movement' => '14',
                'state_id' => '3',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => '南アフリカ',
                'official_name' => '南アフリカ共和国',
                'capital' => 'プレトリア',
                'time_difference' => '7',
                'plane_movement' => '14',
                'state_id' => '3',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'アメリカ',
                'official_name' => 'アメリカ合衆国',
                'capital' => 'ワシントンD.C.',
                'time_difference' => '13',
                'plane_movement' => '14',
                'state_id' => '4',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'カナダ',
                'official_name' => 'カナダ',
                'capital' => 'オタワ',
                'time_difference' => '13',
                'plane_movement' => '12',
                'state_id' => '4',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'メキシコ',
                'official_name' => 'メキシコ合衆国',
                'capital' => 'メキシコシティ',
                'time_difference' => '14',
                'plane_movement' => '15',
                'state_id' => '4',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ブラジル',
                'official_name' => 'ブラジル連邦共和国',
                'capital' => 'ブラジリア',
                'time_difference' => '12',
                'plane_movement' => '25',
                'state_id' => '5',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'アルゼンチン',
                'official_name' => 'アルゼンチン共和国',
                'capital' => 'ブエノスアイレス',
                'time_difference' => '12',
                'plane_movement' => '24',
                'state_id' => '5',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ペルー',
                'official_name' => 'ペルー共和国',
                'capital' => 'リマ',
                'time_difference' => '14',
                'plane_movement' => '20',
                'state_id' => '5',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'オーストラリア',
                'official_name' => 'オーストラリア連邦',
                'capital' => 'キャンベラ',
                'time_difference' => '1',
                'plane_movement' => '10',
                'state_id' => '6',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'name' => 'ニュージーランド',
                'official_name' => 'ニュージーランド',
                'capital' => 'ウェリントン',
                'time_difference' => '3',
                'plane_movement' => '11',
                'state_id' => '6',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ];
        
        DB::table('countries')->insert($params);
    }
}