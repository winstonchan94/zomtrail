const initialState = {
    articles: [],
    article: {}
};

export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOAD_ARTICLES' :
      return {
        article,
        articles: action.articles
      };
    case 'VIEW_ARTICLE':
      return {
        article,
        articles: action.article
      };
    case 'CLAP_ARTICLE':
      let article = Object.assign({}, state.article);
      article.claps++;
      return {
        article,
      };
    default:
      return state;
  }
};
