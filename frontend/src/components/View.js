import React from 'react'

export const View = ({pontos,}) => {
    
    return pontos.map(ponto=>(
        
        <tr key={ponto.Justificativa}>
            <td>{ponto.Justificativa}</td>
            <td>{ponto.Data}</td>
            <td>{ponto.Hora}</td>              
        </tr>            
    
))
}