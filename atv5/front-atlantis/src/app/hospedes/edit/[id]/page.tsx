'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';

interface Guest {
  name: string;
  age: string;
  country: string;
}

export default function EditGuestPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // Obtendo o ID da URL.

  const initialGuest: Guest = {
    name: '',
    age: '',
    country: '',
  };

  const [guest, setGuest] = useState(initialGuest);

  useEffect(() => {
    // ID do hóspede que você deseja buscar (substitua pelo ID desejado)
    let guestId = id;

    // Fazer uma solicitação GET para obter os dados do hóspede pelo ID
    axios.get(`http://localhost:8080/hospedes/${guestId}`)
      .then((response) => {
        const fetchedGuest = response.data;

        // Atualizar o estado `guest` com os dados obtidos
        setGuest(fetchedGuest);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do hóspede:", error);
      });
  }, [id]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuest({ ...guest, name: event.target.value });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuest({ ...guest, age: event.target.value });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuest({ ...guest, country: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Converte a string de idade em um número inteiro usando parseInt
    const ageAsInt = parseInt(guest.age, 10);

    // Verifica se a conversão foi bem-sucedida e ageAsInt não é NaN
    if (!isNaN(ageAsInt)) {
      const formData = {
        name: guest.name,
        age: ageAsInt,
        country: guest.country,
      };

      try {
        const response = await axios.put(`http://localhost:8080/hospedes/${id}`, formData);

        // Lógica para tratar a resposta do servidor, se necessário
        console.log("Resposta do servidor:", response.data);

        // Redireciona para a página de hóspedes após a edição bem-sucedida
        window.location.href = "/hospedes";
      } catch (error) {
        // Tratar erros de requisição, se necessário
        console.error("Erro ao enviar os dados:", error);
      }
    } else {
      // Lida com o caso em que a conversão de idade falhou
      console.error("A idade não é um número válido");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Link href="/hospedes" className="text-blue-500 hover:text-blue-700 mb-4 inline-flex items-center">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Lista de Hóspedes
        </Link>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Editar Hóspede</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nome</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded"
              value={guest.name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">Idade</label>
            <input
              type="number"
              id="age"
              className="w-full p-2 border rounded"
              value={guest.age}
              onChange={handleAgeChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">País</label>
            <input
              type="text"
              id="country"
              className="w-full p-2 border rounded"
              value={guest.country}
              onChange={handleCountryChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </main>
  );
}
