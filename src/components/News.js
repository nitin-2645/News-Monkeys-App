import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  page = 1;
  articles = [];
  total = 0;
  limit = 20;
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: this.page,
      total: this.total,
      limit: this.limit,
      totalPages: Math.ceil(this.total / this.limit),
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }
  /**
   * @param {*} event String
   */
  async fetchData(event) {
    this.props.setProgress(100);
    let url;
    if (event === "prev") {
      if (this.state.page === 1) {
        return;
      }
      url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=a3572612f85e4d2dbaf5e135a9c70f45&page=${this.state.page - 1}`;
      this.setState({ page: this.state.page - 1 });
    } else if (event === "next") {
      if (this.state.totalPages === this.state.page) {
        return;
      }
      url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=a3572612f85e4d2dbaf5e135a9c70f45&page=${this.state.page + 1}`;
      this.setState({ page: this.state.page + 1 });
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a3572612f85e4d2dbaf5e135a9c70f45&page=1pageSize`;
    }
    console.log(url);
    let data = await fetch(url);
    this.props.setProgress(10);
    this.setState({ loading: true });
    let parsedData = await data.json();
    this.props.setProgress(20);
    this.setState({ loading: false });
    this.setState({
      articles: parsedData.articles,
      total: parsedData.totalResults,
      totalPages: Math.ceil(this.state.total / this.state.limit),
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.fetchData("first");
    this.props.setProgress(100);
  }
  handlePrevClick = async () => {
    this.fetchData("prev");
    this.props.setProgress(80);
  };
  handleNextClick = async () => {
    this.fetchData("next");
    this.props.setProgress(80);
  };

  render() {
    if (this.state.articles.length === 0) {
      return <h1 className="text-center">Loading...</h1>;
    }
    return (
      <div className="container my-3">
        <div className="row">
          <h2 className="payal">
            {" "}
            NewsMonkeys - Top {this.capitalizeFirstLetter(
              this.props.category
            )}{" "}
            Headlines
          </h2>
          {/* {this.state.loading}&& <Spinner/> */}
          {/* <h2 className="payal" > NewsMonkeys - Top Headlines </h2> */}
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; previous
          </button>

          <button
            disabled={this.state.totalPages <= this.state.page}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;
