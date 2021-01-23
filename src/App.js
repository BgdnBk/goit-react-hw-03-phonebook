import React, { Component } from "react";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import СontactForm from "./components/ContactForm/ContactForm";
import s from './components/ContactForm/ContactForm.module.css';
import './App.css';

export default class Mobile extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

componentDidMount() {
  const contacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(contacts);
  if (parsedContacts) { 
    this.setState({ contacts: parsedContacts });
  }
}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) { 
      console.log("update item");    
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  veluesFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  getFilter = () => {
    const { filter, contacts } = this.state;
    const filterValues = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValues),
    );
  };

  checkName = (newName) => {
    return this.state.contacts.some(
      ({ name }) => name === Object.values(newName).join(''),
    );
  };

  deletedContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filterContact = this.getFilter();
    return (
      <div className={s.container}>
        <h1 className={s.form}>Телефонная книга</h1>
        <Form onSubmit={this.addContact} contactList={this.checkName} />
        <h2 className={s.contactList}>Контакты</h2>
        <Filter
          velue={this.state.filter}
          SearchContact={this.veluesFilter}
        />
        <СontactForm
          contactList={filterContact}
          onDeleted={this.deletedContact}
        />
      </div>
    );
  }
}


