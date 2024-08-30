module.exports = (query) => {
    let searchObject = {
        keyword: ""
    }
    if(query.keyword){
        searchObject.keyword = query.keyword;
        const regex = new RegExp(query.keyword, "i");
        searchObject.regex = regex;
    }
    return searchObject;
}