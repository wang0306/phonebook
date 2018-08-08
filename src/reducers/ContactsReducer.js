import { types, SortColumns } from '../actions/ContactsFakeActions';
import Contact from '../models/Contact';

export const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
  input: new Contact(),
  sorting: {
    asc: true,
    column: SortColumns.ID
  },
  modal: {
    isOpen: false,
    isNestedOpened: false,
    activeId: null,
    activeObject: new Contact()
  },
  searchParam: "",
  searchedData: null,
  searched: false
};

export default (state = initialState, action) => {
  let newState = manipulateData(state, action);
  return newState;
};

const dataSort = (data, asc, column) => {
  let sortedData = [];

  switch (column){
    case SortColumns.PHONENUMBER:
      sortedData = data.sort((a, b) => { return a.phonenumber < b.phonenumber });
      break;
    case SortColumns.FIRSTNAME:
      sortedData = data.sort((a, b) => { return a.firstname.toLowerCase() < b.lastname.toLowerCase() });
      break;
    case SortColumns.LASTNAME:
      sortedData = data.sort((a, b) => { return a.lastname.toLowerCase() < b.lastname.toLowerCase() });
      break;
    case SortColumns.ID:
    default:
      sortedData = data.sort((a, b) => { return a.id - b.id; });
      break;
  }

  return asc ? sortedData : sortedData.reverse();
};

const manipulateData = (state, action) => {

  switch (action.type) {
    case types.GET_CONTACTS_START:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null
      }
    case types.GET_CONTACTS_FINISHED:
      return {
        ...state,
        data: action.payload.map((x) => new Contact(x.id, x.firstname, x.lastname, x.tel_no, x.birthday)),
        fetching: false,
        fetched: true,
      }
    case types.GET_CONTACTS_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    case types.ADD_CONTACT:
        state.data = dataSort([...state.data, new Contact(action.payload.id,action.payload.firstname,action.payload.lastname,action.payload.phonenumber,action.payload.birthday)], state.sorting.asc, state.sorting.column);
        if(state.searched)
          state.searchedData = filterSearchResult(state.data, state.searchParam);
      return {
        ...state,
        input: {
          firstname: "",
          lastname: "",
          phonenumber: "",
          birthday: ""
        }
      };
    case types.REMOVE_CONTACT:
    let filteredData = state.data.filter((x,i) => x.id !== action.payload);
    return Object.assign({}, state, {
        data: filteredData,
        searchedData: filterSearchResult(filteredData, state.searchParam),
        modal: {
          isOpen: false,
          isNestedOpened: false,
          activeId: null,
          activeObject: new Contact()
        }
        });
    case types.UPDATE_CONTACT:
      state.data = state.data.map((x,i) => x.id === action.payload.id ? action.payload.activeObject : x);

      if (state.searched)
          state.searchedData = filterSearchResult(state.data, state.searchParam);

      return {
        ...state,
        modal: {
          isOpen : false,
          isNestedOpened : false,
          activeId : null,
          activeObject : new Contact()
        }
      };
    case types.INPUT_CONTACT_FIRSTNAME:
      return action.payload.type ? { 
        ...state,
        modal : {
          ...state.modal,
          activeObject : {
            ...state.modal.activeObject,
            firstname : action.payload.value
          }
        }
      } : {
        ...state,
        input: { ...state.input, firstname: action.payload.value }
      };
    case types.INPUT_CONTACT_LASTNAME:
      return action.payload.type ? {
        ...state,
        modal : {
          ...state.modal,
          activeObject : {
            ...state.modal.activeObject,
            lastname : action.payload.value
          }
        }
      } : {
        ...state,
        input: { ...state.input, lastname: action.payload.value }
      };      
    case types.INPUT_CONTACT_PHONENUMBER:
      return action.payload.type ? {
        ...state,
        modal : {
          ...state.modal,
          activeObject : {
            ...state.modal.activeObject,
            phonenumber : action.payload.value
          }
        }
      } : {
        ...state,
        input: { ...state.input, phonenumber: action.payload.value }
      };
    case types.INPUT_CONTACT_BIRTHDAY:
      return action.payload.type ? {
        ...state,
        modal : {
          ...state.modal,
          activeObject : {
            ...state.modal.activeObject,
            birthday : action.payload.value
          }
        }
      } : {
        ...state,
        input: { ...state.input, birthday: action.payload.value }
      };      
    case types.INPUT_SEARCH_PARAM:
      return {
        ...state,
        searchParam: action.payload
    };
    case types.CONTACTS_TOGGLE_SORT:
      let sortDirection = state.sorting.column === action.payload ? !state.sorting.asc : true;
        return {
        ...state,
        data: dataSort(state.data, sortDirection, action.payload),
        sorting: {
          asc: sortDirection,
          column: action.payload
        }
      };
    case types.TOGGLE_CONTACT_MODAL_STATE:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: action.payload !== null,
          activeId: action.payload,
          activeObject: action.payload !== null ? state.data.filter(x => x.id === action.payload)[0] : new Contact()

        }
      };
      case types.TOGGLE_CONTACT_NESTED_MODAL_STATE:
        return {
          ...state,
          modal: {
            ...state.modal,
            isNestedOpened: action.payload.isNestedOpened
          }
        };
      case types.TOGGLE_LIST_TYPE:
        return {
          ...state,
          activeList: action.payload
        };
      case types.FILTER_SEARCH_RESULT:
        return action.payload.length ? {
          ...state,
          searchedData: filterSearchResult(state.data, action.payload),
          searched: true
        } : {
          ...state,
          searched: false
        };
    default:
      return state;

  // eslint-disable-next-line
  };

};

const filterSearchResult = (data, searchParam) =>  {
  if (searchParam[0]){
    const searchPArr = searchParam[0].split(",");
    return data.filter(x => searchPArr[0] === x.firstname && searchPArr[1] === x.lastname && searchPArr[2] === x.phonenumber && searchPArr[3] === x.birthday);
  }
  
}

