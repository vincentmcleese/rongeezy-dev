import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth'
import { getWords, createWord } from '../actions'
import { Row, Col, Jumbotron, Button, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';
import Router from 'next/router'

class Read extends React.Component {

  constructor(props){
    super()
    // this.saveWord = this.saveWord.bind(this)
    this.parseWords = this.parseWords.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
    this.state = {
      text: "The land that comprises what is now Nova Scotia has been inhabited by the indigenous Miꞌkmaq people for thousands of years. France's first settlement in North America, Port-Royal, was established in 1605 and intermittently served in various locations as the capital of the French colony of Acadia for over a hundred years. The Fortress of Louisbourg was a key focus point in the struggle between the British and French for control of the area, changing hands numerous times until France relinquished its claims with the Treaty of Paris in 1763. During the American Revolutionary War, thousands of Loyalists settled in Nova Scotia. In 1848, Nova Scotia became the first British colony to achieve responsible government, and it federated in July 1867 with New Brunswick and the Province of Canada (now Ontario and Quebec) to form what is now the country of Canada."
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onChange = (event) => this.setState({ text: event.target.value });

  saveWord(word) {

    word.word = word.word.trim().toLowerCase().replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"")
    createWord(word).then(() => {
      Router.push('/read')
    })
    .catch((err) => { console.log(err) })
  }

  static async getInitialProps({req}) {
    let words =[]
    try {
      words = await getWords(req)
    } catch(err) {
      console.log(err)
    }
    const knownWords = words.map(word => word.word)
    return {knownWords}
  }

  calculateStats(text, knownWords) {
    //create match array
    const textArray = text.toLowerCase().replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"").split(' ')
    const numbers = /^[0-9]+$/;
    const matchArray = textArray.map(word => knownWords.includes(word) || numbers.test(word))
    
    const totalWords = matchArray.length
    const totalMatch = matchArray.filter(value => value !== false).length
    const comprehension = ( totalMatch / totalWords ) * 100
    return (<div>You know {totalMatch} words of this text with a total comprehension of {Math.round(comprehension)}%.</div>)
    }
  

  parseWords(text, knownWords) {
    //create match array
    const textArray = text.toLowerCase().replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"").split(' ')
    const numbers = /^[0-9]+$/;
    const matchArray = textArray.map(word => knownWords.includes(word) || numbers.test(word))

    //create html
    const formattedWords = text.split(' ')
    return formattedWords.map((word, index) => {
      return (
        <span >
          <span key={index} className={matchArray[index].toString()} onClick={() => this.saveWord({word})}>{word}</span>
          <span> &nbsp; </span>
        </span>
      )
    })
  }

  render() {
    const { knownWords } = this.props
    const { text } = this.state
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="read-page" title="Read a Text">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="exampleText">Input a text to read</Label>
                    <Input type="textarea" name="text" id="exampleText" value={text} onChange={this.onChange} />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h2>{this.calculateStats(text, knownWords)}</h2>
              </Jumbotron>
           </Col>
         </Row>
          <Row>
            <Col>
              <Jumbotron>
                <h2>Your parsed text:</h2>
                <hr className="my-2" />
                <p>{this.parseWords(text, knownWords)}</p>
              </Jumbotron>
           </Col>
         </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth(Read);
