const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
let hashMap =xObject|| [
    { logo: 'A', url: 'http://www.acfun.cn' },
    { logo: 'B',url: 'https://www.bilibili.com' }
]
const simplifyUrl=(url)=>{
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')
}
const render =()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                  
                        <div class="site">
                            <div class="logo">
                                ${node.logo[0]}
                            </div>
    
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class='close'>x</div>
                        </div>
                  
                    
                </li>`).insertBefore($lastLi)
                $li.on('click',()=>{
                    window.open(node.url)
                })
                $li.on('click','.close',(e)=>[
                    e.stopPropagation(),
                    hashMap.splice(index,1),
                    render()
                ])
    })
}

{/* <li>
                <a href="http://www.acfun.cn">
                    <div class="site">
                        <div class="logo">A</div>
                        <div class="link">acfun.cn</div>
                    </div>
                </a>
                
            </li>
            <li>
                <a href="https://www.bilibili.com/">
                    <div class="site">
                        <div class="logo">
                            <img src="./images/b.png" alt="">
                        </div>
                        <div class="link">bilibili.cn</div>
                    </div>
                </a>
                
            </li> */}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('請輸入網站')
        if (url.indexOf('http') != 0) {
            url = 'http://' + url
        }
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),
            url:url
        })
        render()


    })
    window.onbeforeunload=()=>{
        const string=JSON.stringify(hashMap)
        localStorage.setItem('x',string)
    }
    $(document).on('keypress',(e)=>{
        const {key}=e
        for(let i=0;i<=hashMap.length;i++){
            if(hashMap[i].logo.toLowerCase()===key){
                window.open(hashMap[i].url)
            }
        }
    })