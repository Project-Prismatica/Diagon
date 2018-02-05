import React, { Component } from 'react';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    $.ajax({
        url: this.props.dataURL,
        dataType: 'json',
        cache: false,
        success: function(data) {
            this.setState({data: data});
            console.log(this.props.dataURL);
            this.handlePageData();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }
  handlePageData() {
    console.log(this.props.router.pathname.split("/")[1])
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].link.includes(this.props.router.pathname.split("/")[1])) {
        this.setState({
          pageData: this.state.data[i].content.rendered,
          pageTitle: this.state.data[i].title.rendered
        });
      } ;
    }
  }
  render() {
    return (
      <div>
        <div className="blog-header">
            <div className="container">
                <h1 className="blog-title title-style" dangerouslySetInnerHTML={{__html: this.state.pageTitle }} />
            </div>
        </div>
        <div className = "blog-post">
          <div className = "blog-main">
            <div className = "text-style">
              <div dangerouslySetInnerHTML={{__html: this.state.pageData }} />
            <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
