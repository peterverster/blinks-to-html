function downloadBook() {

    let template = '<html><head><linkrel="preconnect"href="https://fonts.googleapis.com"><linkrel="preconnect"href="https://fonts.gstatic.com"crossorigin><linkhref="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"rel="stylesheet"><style>body{max-width:600px;margin:auto;}h1{font-size:1.25em;}h2{font-size:1.125em;}h3{font-size:1.05em;}h4,h5,h6{font-size:1em;margin:1em0;}figure{margin:0;}.page.rtl{direction:rtl;}article{text-rendering:optimizeLegibility;}articlepre{white-space:pre-wrap;}article*{/*Scaledownanythinglargerthanourview.Max-widthmaintainsaspectratiosonimages.*/max-width:600px;}articleimg{/*Bydefault,imagesarecenteredontheirownline.*/margin:0.5emauto;display:block;height:auto;}articleimg.reader-image-tiny{display:inline;margin:0;}article.leading-image,figure,.auxiliary{margin-bottom:.25em;}article.leading-imageimg{margin:auto;display:block;clear:both;}article.leading-image.credit{margin:0;text-align:right;}article.leading-image.caption,article.leading-image.credit,articlefigcaption,article.auxiliaryfigcaption{font-size:0.75em;line-height:1.5em;margin-top:1em;width:100%;}article.leading-image.credit+.caption{margin-top:0.1em;}article.auxiliary{display:block;clear:both;font-size:0.75em;line-height:1.4em;text-align:start;}article.auxiliary>*{-webkit-margin-start:0;}article.auxiliaryimg,article.auxiliary>*:first-child{margin:0;}/*Iftheelementimmediatelyafteranimageisinline,itmightbumpupagainsttheimage.*/article.auxiliaryimg+*{display:block;}article.auxiliaryfigcaption{font-size:100%;}article.auxiliary*{margin-top:0.5em;margin-bottom:0.5em;}article.float.left{float:left;margin-right:20px;}article.float.right{float:right;margin-left:20px;}article.clear{clear:both;}articleul.list-style-type-none,articleol.list-style-type-none,article.list-style-type-none>li{list-style-type:none;-webkit-padding-start:0;}/*Collapseexcesswhitespace.*/.pagep>p:empty,.pagediv>p:empty,.pagep>div:empty,.pagediv>div:empty,.pagep+br,.pagep>br:only-child,.pagediv>br:only-child,.pageimg+br{display:none;}.title{display:none;}.page:first-of-type.title{display:block;}.pagetable{font-size:0.9em;text-align:start;word-wrap:break-word;border-collapse:collapse;}.pagetabletd,.pagetableth{padding:0.25em0.5em;border:1pxsolidrgba(0,0,0,0.1);}.pagetableth{background-color:rgba(0,0,0,0.025);}.pagea{text-decoration:none;}</style></head><body>{{article}}</body></html>'

    let slug = document.querySelector("body > div.page > main > div.reader__container").getAttribute("data-book-slug");

    function download(text, name, type) {
        let a = document.createElement("a");
        let file = new Blob([text], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    const data = document.querySelector("body > div.page > main > div.reader__container > div.reader__container__right > article").outerHTML;


    let final = template.replace("{{article}}", data)
    download(final, slug + '.html', 'text/plain');

    // Default export is a4 paper, portrait, using millimeters for units

    // window.jsPDF = window.jspdf.jsPDF;
    // const doc = new window.jsPDF();
    //
    // doc.html(data, {
    //     callback: function (doc) {
    //         doc.save(slug + ".pdf");
    //     },
    //     x: 10,
    //     y: 10
    // });

    // let worker = html2pdf().from(final).save(slug + ".pdf");

}


chrome.action.onClicked.addListener((tab) => {

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: downloadBook
    });


});


