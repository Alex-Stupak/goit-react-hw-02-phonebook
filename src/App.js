import { Component } from "react";
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import ContactsFilter from "./components/ContactsFilter";


class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const checkSameName =
      contacts.some(({ name, number }) =>
        name.toLocaleLowerCase() === data.name.toLowerCase() && number === data.number);
    
    const message = `${data.name} with this phone number - ${data.number} are already in contacts!`;

    this.setState(({contacts}) => ({
      contacts:
        checkSameName ?
          (alert(message), contacts) :
          [data, ...contacts]
    }))
  }

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value
    })
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilterText = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilterText))
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  render() {
    const { filter } = this.state;
    
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phone book">
          <ContactForm onSubmit={this.formSubmitHandler} />   
        </Section>

        <Section title="Contacts">
          <ContactsFilter
            value={filter}
            onChange={this.changeFilter}
          />
          <ContactsList
            contactsBook={visibleContacts}
            onClickDelete={this.deleteContact}
          />
        </Section>
      </>  
    )
  }
  
}

export default App;
