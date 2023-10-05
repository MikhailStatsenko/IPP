package com.pw6.mynote;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public void save(Note note) {
        noteRepository.save(note);
    }

    public Note getById(long id) {
        return noteRepository.getReferenceById(id);
    }

    public void deleteById(long id) {
        noteRepository.deleteById(id);
    }
}
