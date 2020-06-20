import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from './services/api';

export default function App() {
  const[repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRespositories(response.data);
    })
  }, []);


  async function handleLikeRepository(id) {
    try {
      const response = await api.post(`/repositories/${id}/like`);

      const updatedRepositorie = repositories.map(repositorie => repositorie.id === id ? {
        ...repositorie,
        likes: parseInt(repositorie.likes) + 1
      } : repositorie);

      setRespositories(updatedRepositorie)
    } catch (error) {
      alert('Error !')
    }


  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Repository List</Text>
        <FlatList 
            data={repositories
            }
            keyExtractor={repositorie => repositorie.id}
            renderItem={({ item }) => (
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{item.title}</Text>

                <View style={styles.techsContainer}>
                  {item.techs.map(tech => (
                    <Text key={tech} style={styles.tech}>
                      {tech}
                    </Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${item.id}`}
                  >
                    {item.likes} curtidas
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.button}
                  onPress={() => handleLikeRepository(item.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${item.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            )}
        />
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#7159c1",
    // alignItems: 'center'
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "#fff",
    alignSelf: 'center',
    marginBottom: 30
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 4
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 20,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#7159c1",
    marginTop: 10,
    borderRadius: 4,
    padding: 15,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", 
  },
});
