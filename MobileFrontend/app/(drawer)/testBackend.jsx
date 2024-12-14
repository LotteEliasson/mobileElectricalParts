import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.83:5000';

const TestBackend = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      console.log('Hentede brugere:', response.data);
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('Data er ikke en array:', response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Fejl ved hentning af brugere:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Indlæser...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.user_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{ color: 'red' }}>{item.username}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Ingen brugere fundet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TestBackend;
