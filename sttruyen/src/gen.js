function execute(url, page) {
    if (!page) page = '1';
    const doc = Http.get('https://sttruyen.com/search').params({status : url,fee : 3, page : page}).html();
    var next = doc.select('.pagination').select('li.active + li').text();
    const el = doc.select(".list-group-item")
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var img = e.select(".view img").first().attr("src");
        if (img.startsWith("//")){
            img = img.replace('//','https://')
        }
        data.push({
            name: e.select("h5").first().text(),
            link: e.select("a").first().attr("href"),
            cover: img,
            description: e.select("a[href~=tacgia]").text(),
            host: "https://sttruyen.com"
        })
    }
    return Response.success(data, next)
}