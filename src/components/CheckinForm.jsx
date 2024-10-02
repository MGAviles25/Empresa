import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CheckinForm() {
    const [hospedes, setHospedes] = useState([]);
    const [acomodacoes, setAcomodacoes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [formData, setFormData] = useState({
        hospede_id: '',
        acomodacao_id: '',
        data_checkin: '',
        data_checkout: '',
        produtos: []
    });

    useEffect(() => {
        axios.get('http://localhost:3001/hospedes').then(res => setHospedes(res.data));
        axios.get('http://localhost:3001/acomodacoes').then(res => setAcomodacoes(res.data));
        axios.get('http://localhost:3001/produtos').then(res => setProdutos(res.data));
    }, []);

    const handleProdutoChange = (selectedOptions) => {
        const produtosSelecionados = selectedOptions.map(option => ({
            id: option.value,
            quantidade: 1
        }));
        setFormData({ ...formData, produtos: produtosSelecionados });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/checkin', formData)
            .then(response => alert('Check-in realizado com sucesso!'))
            .catch(error => alert('Erro ao realizar check-in: ' + error.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registrar Check-in</h1>
            
            <label>Hóspede:</label>
            <select onChange={e => setFormData({ ...formData, hospede_id: e.target.value })}>
                <option value="">Selecione um hóspede</option>
                {hospedes.map(hospede => (
                    <option key={hospede.id} value={hospede.id}>{hospede.nome}</option>
                ))}
            </select>

            <label>Acomodação:</label>
            <select onChange={e => setFormData({ ...formData, acomodacao_id: e.target.value })}>
                <option value="">Selecione uma acomodação</option>
                {acomodacoes.map(acomodacao => (
                    <option key={acomodacao.id} value={acomodacao.id}>{acomodacao.numero}</option>
                ))}
            </select>

            <label>Data de Check-in:</label>
            <input type="date" onChange={e => setFormData({ ...formData, data_checkin: e.target.value })} />

            <label>Data de Check-out:</label>
            <input type="date" onChange={e => setFormData({ ...formData, data_checkout: e.target.value })} />

            <label>Produtos Consumidos:</label>
            <Select
                isMulti
                options={produtos.map(produto => ({ value: produto.id, label: produto.descricao }))}
                onChange={handleProdutoChange}
            />

            <button type="submit">Registrar Check-in</button>
        </form>
    );
}

export default CheckinForm;
