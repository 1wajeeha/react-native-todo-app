import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleAddTodo = () => {
    if (todo === "") {
      return;
    }
    if (todo.trim()) {
      setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
      setTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  const renderTodos = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: 'pink',
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: "red",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}>
        <Text
          style={{
            color: 'purple',
            fontWeight: '900',
            flex: 1,
          }}>
          {item.title}
        </Text>
        <IconButton icon="pencil" onPress={() => handleEditTodo(item)} />
        <IconButton icon="trash-can" onPress={() => handleDeleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: '#ddd',
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 16,
          height: 50,
          marginTop: 17,
        }}
        placeholder="ADD A TEXT HERE"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 10,
            paddingVertical: 12,
            marginVertical: 24,
            alignItems: 'center',
          }}
          onPress={handleUpdateTodo}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            borderRadius: 10,
            paddingVertical: 12,
            marginVertical: 24,
            alignItems: 'center',
          }}
          onPress={handleAddTodo}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={todoList}
        renderItem={renderTodos}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
