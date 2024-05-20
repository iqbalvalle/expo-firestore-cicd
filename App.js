import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db, collection, addDoc, deleteDoc, getDocs, doc } from './firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const querySnapshot = await getDocs(collection(db, 'notes'));
    const fetchedNotes = [];
    querySnapshot.forEach(doc => {
      fetchedNotes.push({ id: doc.id, data: doc.data() });
    });
    // Urutkan catatan berdasarkan konten
    fetchedNotes.sort((a, b) => (a.data.content > b.data.content) ? 1 : -1);
    setNotes(fetchedNotes);
  };

  const addNote = async () => {
    if (note.trim() === '') return;
    try {
      const docRef = await addDoc(collection(db, 'notes'), { content: note });
      setNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note: ', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
      // Ambil catatan baru setelah menghapus
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note: ', error);
    }
  };

  const renderNote = ({ item }) => (
    <View style={styles.note}>
      <Text style={styles.noteText}>{item.data.content}</Text>
      <TouchableOpacity onPress={() => deleteNote(item.id)} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App ODP BNI 309</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a note"
          onChangeText={text => setNote(text)}
          value={note}
        />
        <TouchableOpacity style={styles.button} onPress={addNote}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        style={styles.notesContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  notesContainer: {
    width: '100%',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteText: {
    flex: 1,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
  },
});
