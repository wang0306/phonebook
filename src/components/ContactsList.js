import React from 'react';
import FontAwesome from 'react-fontawesome';
import { SortColumns } from '../actions/ContactsFakeActions';
import * as actions from '../actions/ContactsFakeActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContactsListItem } from './ContactsListItem';

import { Table } from 'reactstrap';
import Spinner from './Spinner';

class ContactsList extends React.Component {

  _sort(sortColumn) {
    this.props.actions.sortByColumn(sortColumn)
  }

  _sortHelper(columnToCheck) {
    if (this.props.sorting.column === columnToCheck)
      return <FontAwesome name={this.props.sorting.asc ? 'sort-asc' : 'sort-desc'} />;
  }

  renderRows(data) {
    if (data.length > 0) {
      return data.map((x, i) => <ContactsListItem
        key={i}
        data={x}
        editFunction={() => this.props.actions.toggleModal(x.id)}
      />)
    } else {
      return <tr><td colSpan={6} className="text-center">There are no contacts in this list!</td></tr>
    }
  }

  fullTable() {

    let data = this.props.searched ? this.props.searchedData : this.props.data;

    return (

      <Table bordered className="thead-inverse">
        <thead>
          <tr>
            <th onClick={() => this._sort(SortColumns.ID)}>ID {this._sortHelper(SortColumns.ID)}</th>
            <th onClick={() => this._sort(SortColumns.FIRSTNAME)}>First Name {this._sortHelper(SortColumns.FIRSTNAME)}</th>
            <th onClick={() => this._sort(SortColumns.LASTNAME)}>Last Name {this._sortHelper(SortColumns.LASTNAME)}</th>
            <th onClick={() => this._sort(SortColumns.PHONENUMBER)}>Phonenumber {this._sortHelper(SortColumns.PHONENUMBER)}</th>
            <th onClick={() => this._sort(SortColumns.BIRTHDAY)}>Birthday {this._sortHelper(SortColumns.BIRTHDAY)}</th>
            <th colSpan={1} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows(data)}
        </tbody>
      </Table>

    );
  }

  componentWillMount() {
    if (!this.props.fetching && !this.props.fetched)
      this.props.actions.getContacts();
  }

  render() {
    if (this.props.fetched) return this.fullTable();
    else if (this.props.error !== null) return <div><h1>There was a problem when making a request to get the contacts. Please refresh the page!</h1><br /> <p>{this.props.error}</p></div>;
    else return <Spinner />;
  }
};

const mapStateToProps = (state) => {
  return {
    data: state.contacts.data,
    sorting: state.contacts.sorting,
    modal: state.contacts.modal,
    activeList: state.contacts.activeList,
    searchedData: state.contacts.searchedData,
    searched: state.contacts.searched,

    fetching: state.contacts.fetching,
    fetched: state.contacts.fetched,
    error: state.contacts.error
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(ContactsList);
