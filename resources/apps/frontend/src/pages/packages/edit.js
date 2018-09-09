import React from 'react';

import {Card, CardBody} from 'reactstrap';
import {updatePackage, showPackage} from 'requests/packages';
import Breadcrumbs from 'components/Breadcrumbs';
import Form from './form';
import Loader from 'components/Loader';

class Component extends React.Component {
  state = {
    isLoading: false,
    isLoaded: false,
    isNotFound: false,
    data: {},
  };

  componentDidMount() {
    this.load();
  }

  load = async () => {
    try {
      this.setState({isLoading: true});
      const {id} = this.props.match.params;
      const {data} = await showPackage(id);
      this.setState({
        isLoading: false,
        isNotFound: false,
        data,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({isLoading: false, isNotFound: true});
    }
  };

  get previous() {
    return [
      {
        to: '/packages',
        label: 'Package',
      },
    ];
  }

  get form() {
    return (
      <Form
        onSubmit={this.onSubmit}
        name={this.state.data.name}
        description={this.state.data.description}
        is_archived={this.state.data.is_archived}
        is_default={this.state.data.is_default}
      />
    );
  }

  onSubmit = data => {
    const {id} = this.props.match.params;
    this.setState({isLoading: true});
    return updatePackage(id, {
      ...data,
      is_archived: data.is_archived === 'on',
      is_default: data.is_default === 'on',
    }).then(() => {
      this.load();
    });
  };

  render() {
    if (!this.state.isLoaded) return <Loader show />;
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Edit Package" />
        <Card>
          <CardBody className="position-relative">
            {this.state.isNotFound && 'Page Not Found'}
            {this.form}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
