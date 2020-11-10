import React from "react";
import { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
const [repositories, setrepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setrepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title : "Desafio ReactJs",
      url : "https://github.com/AdanMatsudo",
      techs : "NodeJS"
    });

    const repository = response.data; 

    setrepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setrepositories(repositories.filter(
      repository => repository.id != id
    ) )
  }

  return (
    
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key = {repository.id}>
            {repository.title}
        
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
