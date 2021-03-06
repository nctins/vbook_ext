function execute(url) {
    if (url.indexOf("sj.uukanshu.com") !== -1) {
        const info = Http.get(url).html().select(".book-info");
        var coverImg = info.select(".pic img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        return Response.success({
            name: info.select("h1.bookname").text(),
            cover: coverImg,
            author: info.select("dd").first().text().replace("作者：", ""),
            description: info.select(".desc").text(),
            detail: info.select("dd").html(),
            host: "https://sj.uukanshu.com"
        });
    } else {
        const doc = Http.get(url).html();
        var coverImg = doc.select(".bookImg img").first().attr("src");
        if (coverImg.startsWith("//")) {
            coverImg = "https:" + coverImg;
        }
        return Response.success({
            name: doc.select(".jieshao_content h1").text().replace("最新章节", ""),
            cover: coverImg,
            author: doc.select(".jieshao_content h2 a").first().text(),
            description: doc.select(".jieshao_content h3").text(),
            detail: doc.select(".jieshao_content h2 a").html(),
            host: "https://www.uukanshu.com"
        });
    }
}