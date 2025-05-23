import React, {useEffect, useRef, useState} from 'react';
import ListSuggestions from "./ListSuggestions.jsx";

const SendSuggestion = () => {
    const formref = useRef(null);
    const [sugestoes, setSugestoes] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8069/api/sugestoes')
            .then(res => res.json())
            .then(data => {
                if (data && data.sugestoes) {
                    setSugestoes(data.sugestoes);
                    console.log(data.sugestoes)
                }
            });
    }, []);

    const sendSuggestion = async (e)=>{
        e.preventDefault()
        const nome = formref.current.nome.value
        const descricao = formref.current.descricao.value
        const response = await fetch('http://localhost:8069/api/sugestoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                descricao: descricao
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.sugestao) {
                    setSugestoes(prevSugestoes => [...prevSugestoes, data.sugestao]);
                    formref.current.nome.value = ""
                    formref.current.descricao.value = ""
                }
                if (data.erro) {
                    console.error('Erro:', data.erro);
                } else {
                    console.log('Sucesso:', data);
                }
            })
            .catch(error => console.error('Erro na requisição:', error));


    }

    return (
        <>
            <form ref={formref} onSubmit={(e)=>sendSuggestion(e)} className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="descricao">Descrição</label>
                    <textarea name="descricao" id="descricao" className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"/>
                </div>
                <button type="submit" className="w-full bg-black text-white rounded-xl py-2 hover:bg-white hover:text-black transition-colors">Enviar</button>
            </form>
            <ListSuggestions sugestoes={sugestoes}/>
        </>
    );
};

export default SendSuggestion;