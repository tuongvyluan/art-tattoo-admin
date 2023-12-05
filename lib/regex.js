const taxCode10 = /^[0-9]{10}$/

const taxCode14 = /^[0-9]{10}\-[0-9]{3}$/

export const checkTaxCode = (taxCode) => {
  return taxCode10.test(taxCode) || taxCode14.test(taxCode)
}