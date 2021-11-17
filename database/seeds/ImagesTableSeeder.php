<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ImagesTableSeeder extends Seeder
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
                'heritage_id' => '1',
                'image' => '%E5%AF%8C%E5%A3%AB%E5%B1%B1.jpeg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '2',
                'image' => '%E4%B8%87%E9%87%8C%E3%81%AE%E9%95%B7%E5%9F%8E.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '3',
                'image' => '%E6%B5%B7%E5%8D%B0%E5%AF%BA%E8%94%B5%E7%B5%8C%E6%9D%BF%E6%AE%BF.jpeg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '4',
                'image' => '%E3%82%B9%E3%83%88%E3%83%BC%E3%83%B3%E3%83%98%E3%83%B3%E3%82%B7%E3%82%99.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '5',
                'image' => '%E3%82%B3%E3%83%AD%E3%83%83%E3%82%BB%E3%82%AA.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '6',
                'image' => '%E3%83%A2%E3%83%B3%E3%83%BB%E3%82%B5%E3%83%B3%E3%83%BB%E3%83%9F%E3%82%B7%E3%82%A7%E3%83%AB.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '7',
                'image' => '%E3%83%94%E3%83%A9%E3%83%9F%E3%83%83%E3%83%89.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '8',
                'image' => '%E3%83%8F%E3%82%99%E3%83%BC%E3%83%8F%E3%82%99%E3%83%BC%E3%83%88%E3%83%B3%E3%83%BB%E3%83%9E%E3%82%B3%E3%83%B3%E3%82%B7%E3%82%99%E3%83%A5%E3%83%AF%E5%B1%B1%E8%84%88.jpeg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '9',
                'image' => '%E8%87%AA%E7%94%B1%E3%81%AE%E5%A5%B3%E7%A5%9E.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '10',
                'image' => '%E3%83%AD%E3%83%83%E3%82%AD%E3%83%BC%E5%B1%B1%E8%84%88.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '11',
                'image' => '%E3%83%9E%E3%83%A4%E6%96%87%E6%98%8E.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '12',
                'image' => '%E3%83%AA%E3%82%AA%E3%83%87%E3%82%B8%E3%83%A3%E3%83%8D%E3%82%A4%E3%83%AD.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '13',
                'image' => '%E3%83%AD%E3%82%B9%E3%83%BB%E3%82%B0%E3%83%A9%E3%82%B7%E3%82%A2%E3%83%AC%E3%82%B9.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '14',
                'image' => '%E3%83%9E%E3%83%81%E3%83%A5%E3%83%94%E3%83%81%E3%83%A5.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '15',
                'image' => '%E3%82%AA%E3%83%9A%E3%83%A9%E3%83%8F%E3%82%A6%E3%82%B9.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '16',
                'image' => '%E3%83%9E%E3%82%A6%E3%83%B3%E3%83%88%E3%82%AF%E3%83%83%E3%82%AF.jpg',
                'user_id' => '1'
            ],
            
        ];
        
        $now = Carbon::now();
        foreach($params as $param) {
            $param['created_at'] = $now;
            $param['updated_at'] = $now;
        }
        DB::table('images')->insert($params);
    }
}