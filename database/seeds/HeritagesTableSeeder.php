<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class HeritagesTableSeeder extends Seeder
{
    public function run()
    {
        $params = [
            [
                'country_id' => '1',
                'name' => '富士山',
                'entrance_fee' => '1000',
                'latitude' => '35.363279797374936',
                'longitude' => '138.72804946859893',
                'zoom' => '9',
            ],
            [
                'country_id' => '2',
                'name' => '万里の長城',
                'entrance_fee' => '40',
                'latitude' => '43.28346527318409',
                'longitude' => '116.90210355298785',
                'zoom' => '5',
            ],
            [
                'country_id' => '3',
                'name' => '海印寺蔵経板殿',
                'entrance_fee' => '3000',
                'latitude' => '35.80118291341101',
                'longitude' => '128.09796385397345',
                'zoom' => '7',
            ],
            [
                'country_id' => '4',
                'name' => 'ストーンヘンジ',
                'entrance_fee' => '19',
                'latitude' => '51.29228702635848',
                'longitude' => '-1.803083659259062',
                'zoom' => '8',
            ],
            [
                'country_id' => '5',
                'name' => 'コロッセオ',
                'entrance_fee' => '0',
                'latitude' => '41.89078491609024',
                'longitude' => '12.49235961228732',
                'zoom' => '16',
            ],
            [
                'country_id' => '6',
                'name' => 'モン・サン・ミシェル',
                'entrance_fee' => '10',
                'latitude' => '48.63627431881761',
                'longitude' => '-1.5111270003378923',
                'zoom' => '10',
            ],
            [
                'country_id' => '7',
                'name' => 'メンフィスとその墓地遺跡',
                'entrance_fee' => '160',
                'latitude' => '29.977742000914393',
                'longitude' => '31.132838784433815',
                'zoom' => '13',
            ],
            [
                'country_id' => '8',
                'name' => 'バーバートン・マコンジュワ山脈',
                'entrance_fee' => '0',
                'latitude' => '-25.67180072775998',
                'longitude' => '31.033600181074934',
                'zoom' => '7',
            ],
            [
                'country_id' => '9',
                'name' => '自由の女神像',
                'entrance_fee' => '18',
                'latitude' => '40.690084422638774',
                'longitude' => '-109.82374501097891',
                'zoom' => '8',
            ],
            [
                'country_id' => '10',
                'name' => 'カナディアン・ロッキー山脈自然公園群',
                'entrance_fee' => '10',
                'latitude' => '44.332838427168866',
                'longitude' => '-109.82374501097891',
                'zoom' => '8',
            ],
            [
                'country_id' => '11',
                'name' => '古代都市チチェン・イッツァ',
                'entrance_fee' => '232',
                'latitude' => '20.68496721156885',
                'longitude' => '-88.56769681005183',
                'zoom' => '8',
            ],
            [
                'country_id' => '12',
                'name' => 'リオデジャネイロ',
                'entrance_fee' => '0',
                'latitude' => '-22.91140914500244',
                'longitude' => '-43.29891220644576',
                'zoom' => '10',
            ],
            [
                'country_id' => '13',
                'name' => 'ロス・グラシアレス',
                'entrance_fee' => '50',
                'latitude' => '-50.32973340436649',
                'longitude' => '-73.23395214737174',
                'zoom' => '6',
            ],
            [
                'country_id' => '14',
                'name' => 'マチュピチュ',
                'entrance_fee' => '152',
                'latitude' => '-13.16263959785432',
                'longitude' => '-72.54474836328616',
                'zoom' => '8',
            ],
            [
                'country_id' => '15',
                'name' => 'シドニー・オペラ・ハウス群',
                'entrance_fee' => '24',
                'latitude' => '-33.856071321389045',
                'longitude' => '151.21538249783328',
                'zoom' => '12',
            ],
            [
                'country_id' => '16',
                'name' => 'マウントクック',
                'entrance_fee' => '0',
                'latitude' => '34.59513010818025',
                'longitude' => '103.43430998609807',
                'zoom' => '8',
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