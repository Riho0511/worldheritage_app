<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Currency;

class CurrencyController extends Controller
{
    // 通貨一覧表示
    public function list(Currency $currency) {
        $currencies_list = $currency->get();
        return response()->json($currencies_list);
    }
    
    // 通貨削除
    public function delete(Request $request) {
        $delete_currencies = $request->data;
        
        foreach ($delete_currencies as $id) {
            $currency = new Currency;
            $del_currency = $currency->where('id', $id['id'])->first();
            
            // 該当する国削除
            $del_currency->countries()->detach();
        
            // 通貨削除
            $currency->where('id', $id['id'])->delete();
        }
        
        return response()->json('通貨の削除が完了しました！');
    }
}
