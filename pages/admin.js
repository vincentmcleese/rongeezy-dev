import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth'

class Owner extends React.Component {

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="admin-page" title="Admin Dashboard">
          <h1> Overview of all users </h1>
          <h1> Article management </h1>
          <h1> Analytics </h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth(Owner, 'siteOwner');
