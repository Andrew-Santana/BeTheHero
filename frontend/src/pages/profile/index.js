import React, {useState ,useEffect} from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';
 
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handlerDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id )); 
        }catch (err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }
    function handlerLogout(){ 
        localStorage.clear(); 
        
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handlerLogout}><FiPower size={18} color="#e02041"/></button>
            </header>

            <h1>Casos registrados</h1>

            <ul>
               {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição</strong>
                    <p>{incident.description}</p>

                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handlerDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size="20" color="#a8a8b3"/>
                    </button>
                </li>
               ))}
            </ul>
        </div>
    );
}