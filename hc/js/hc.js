var Question = React.createClass({
  getInitialState: function () {
    return { display: true }
  },
  handleClick: function (e) {
    this.setState({ display: !this.state.display });
    var responseEl = this.getDOMNode().getElementsByClassName('response')[0];

    if (!this.state.display) {
      responseEl.style.display = 'none';
    } else {
      responseEl.style.display = 'block'
    }
  },
  render: function () {
    return (
      <article className="question">
        <h1 onClick={ this.handleClick }>{ this.props.data.question }</h1>
        
        <Response data={ this.props.data } />
      </article>
    );
  }
});

var Response = React.createClass({
  render: function () {
    var i = 1;
    var footnotes = this.props.data.footnotes.map(function (footnote) {
      return " [" + i++ + "] " + footnote;
    });

    return (
      <div className="response">
        <p className="answer">{ this.props.data.answer }</p>
        <p className="footnotes">{ footnotes }</p>
      </div>
    );
  }
});

var QuestionList = React.createClass({
  loadQuestionsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    this.loadQuestionsFromServer();
  },
  render: function () {
    var questionNodes = this.state.data.map(function (question) {
      return (
        <Question data={question}></Question>
      );
    });

    return (
      <section id="questions">
        { questionNodes }
      </section>
    );
  }
});

React.render(
  <QuestionList url="hc.json" />,
  document.getElementById('content')
);


