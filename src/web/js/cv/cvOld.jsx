import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';

let ListElement = React.createClass({
  render: function() {
    return <li className={this.props.className}>{this.props.data}</li>
  }
});

/*
*Personalia classes
*/

let PersonaliaEntry = React.createClass({
  render: function() {
    return (
      <ul className='personaliaList'>
        <li>
          <h3>{this.props.title}</h3>
        </li>
        {this.props.content.map(function(result) {
          return <ListElement className='personaliaListElement' key={result.id} data={result}/>
        })
}
      </ul>
    );
  }
});

let PersonaliaColumn = React.createClass({
  render: function() {
    let p = this.props.data;
    return (
      <div className='personaliaColumn'>
        <img className='profilePicture' src='img/color.jpg' width="160px"/>
        <PersonaliaEntry title='Adresse' content={[p.address.road, p.address.postal_number, p.address.city, p.address.country]}/>
        <PersonaliaEntry title='Kontaktinformasjon' content={[p.mobile_phone, p.e_mail]}/>
        <PersonaliaEntry title='Fødselsdato' content={[p.birth_date]}/>
        <PersonaliaEntry title='Språk' content={[]}/>
        <PersonaliaEntry title='Interesser' content={[]}/>
      </div>
    );
  }
});

/*
* CVEntry classes
*/

let CVEntry = React.createClass({
  render: function() {
    let header = this.props.org != null
      ? this.props.org + ','
      : '';
    header += this.props.title;

    return (
      <table className="entry">
        <tbody>
          <tr className='headline'>
            <td>{this.props.fromDate}
              -
              {this.props.toDate}</td>
            <td>{header}</td>
          </tr>
          <tr>
            <td className='field'>{this.props.field}</td>
            <td className='content'>
              {this.props.content.map(function(result) {
                return <ListElement key={result.id} className='contentLine' data={result}/>
              })
}</td>
          </tr>
        </tbody>
      </table>
    );
  }
});

let CVTopicHeader = React.createClass({
  render: function() {

    let className,
      content;

    if (this.props.subHeader) {
      className = 'topic-subheader';
      content = <h3>{this.props.title}</h3>
    } else {
      className = 'topic-header';
      content = <h2>{this.props.title}</h2>
    }

    return <div className={className}>
      {content}
    </div>
  }
});

let CollapsibleCVTopic = React.createClass({
  render: function() {
    let sortBy = this.props.sortBy;
    let result = [];
    let subTopics = [];

    result.push(< CVTopicHeader title = {
      this.props.title
    }
    subHeader = {
      false
    } />);
    this.props.data.map(function(entry) {

      let test = entry[sortBy];
      if (subTopics.indexOf(test) == -1) {
        subTopics.push(test);
        result.push(< CVTopicHeader title = {
          test
        }
        subHeader = {
          true
        } />);
      }
      result.push(< CVEntry key = {
        entry.id
      }
      fromDate = {
        entry.from_date
      }
      toDate = {
        entry.to_date
      }
      title = {
        entry.title
      }
      field = {
        entry.field
      }
      content = {
        entry.descriptions
      } />);
    });

    return <div>
      {result}
    </div>;
  }
});

let CVTopic = React.createClass({
  render: function() {

    return <div className='topic'>
      <CVTopicHeader title={this.props.title} subHeader={false}/>
      {this.props.data.map(function(result) {
        return <CVEntry key={result.id} fromDate={result.from_date} toDate={result.to_date} title= {result.title} org={result.org} field={result.field} content={result.descriptions}/>
      })
}
    </div>
  }
});

let CV = React.createClass({
  render: function() {
    let data = this.props.data;
    return <div className='cv'>
      <h1>{data.cv_title}</h1>
      <CVTopic title='Utdanning' data={data.educations}/>
      <CVTopic title='Arbeidserfaring' data={data.work_experiences}/>
      <CollapsibleCVTopic title='Prosjekter' data={data.projects} sortBy="org"/>
    </div>
  }
});

/*
* Main
*/

let Body = React.createClass({
  render: function() {
    return <div>
      <PersonaliaColumn data={this.props.data.profile}/>
      <CV data={this.props.data}/>
    </div>
  }
});

request('http://localhost:8081/cv', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    ReactDOM.render(< Body data = {
      JSON.parse(body)
    } />, document.getElementById('content'));
  }
});
