export const footerTextTemplate = `ESTOS PRECIOS NO INCLUYEN IVA								
PRECIOS DEL DIA EN PESOS								
FORMA DE PAGO								
Anticipo 60% con la aceptación del presupuesto.						
Saldo 30% por certif. contra entrega de materiales en obra. Ajustable s/var.índ. de refer CAC Base Abril 2019						
Saldo 10% por certificacion contra avance  de montaje . Ajustable idem						
Plazo de ejecucion: A CONVENIR`;

export const initialState = {
  datos: {
    cliente: "",
    referencia: "",
    destinatario: "",
    email: "",
    domicilio: "",
    nroPresupuesto: "",
    telefono: "",
    obra: "",
    titulo: "",
    bajada: "",
    pie: footerTextTemplate,
    maracacion: 1
  },
  sistemas: [
    /*{
      sistema: 'bath32',
      modulos: [
        {
          modulo: "divisorio 1,50 macizo",
          cantidad: 2,
          alto: 1,50,
          ancho: 0.30,
          variable: 0,
          precioUnitario: 1000,
          precioFinal: 2000
        }
      ]
    }*/
  ],
  precioTotal: 0
};
