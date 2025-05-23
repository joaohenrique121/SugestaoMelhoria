import React, {useEffect, useState} from 'react';

const ListSuggestions = ({sugestoes}) => {

    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-4">Lista de Sugestões:</h1>

            <div className="flex justify-center">
                <table className="table-auto border-collapse border border-black text-black">
                    <thead className="bg-black text-white">
                    <tr>
                        <th className="border border-black px-4 py-2">Nome</th>
                        <th className="border border-black px-4 py-2">Descrição</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(sugestoes) && sugestoes.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td className="border border-black px-4 py-2">{item.nome}</td>
                            <td className="border border-black px-4 py-2">{item.descricao}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ListSuggestions;