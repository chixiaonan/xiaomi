var swiper = (function () {
    // 私有变量, 不提供给外部使用
    var obj,
    $bannerBox,
    $tipBox,
    $tipAll,
    $prevBtn,
    $nextBtn,
    imgWidth,
    index = 0;
    return {
        init(ele) {
            // 相当于给一个对象添加了一个属性
            obj = document.querySelector(ele);
            //获取qf-banner的宽度
            imgWidth = obj.clientWidth;
            // 获取上一页按钮
            $prevBtn = obj.querySelector('.left-btn');
            // 获取下一页按钮
            $nextBtn = obj.querySelector('.right-btn');
            //获取存放图片的ul
            $bannerBox = obj.firstElementChild;
            //获取存放圆点的ul
            $tipBox = $bannerBox.nextElementSibling;
            //获取所有的圆点li
            $tipAll = $tipBox.children;
            // 给所有小圆点添加index
            for(var i = 0; i < $tipAll.length; i++) {
                $tipAll[i].index = i;
            }
            // [...$tipAll].forEach((item, index) => {
            //     item.index = index;
            // })错误的写法,对象没有这个方法
            //获取ul的第一张图片
            var $firstImg = $bannerBox.firstElementChild;
            //获取ul的最后一张图片
            var $lastImg = $bannerBox.lastElementChild;
            //把克隆的第一张图片添加到ul的最后
            $bannerBox.appendChild($firstImg.cloneNode(true));
            //在第一张图片前添加克隆的最后一张图片
            $bannerBox.insertBefore($lastImg.cloneNode(true), $firstImg);
            //ul默认位置设为第一张那里
            $bannerBox.style.left = -imgWidth + 'px';

            this.event()
        },
        event() {
            const self = this;
            $tipBox.addEventListener('click', function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName === 'LI') {
                    index = target.index;
                    self.showImage();
                }
            }, false)
            $prevBtn.onclick = function() {
                index--;
                self.showImage()
            }
            $nextBtn.onclick = function() {
                index++;
                self.showImage()
            }
            // console.log(obj);
        },
        showImage() {
            console.log(index)
            // 展示对应的图片
            // 对应的小圆点
            if(index < 0) {
                $bannerBox.style.left = -($tipAll.length + 1) * imgWidth + 'px';
                // 展示最后一张
                index = $tipAll.length - 1;
            }else if(index > $tipAll.length - 1) {
                $bannerBox.style.left = 0;
                index = 0;
            }
            for(var i = 0; i < $tipAll.length; i++) {
                $tipAll[i].classList.remove('active');
                // $tipAll[i].className.replace('active', '');
            }
            $tipAll[index].classList.add('active');
            move($bannerBox, {left: -(index + 1) * imgWidth}, 500)
        }
    }
}())
