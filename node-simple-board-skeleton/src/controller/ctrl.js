const { ArticleDAO } = require("../DAO");

const controllerName = async (req, res, next) => {
    try {
        const {user}=req.session;
        return res.render("index.pug", {user});

    } catch (err) {
        return next(err);
    }
};

const indexPage = async (req, res, next) => {
    try {
        const { user } = req.session;
        return res.render('index.pug', { user });
    } catch (err) {
        return next(err);
    }
};

const listArticle = async(req, res, next) =>{
    try{
        const {user} = req.session;
        const {page}=req.params;
        if(page<=0) throw new Error("BAD_REQUEST");
        const articles = await ArticleDAO.getList(10*(page-1), 10);
        const hasPrev=(page > 1) ? true : false;

        const articleNumber = ArticleDAO.getTotalCount() 
        const hasNext = (articleNumber > page*10) ? true : false;

        return res.render("articles/index.pug", {user, articles, page, hasPrev, hasNext});
        
    }catch(err){
        next(err);
    }
}

const latestArticle = async(req, res, next) =>{
    try{
        return res.redirect("/articles/page/1");
    }catch(err){
        next(err);
    }
}

module.exports={
    listArticle, latestArticle,indexPage
};