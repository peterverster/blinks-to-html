async function downloadBook() {
    var $coverImage = $(".book-cover__picture img");
    var bookId = $coverImage.attr('src')
        .replace('https://images.blinkist.io/images/books/', '')
        .split('/')[0];
    
    token = document.querySelector("meta[name=csrf-token]").getAttribute("content");

    var responseChapters = await fetch(`/api/books/${bookId}/chapters`, {
        method: 'GET',
        credentials: 'same-origin',
        token: true,
        headers: {
            'X-CSRF-TOKEN': token,
            'Accept' : 'application/json, */*',
            'X-Requested-With' : 'XMLHttpRequest'
        },
    });
        
    var bookHeader = await responseChapters.json();
    var content = `<h1>${bookHeader.book.title}</h1>`;
    content += `<p class="author">${bookHeader.book.author}</p>`;
    
    for (const chapter of bookHeader.chapters) {
        var chapterResponse = await fetch(`/api/books/${bookId}/chapters/${chapter.id}`, {
            method: 'GET',
            credentials: 'same-origin',
            token: true,
            headers: {
                'X-CSRF-TOKEN': token,
                'Accept' : 'application/json, */*',
                'X-Requested-With' : 'XMLHttpRequest'
            },
        });

        var chapterObj = await chapterResponse.json();
        content += `<h2>${chapterObj.action_title}</h2>`;
        content += chapterObj.text;
    }    
    
    let htmlContent = `<!DOCTYPE html><html><head><title>${bookHeader.book.title}</title><meta charset="UTF-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Hahmlet"><style>    body {        font-family: "Hahmlet", sans-serif;        color: #042330;        max-width: 700px;        margin: auto;        padding-left: 50px;        padding-right: 50px;    }    h1 {        text-align: center;    }        .author {        text-align: right; padding-bottom: 30px;   }</style></head><body>${content}</body></html>`;
    
    let $final = $($.parseHTML(htmlContent));
    $final.printThis({
        importCSS: false,
        importStyle: true
    });
}


chrome.action.onClicked.addListener((tab) => {

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: downloadBook
    });


});


