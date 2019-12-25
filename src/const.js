export const componentsProperties = {
  text: {
    text: "",
    x: 0,
    y: 0,
    fontSize: 0,
    fontColor: 'black',
    bold: false,
    wrap: false,
    maxWidth: 0,
    lineSpace: 0
  },
  line: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    color: 'black',
    lineWidth: 1
  },
  rect: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    r: 0,
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
    color: 'black',
    lineWidth: 0,
    bgColor:"",
  },
  image: {
    url: '',
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    r: 0,
    color: 'black',
    lineWidth: 0
  }
}

export const allTypes = getAllTypes()

export function getAllTypes() {
  return Object.keys(componentsProperties)
}

export function getAllPropertiesForType(type) {
  let properties = []
  let obj = componentsProperties[type];
    Object.keys(obj).forEach(key => {            
      if (!properties.includes(key)) {        
        properties.push(key)
      }
    })
  return properties;
}

export function getAllProperties() {
  let properties = []
  Object.keys(componentsProperties).forEach(key => {
    let obj = componentsProperties[key];
    Object.keys(obj).forEach(key => {            
      if (!properties.includes(key)) {        
        properties.push(key)
      }
    })
  })
  return properties;
}

export function convertValueForKey(key, value) {  
  let numKeyList = ['x','y','h','r','fontSize','maxWidth', 'lineSpace', 'lineWidth']
  let boolKeyList = ["bold", "wrap","topLeft", "topRight", "bottomLeft", "bottomRight"]
  if (numKeyList.includes(key)) {
    return Number.parseInt(value)
  } else if (boolKeyList.includes(key)) {
    return value.toLocaleLowerCase() == 'true'
  } {
    return value
  }
}