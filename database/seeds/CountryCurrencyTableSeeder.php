<?php

use Illuminate\Database\Seeder;

class CountryCurrencyTableSeeder extends Seeder
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
                'currency_id' => '1',
            ],
            [
                'country_id' => '2',
                'currency_id' => '2',
            ],
            [
                'country_id' => '3',
                'currency_id' => '3',
            ],
            [
                'country_id' => '4',
                'currency_id' => '4',
            ],
            [
                'country_id' => '5',
                'currency_id' => '5',
            ],
            [
                'country_id' => '6',
                'currency_id' => '5',
            ],
            [
                'country_id' => '7',
                'currency_id' => '6',
            ],
            [
                'country_id' => '8',
                'currency_id' => '7',
            ],
            [
                'country_id' => '9',
                'currency_id' => '8',
            ],
            [
                'country_id' => '10',
                'currency_id' => '9',
            ],
            [
                'country_id' => '11',
                'currency_id' => '10',
            ],
            [
                'country_id' => '12',
                'currency_id' => '11',
            ],
            [
                'country_id' => '13',
                'currency_id' => '12',
            ],
            [
                'country_id' => '14',
                'currency_id' => '13',
            ],
            [
                'country_id' => '15',
                'currency_id' => '14',
            ],
            [
                'country_id' => '16',
                'currency_id' => '15',
            ],
            
        ];
        
        DB::table('country_currency')->insert($params);
    }
}