// ルーティング
require('./Router');
require('./index');


// ページ
// 共通
// ログイン画面
require('./Login/Login');

// ホームページ
require('./Home/Home');
require('./Home/State');

// 国ページ
require('./Country/Country');

// 世界遺産ページ
require('./Heritage/Heritage');
require('./Heritage/CommentList');

// マイページ
require('./Mypage/Mypage');
require('./Mypage/MypageEdit');

// ランキングページ
require('./Ranking/Ranking');

// 管理者
// 通貨編集ページ
require('./Admin/Currency/CurrenciesEdit');

// 入力フォームページ
require('./Admin/Form/CreateInfo');


// コンポーネント
// 共通ページ用
require('./Common_components/alertInfo');

require('./Common_components/checkModal');
require('./Common_components/comments');
require('./Common_components/likeandcollect');
require('./Common_components/noRegisterInformation');
require('./Common_components/operations');
require('./Common_components/sideMenu');
require('./Common_components/upBar');

// 国ページ用
require('./Country/countryInformation');
require('./Country/heritageCard');

// 世界遺産ページ用
require('./Heritage/heritageInformation');
require('./Heritage/postImages');
require('./Heritage/postComment');
require('./Heritage/swiperImages');

// マイページ用
require('./Mypage/myCard');
require('./Mypage/mypageOperations');
require('./Mypage/selectedMypageItem');
require('./Mypage/showData');

// ランキングページ用
require('./Ranking/rankTable');

// 通貨編集ページ用
require('./Admin/Currency/currenciesList');

// 入力フォームページ用
require('./Admin/Form/countryForm');
require('./Admin/Form/deleteImagesList');
require('./Admin/Form/heritageForm');


// 将来的に消すページ
require('./delete/CountryCreate');
require('./delete/CountryEdit');
require('./delete/HeritageCreate');
require('./delete/HeritageEdit');
