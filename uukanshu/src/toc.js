function execute(url) {

    if (url.indexOf("sj.uukanshu.com") !== -1) {
        var doc = Http.get(url).html();

        var el = doc.select("#chapterList a")
        var data = [];
        for (var i = 0; i < el.size(); i++) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://sj.uukanshu.com"
            })
        }

        return Response.success(data);
    } else {
        var doc = Http.get(url).html();

        var el = doc.select("#chapterList a")
        var data = [];
        for (var i = el.size() - 1; i >= 0; i--) {
            var e = el.get(i);
            data.push({
                name: e.select("a").text(),
                url: e.attr("href"),
                host: "https://www.uukanshu.com"
            })
        }

        return Response.success(data);
    }
}