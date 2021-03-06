local key, page = ...
if text:is_empty(page) then
    page = 1
end
local doc = http:get("https://truyenyy.vip/tim-kiem/nang-cao/?q=" .. key .. "&page=" .. page):html()

if doc ~= nil then
    local el = doc:select(".books-list > li")
    local novelList = {}
    local next

    local last = doc:select(".pagination > li > a"):last()
    if last ~= nil then
        next = regexp:find(last:attr("href"), "page=(\\d+)")
    end
    for i = 1, el:size() do
        local e = el:get(i - 1)
        local novel = {}
        novel["name"] = e:select(".book-title"):text()
        novel["link"] = e:select("a"):first():attr("href")
        novel["description"] = e:select(".book-author"):text()
        novel["cover"] = e:select("img"):first():attr("src")
        novel["host"] = "https://truyenyy.vip"
        table.insert(novelList, novel)
    end

    return response:success(novelList, next)
end

return nil
