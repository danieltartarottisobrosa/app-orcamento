import numeral from 'numeral'

export const formatDate = date =>
  `${('' + date.day).padStart(2, '0')}/${('' + date.month).padStart(2, '0')}/${date.year}`
    
export const formatMonth = date => 
  `${('' + date.month).padStart(2, '0')}/${date.year}`

export const formatMoney = number =>
    numeral(number).format('0,0.00')
