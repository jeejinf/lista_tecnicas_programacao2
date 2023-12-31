"use client"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import axios from "axios"

export default function CreateGuestPage() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [country, setCountry] = useState("")

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value)
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Converte a string de idade em um número inteiro usando parseInt
    const ageAsInt = parseInt(age, 10)

    // Verifica se a conversão foi bem-sucedida e ageAsInt não é NaN
    if (!isNaN(ageAsInt)) {
      const formData = {
        name,
        age: ageAsInt,
        country,
      }

      try {
        const response = await axios.post("http://localhost:8080/hospedes/create", formData)

        // Lógica para tratar a resposta do servidor, se necessário
        console.log("Resposta do servidor:", response.data)
        window.location.href = "/hospedes";
      } catch (error) {
        // Tratar erros de requisição, se necessário
        console.error("Erro ao enviar os dados:", error)
      }
    } else {
      // Lida com o caso em que a conversão de idade falhou
      console.error("A idade não é um número válido")
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Link href="/hospedes" className="text-blue-500 hover:text-blue-700 mb-4 inline-flex items-center">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Voltar para Lista de Hóspedes
        </Link>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Criar Novo Hóspede</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">
              Idade
            </label>
            <input
              type="number"
              id="age"
              className="w-full p-2 border rounded"
              value={age}
              onChange={handleAgeChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">
              País
            </label>
            <input
              type="text"
              id="country"
              className="w-full p-2 border rounded"
              value={country}
              onChange={handleCountryChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Criar Hóspede
          </button>
        </form>
      </div>
    </main>
  )
}
