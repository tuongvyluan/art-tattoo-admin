const { formatPrice } = require("./helpers");

export const calculateServiceKey = (service) => {
  let difficulty = 0;
  if (service.hasColor) {
    difficulty += 1;
  }
  if (service.isDifficult) {
    difficulty += 5
  }
  return 100 * service.placement + 10 * service.size + difficulty
}

export const getPriceRange = (minPrice, maxPrice) => {
  return `${formatPrice(minPrice / 1000)}k - ${formatPrice(maxPrice / 1000)}k`
}

export const generateServiceFromKey = (key, minPrice, maxPrice, ink) => {
  const placement = key / 100
  const size = (key - placement) / 10
  const isDifficult = (key - placement - size) > 5
  const hasColor = (key - placement - size) % 5 === 1
  return {
    placement: placement,
    size: size,
    isDifficult: isDifficult,
    hasColor: hasColor,
    minPrice: minPrice,
    maxPrice: maxPrice,
    ink: ink
  }
}

export const serviceListToMap = (serviceList) => {
  if (serviceList && serviceList.length > 0) {
    const map = new Map();
    serviceList.map((service) => {
      map.set(calculateServiceKey(service), service)
    })
    return map;
  }
  return null;
}
