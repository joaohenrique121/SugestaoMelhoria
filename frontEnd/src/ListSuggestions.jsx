import React, {useEffect} from 'react';

const ListSuggestions = () => {
    useEffect(() => {
        fetch('http://localhost:8069/api/sugestoes', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div>
            <h1>Lista de Sugestões:</h1>
        </div>
    );
};

export default ListSuggestions;