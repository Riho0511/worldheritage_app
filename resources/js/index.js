// 表示画面
// ログイン画面
export { default as Login } from './Login/Login';

// ホームページ
export { default as Home } from './Home/Home';
export { default as State } from './Home/State';

// 国ページ
export { default as Country } from './Country/Country';

// 世界遺産ページ
export { default as Heritage } from './Heritage/Heritage';
export { default as CommentList } from './Heritage/CommentList';

// マイページ
export { default as Mypage } from './Mypage/Mypage';
export { default as MypageEdit } from './Mypage/MypageEdit';

// ランキングページ
export { default as Ranking } from './Ranking/Ranking';

// 通貨編集ページ
export { default as CurrenciesEdit } from './Admin/Currency/CurrenciesEdit';

// 入力フォームページ
export { default as CreateInfo } from './Admin/Form/CreateInfo';


// コンポーネント
// 共通コンポーネント
export { default as AlertInfo } from './Common_components/alertInfo';
export { default as CheckModal } from './Common_components/checkModal';
export { default as Comments } from './Common_components/comments';
export { default as Likeandcollect } from './Common_components/likeandcollect';
export { default as NoRegisterInformation } from './Common_components/noRegisterInformation';
export { default as Operations } from './Common_components/operations';
export { default as SideMenu } from './Common_components/sideMenu';
export { default as UpBar } from './Common_components/upBar';

// 国ページコンポーネント
export { default as CountryInformation } from './Country/countryInformation';
export { default as HeritageCard } from './Country/heritageCard';

// 世界遺産ページコンポーネント
export { default as HeritageInformation } from './Heritage/heritageInformation';
export { default as PostImages } from './Heritage/postImages';
export { default as PostComment } from './Heritage/postComment';
export { default as SwiperImages } from './Heritage/swiperImages';

// マイページコンポーネント
export { default as MyCard } from './Mypage/myCard';
export { default as MypageOperations } from './Mypage/mypageOperations';
export { default as SelectedMypageItem } from './Mypage/selectedMypageItem';
export { default as ShowData } from './Mypage/showData';

// ランキングコンポーネント
export { default as RankTable } from './Ranking/rankTable';

// 通貨編集ページコンポーネント
export { default as CurrenciesList } from './Admin/Currency/currenciesList';

// 入力フォームページコンポーネント
export { default as CountryForm } from './Admin/Form/countryForm';
export { default as DeleteImagesList } from './Admin/Form/deleteImagesList';
export { default as HeritageForm } from './Admin/Form/heritageForm';




// 将来的に消すページ
export { default as CountryCreate } from './delete/CountryCreate';
export { default as CountryEdit } from './delete/CountryEdit';
export { default as HeritageCreate } from './delete/HeritageCreate';
export { default as HeritageEdit } from './delete/HeritageEdit';

