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
                'image' => 'v5AlW7oL8SpzEQ93ySZhNzQx7unopUzIYY39FxAR.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '2',
                'image' => 'fbHiciN4TCzbTXydSsABN25in1KkwfyiS66nRgww.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '3',
                'image' => 'CMZXaENkeAxWBIXKWlvw6UIA0RCzt15ad5EesErm.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '4',
                'image' => 'uIb9B9yYsRzSvxWP7KD1rjyCznL1DS74HcO6yhL9.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '5',
                'image' => 'mG1VUjhf0NpVtQLmMTsoMahO2RfmYBcmXbyuRhCc.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '6',
                'image' => 'Q7el0HCLWLITzNQTj7VU5BbcK09RwoMxjGMgVFhE.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '7',
                'image' => 'usvGGZt4qQwNGRimfNC87TuDTdByC0PPrLA3UQSf.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '8',
                'image' => '3FhSl1xzIzKc9dzle8mOTbMXYXSnpDWog3Y7UGVp.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '9',
                'image' => 's7lnc7pGGoHKhtrAwdBehYZoWGTYmgimGqzb5u0u.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '10',
                'image' => 'LHwzy6rdlj7m26PucT6mVwer1QCUEHUsoYwBNRo1.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '11',
                'image' => 'AmdNGsGH4SwAJz8kkPOMrKDUuJzN4770qM7bo0fa.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '12',
                'image' => 'Ql9lkRUr4OshcxHP3SiOzO74758n869En8cIGmhQ.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '13',
                'image' => 'VyY7ztWxKJqTLP1B3KOBrzUhzzBLulgI4gjtWOR8.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '14',
                'image' => 'AgbgcWkZykuf1iJYatWaTHqY3IQWDcnVuVKFDWm6.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '15',
                'image' => 'kS2yCp97kChWRdsBd6jQ5pvZLz7N5DHG1aqtXyG6.jpg',
                'user_id' => '1'
            ],
            [
                'heritage_id' => '16',
                'image' => '9URSb9qlpSoyzwNRpuo15WpxZBOjrpiNNk09IgBb.jpg',
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