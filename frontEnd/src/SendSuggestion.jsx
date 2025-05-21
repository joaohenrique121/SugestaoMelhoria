import React from 'react';

const SendSuggestion = () => {
    return (
        <form className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">Nome</label>
                <input type="text" name="nome" id="nome" className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="descricao">Descrição</label>
                <input type="text" name="descricao" id="descricao" className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"/>
            </div>
            <button type="submit" className="w-full bg-black text-white rounded-xl py-2 hover:bg-white hover:text-black transition-colors">Enviar</button>
        </form>
    );
};

export default SendSuggestion;