package com.app.contacts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    public Optional<Contact> getById(Long id) {
        return contactRepository.findById(id);
    }

    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    public void delete(Long id) {
        contactRepository.deleteById(id);
    }

    public Contact updateContact(Long id, Contact contact) {
        Optional<Contact> dbContact = getById(id);
        if (dbContact.isEmpty())
            return null;

        Contact contactToUpdate = dbContact.get();
        contactToUpdate.setName(contact.getName());
        contactToUpdate.setPhoneNumber(contact.getPhoneNumber());

        return save(contactToUpdate);
    }
}
