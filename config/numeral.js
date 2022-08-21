import numeral from 'numeral'

numeral.register('locale', 'pt-BR', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return 'º'
    },
    currency: {
        symbol: 'R$'
    }
});

numeral.locale('pt-BR');