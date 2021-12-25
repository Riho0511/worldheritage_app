<?php

use Illuminate\Database\Seeder;

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
            [
                'unit' => '円',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => '元',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'ウォン',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'イギリスポンド',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'ユーロ',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'エジプトポンド',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'ランド',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'アメリカ合衆国ドル',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'カナダドル',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'メキシコ・ペソ',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'レアル',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'アルゼンチン・ペソ',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'ソル',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'オーストラリア・ドル',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'unit' => 'ニュージーランド・ドル',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
        ];
        
        DB::table('currencies')->insert($params);
    }
}