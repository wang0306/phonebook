import React from 'react';
import FontAwesome from 'react-fontawesome';

export class ContactsListItem extends React.Component {

  render() {
    return (
      <tr>
          <td>{this.props.data.id }</td>
          <td>{this.props.data.firstname}</td>
          <td>{this.props.data.lastname}</td>
          <td>{this.props.data.phonenumber}</td>
          <td>{this.props.data.birthday}</td>
          <td onClick={this.props.editFunction} className="text-center action"><FontAwesome name='pencil'/></td>
      </tr>
    )
  }
}
