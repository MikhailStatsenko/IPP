package com.app.contacts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        return ResponseEntity.ofNullable(contactService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getNote(@PathVariable Long id) {
        return ResponseEntity.ofNullable(contactService.getById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.save(contact));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Long id, @RequestBody Contact contact) {
        return ResponseEntity.ofNullable(contactService.updateContact(id, contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        if (contactService.getById(id).isEmpty())
            return ResponseEntity.notFound().build();

        contactService.delete(id);
        return ResponseEntity.ok().build();
    }
}
