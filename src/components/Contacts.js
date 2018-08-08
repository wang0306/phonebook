import React from 'react';
import * as actions from '../actions/ContactsFakeActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CModalWindow from './shared/ModalWindow';
import { Typeahead } from 'react-bootstrap-typeahead';

import { Row, Col, Input, InputGroup, InputGroupButton, Button } from 'reactstrap';


import ContactsList from './ContactsList';

class Contacts extends React.Component {

    _onChange = (value) => {

      if (value) {
        this.props.actions.inputSearchParam(value)
        this.props.actions.filterSearchResult(value);
      } else {
        this.props.actions.inputSearchParam('');
        this.props.actions.filterSearchResult('');
      }};

    _totalContacts = () => {

      let sum = this.props.searched ? 
        this.props.searchedData.reduce((sum, value) => { return sum + 1; }, 0) // TODO: multiple search
          : this.props.data.length
      return sum;
    };

  render() {

    return (
      <div>
        <br />
        <Row>
          <Col xs="12">
            <InputGroup>
              <Input
                ref="firstname"
                type="text"
                placeholder="First Name"
                value={this.props.input.firstname}
                onChange={(e) => this.props.actions.inputFirstname(e.target.value)}/>
              <Input
                ref="lastname"
                type="text"
                placeholder="Last Name"
                value={this.props.input.lastname}
                onChange={(e) => this.props.actions.inputLastname(e.target.value)}/>
            </InputGroup>
            <InputGroup>
              <Input
                type="text"
                placeholder="Phonenumber"
                value={this.props.input.phonenumber}
                onChange={(e) => this.props.actions.inputPhonenumber(e.target.value)} />
              <Input
                type="text"
                placeholder="Birthday"
                value={this.props.input.birthday}
                onChange={(e) => this.props.actions.inputBirthday(e.target.value)} />
            </InputGroup>

            <InputGroupButton>
                <Button
                  disabled={this.props.input.phonenumber.length < 6 || this.props.input.firstname.length < 2 || this.props.input.lastname.length < 2 || !new RegExp(/^\d+$/).test(this.props.input.phonenumber || this.props.input.birthday.length < 2)}
                  color="success"
                  style={{
                    width: '100%'
                  }}
                  onClick={() => {
                   this.props.actions.add(this.props.data.length !== 0 ? this.props.data[this.props.data.length-1].id+1 : 0, this.props.input.firstname, this.props.input.lastname, this.props.input.phonenumber, this.props.input.birthday);
                  }}>Add</Button>
            </InputGroupButton>

            <br />

            <Typeahead
              placeholder="Search"
              onChange={(selected) => {
                this._onChange(selected);
              }}
              options={
                this.props.data.map(contact => {
                  return contact.firstname + ',' + contact.lastname + ',' + contact.phonenumber + ',' + contact.birthday;
                })
              }
            />
          </Col>
          <Col xs="12">
            <ContactsList />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <p className="text-muted"> You have <b>{this._totalContacts()}</b> contact(s).</p>
          </Col>
        </Row>
        <CModalWindow />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
	return {
    data: state.contacts.data,
    favorites: state.contacts.favorites,
    input: state.contacts.input,
    activeList: state.contacts.activeList,
    searchParam: state.contacts.searchParam,
    searchedData: state.contacts.searchedData,
    searched: state.contacts.searched
	};
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Contacts);
