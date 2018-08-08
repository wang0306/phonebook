export const types = {
  ADD_CONTACT: 'ADD_CONTACT',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  INPUT_CONTACT_FIRSTNAME: 'INPUT_CONTACT_FIRSTNAME',
  INPUT_CONTACT_LASTNAME: 'INPUT_CONTACT_LASTNAME',
  INPUT_CONTACT_PHONENUMBER: 'INPUT_CONTACT_PHONENUMBER',
  INPUT_CONTACT_BIRTHDAY: 'INPUT_CONTACT_BIRTHDAY',
  INPUT_SEARCH_PARAM: 'INPUT_SEARCH_PARAM',
  CONTACTS_TOGGLE_SORT: 'CONTACTS_TOGGLE_SORT',
  TOGGLE_CONTACT_MODAL_STATE : 'TOGGLE_CONTACT_MODAL_STATE',
  TOGGLE_CONTACT_NESTED_MODAL_STATE : 'TOGGLE_CONTACT_NESTED_MODAL_STATE',
  FILTER_SEARCH_RESULT: 'FILTER_SEARCH_RESULT',

  GET_CONTACTS_START: 'GET_CONTACTS_START',
  GET_CONTACTS_FINISHED: 'GET_CONTACTS_FINISHED',
  GET_CONTACTS_ERROR: 'GET_CONTACTS_ERROR'
};

export const SortColumns = {
  ID: "ID",
  FIRSTNAME: "FIRSTNAME",
  LASTNAME: "LASTNAME",
  PHONENUMBER: "PHONENUMBER",
  BIRTHDAY: "BIRTHDAY"
};

export const getContacts = () => {
  return function (dispatch) {
    dispatch({
      type: types.GET_CONTACTS_START
    });
    var contacts = [];
    if (localStorage.getItem("contacts") === null || localStorage.getItem("contacts") === '') {
        localStorage.setItem('contacts', JSON.stringify([]));
        contacts = [];
    } else {
        contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    dispatch({
        type: types.GET_CONTACTS_FINISHED,
        payload: contacts
    });
  }
}

export const sortByColumn = (column = SortColumns.ID) => {
  return function (dispatch) {
    dispatch({
      type: types.CONTACTS_TOGGLE_SORT,
      payload: column
    });
  };
};

export const add = (id, firstname, lastname, phonenumber, birthday) => {
  return function (dispatch) {

    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.push({id: id, firstname: firstname, lastname: lastname, tel_no: phonenumber, birthday: birthday});
    localStorage.setItem('contacts', JSON.stringify(contacts));
    dispatch({
        type: types.ADD_CONTACT,
        payload: { id, firstname, lastname, phonenumber, birthday }
    });
  };
};

export const remove = (id = -1) => {
  return function (dispatch) {

    var contacts = JSON.parse(localStorage.getItem('contacts'));
    localStorage.setItem('contacts', JSON.stringify(contacts.filter(contact => contact.id !== id)));

    dispatch({
        type: types.REMOVE_CONTACT,
        payload: id
    });
  };
};

export const update = (id = -1, activeObject = {}) => {
  return function (dispatch) {

    var contacts = JSON.parse(localStorage.getItem('contacts'));

    contacts.map(contact => {
        if (contact.id === id) {
            return {
                firstname: activeObject.firstname, 
                lastname: activeObject.lastname, 
                tel_no: activeObject.phonenumber, 
                birthday: activeObject.birthday, 
                id: id
            };
        } else {
            return contact;
        }
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    dispatch({
        type: types.UPDATE_CONTACT,
        payload: {
          id: id,
          activeObject: activeObject
        }
    });

  };
};

export const inputFirstname = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_FIRSTNAME,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const inputLastname = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_LASTNAME,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const inputPhonenumber = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_PHONENUMBER,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const inputBirthday = (value = "", type = false) => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_CONTACT_BIRTHDAY,
      payload: {
        value: value,
        type: type
      }
    });
  };
};

export const inputSearchParam = (value = "") => {
  return function (dispatch) {
    dispatch({
      type: types.INPUT_SEARCH_PARAM,
      payload: value
    });
  };
};

export const toggleModal = (objectId = null) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_CONTACT_MODAL_STATE,
      payload: objectId
    });
  };
};

export const toggleNestedModal = (object = null) => {
  return function (dispatch) {
    dispatch({
      type: types.TOGGLE_CONTACT_NESTED_MODAL_STATE,
      payload: {
        isNestedOpened : object.isNestedOpened,
        id: object.objectId
      }
    });
  };
};

export const filterSearchResult = (value = "") => {
  return function (dispatch) {
      dispatch({
          type: types.FILTER_SEARCH_RESULT,
          payload: value
      });
  };
};
