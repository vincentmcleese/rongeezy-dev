import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth'
import NewWordForm from '../components/words/NewWordForm'
import { Row, Col } from 'reactstrap'
import { getWords, createWord } from '../actions'
import Router from 'next/router'


class Words extends React.Component {

  constructor(props){
    super()
    this.saveWord = this.saveWord.bind(this)
    this.renderWords = this.renderWords.bind(this)
  }

  static async getInitialProps({req}) {
    let words =[]
    try {
      words = await getWords(req)
    } catch(err) {
      console.log(err)
    }
    return {words}
  }

  saveWord(word) {
    word.word = word.word.trim().toLowerCase().replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g,"")
    createWord(word).then(() => {
      Router.push('/words')
    })
    .catch((err) => { console.log(err) })
  }

  renderWords(words) {
    return words.map((word, index) => {
      return (
        <li key={index}>{word.word}</li>
      )
    })
  }

  render() {
    const { words } = this.props
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="words-page" title="Your Learned Words">
           <NewWordForm onSubmit={this.saveWord}/>
            <Row>
               <div><h1>my words:</h1></div>
            </Row>
            <ul>
           {this.renderWords(words)}
           </ul>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth(Words);
