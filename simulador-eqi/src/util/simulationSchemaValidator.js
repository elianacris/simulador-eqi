import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const mode = 'all';

const defaultValues = {
    initialContribution: '',
    period: '',
    monthlyContribution: '',
    profitability: '',
    ipca: '',
    cdi: ''
};

const simulationSchemaValidation = {
    mode,
    defaultValues,
    resolver: yupResolver(
        yup.object().shape({
            initialContribution: yup.number()
                .typeError('O valor deve ser um número')
                .required("Aporte é obrigatório")
                .positive("O número deve ser positivo."),
            period: yup.number("Prazo deve ser um número")
                .typeError('O valor deve ser um número')
                .required('Prazo é obrigatório')
                .positive("O número deve ser positivo."),
            monthlyContribution: yup.number()
                .typeError('O valor deve ser um número')
                .required('Aporte mensal é obrigatório')
                .positive("O número deve ser positivo."),
            profitability: yup.number()
                .typeError('O valor deve ser um número')
                .required('Rentabilidade é obrigatório')
                .positive("O número deve ser positivo."),
            ipca: yup.number()
                .typeError('O valor deve ser um número')
                .required('é obrigatório')
                .positive("O número deve ser positivo."),
            cdi: yup.number()
                .typeError('O valor deve ser um número')
                .required('é obrigatório')
                .positive("O número deve ser positivo.")
        }).required()
    )
};

export default simulationSchemaValidation;