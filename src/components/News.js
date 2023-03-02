import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News =(props)=>{
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);
  
 
  const capitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  };
  const updateNews =async()=> {
   props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);

    let parsedData = await data.json();
    setArticles(parsedData.articles)  ;
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter( props.category )} - NewsMonkey`;
   updateNews()
  },[])


 const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
     setPage(page+1);
    
    let data = await fetch(url);
    let parsedData = await data.json();
setArticles(articles.concat(parsedData.articles));
setTotalResults(parsedData.totalResults);
// setLoading(false);
  
  };
 
    return (
      <>
        <h2 className="text-center my-3">
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
