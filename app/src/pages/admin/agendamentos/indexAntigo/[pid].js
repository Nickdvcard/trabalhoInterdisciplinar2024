import Axios from 'axios'
import NavAdmin from '@/components/NavAdmin'
import AppointmentAction from '@/components/AppointmentAction'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MenuUsers from '@/components/MenuUsers'
import { useRouter } from 'next/router';

export default function agendamentos() {

  const API_URL = "http://localhost:8080/api/agendamentos/idProfissionais/antigo/"  // URL de agendamentos
  const router = useRouter();
  const { pid } = router.query;

  const [agendamentos, setAgendamentos] = useState([]); 

  useEffect(() => {
    const getAllAgendamentos = async () => {
      try {
        const response = await Axios.get(API_URL + pid);
        setAgendamentos(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
      }
    };

    getAllAgendamentos();
  }, [pid]);  // Adicionando o pid como dependência para recarregar quando mudar

  return (
    <>
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavAdmin />
        <MenuUsers />
      </div>

      <div className="d-flex justify-content-center p-2">
        <div className="container">
          <div className="row border-bottom">
            <h3>Lista de Agendamentos</h3>
          </div>

            {/* Botão de cadastro de agendamento com o pid na URL */}
           <div className="p-3 text-center container my-2">
            <Link className="nav-link" href={`/admin/agendamentos/index/${pid}`}>
              <button className="btn btn-primary btn-lg w-50 p-2">Visualizar agendamentos a serem feitos</button>
            </Link>
          </div>

          {/* Verificando se não há agendamentos */}
          {agendamentos.length === 0 ? (
            <div className="text-center">
              <p><strong>Não há agendamentos antigos para este profissional.</strong></p>
            </div>
          ) : (
            <div className="row">
              {agendamentos.map(agendamento => {
                // Formata a data antes de retornar o JSX
                const dataFormatada = new Date(agendamento.dia).toLocaleDateString('pt-BR');

                return (
                  <div key={agendamento.idAgendamentos} className="col-md-4 mb-3" id={`agendamento-${agendamento.idAgendamentos}`}>
                    <div className="card" data-id={agendamento.idAgendamentos}>
                      <div className="card-body">
                        <h5 className="card-title">Agendamentos de {agendamento.primPr} {agendamento.ultPr}</h5>
                        <p className="card-text"><strong>Paciente:</strong> {agendamento.primPac} {agendamento.ultPac}</p>
                        <p className="card-text"><strong>Data:</strong> {dataFormatada}</p> {/* Usando a data formatada */}
                        <p className="card-text"><strong>Hora Inicio:</strong> {agendamento.horaInicio}</p>
                        <p className="card-text"><strong>Hora Fim:</strong> {agendamento.horaFim}</p>
                        <p className="card-text"><strong>Descrição:</strong> {agendamento.descricao}</p>
                        <div>
                          <AppointmentAction pid={agendamento.idAgendamentos}></AppointmentAction> 
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>  
    </>
  )
}
