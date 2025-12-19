$('.slider').slick({
    arrows: false,//矢印を消す
    autoplay: true,//自動で動くようにする
    centerMode: true,//左右に、前後のスライドの一部が表示される
    centerPadding: '30%',//左右にどれくらいの前後のスライドを表示させるか
    pauseOnHover: false,//マウスが乗っていても動くようにする
    pauseOnFocus: false,//画像にフォーカスされていても動くようにする
    autoplaySpeed: 0,//スライドが止まっている時間
    speed: 10000,//スライドする時間
    cssEase: 'linear',//加速度
    responsive: [
        {
            breakpoint: 519,
            settings: {
                centerPadding: '16px'
            }
        }
    ]
});


/*=========================
下部の画像
=========================*/
/*
一定の高さ（.bg_placeholderの位置から、画面の高さを引いた）まで、スクロールしたら、
クラスbgにクラスonを付加

スクロールした量：scroll_height
.bg_placeholderの位置：bg_pos
画面の高さ：window_height

もしscroll_heightが、bg_posより大きかったら、
クラスbgにクラスonを付加
(そうじゃなかったら、)
クラスbgからクラスonをはずす
removeClass
*/

/*
$(window).on('scroll',()=>{
    //スクロールした量を把握
    const scroll_height = $(window).scrollTop();
    // console.log(scroll_height);
    
    //.bg_placeholderの上からの位置
    const bg_pos = $('.bg_placeholder').offset().top;

    //画面の高さ
    const window_height = $(window).height();
    // console.log(window_height);
    

    if(scroll_height > bg_pos - window_height - 100){
        $('.bg').addClass('on');
    }else{
        $('.bg').removeClass('on');
    }
});
*/

/*
画面上の変化を観察する機能
オブザーバー（観察者）
画面上にxxxが表示されたら、yyyyをやってください

observerの使い方

1）やってほしい内容（yyyy）を定義
const kansu = ()=>{
    処理内容
}

1.5）（必要であれば）パラメータを設定
const params = {};

2）observerをインスタンス化
const hensu = new IntersectionObserver(kansu,<params>);

3）観察対象を設定
const tg = document.querySelector('対象');
hensu.observe(tg);
*/

const bg_ob_func = (entries) => {
    const bg = document.querySelector('.bg');
    for (entry of entries) {
        if (entry.isIntersecting) {
            //.bgに.onを付加する
            bg.classList.add('on');
        } else {
            //.bgから.onを外す
            bg.classList.remove('on');
        }
    }
}

const bg_ob_param = {
    rootMargin: '100px'
};

const bg_ob = new IntersectionObserver(bg_ob_func, bg_ob_param);

bg_ob.observe(document.querySelector('.bg_placeholder'));



/*==================
各タイトル
===================*/
//オブザーバーに渡したい関数
const title_ob_func = (entries) => {
    for (entry of entries) {
        if (entry.isIntersecting) {
            entry.target.setAttribute('src', entry.target.dataset.src);
        }
    }
}

//パラメーターを作る
const title_ob_param = {
    rootMargin: '-100px'
}

//オブザーバーをインスタンス化
const title_ob = new IntersectionObserver(title_ob_func, title_ob_param);


//観察対象
const target_arr = document.querySelectorAll('.observer');
for (target of target_arr) {
    title_ob.observe(target);
}




