import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioNewForm from '../components/portfolios/PortfolioNewForm'
import { Row, Col } from 'reactstrap'
import withAuth from '../components/hoc/withAuth'

class PortfolioNew extends React.Component {
    
    constructor(props){
        super()
        this.savePortfolio = this.savePortfolio.bind(this)
    }

  savePortfolio(portfolioValues) {
    alert(JSON.stringify(portfolioValues, null, 2));
  }

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create new Portfolio">
            <Row>
                <Col md="6">
                    <PortfolioNewForm onSubmit={this.savePortfolio}/>
                </Col>
            </Row>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth(PortfolioNew, 'siteOwner');