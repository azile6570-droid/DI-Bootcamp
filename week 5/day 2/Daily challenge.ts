function validateUnionType(value: any, allowedTypes: string[]): boolean {
  const valueType = typeof value;
  
  for (const type of allowedTypes) {
    if (valueType === type) {
      return true;
    }
  }
  
  return false;
}

const allowedTypes: string[] = ["string", "number", "boolean"];

console.log(validateUnionType("Hello World", allowedTypes)); 
console.log(validateUnionType(42, allowedTypes));            
console.log(validateUnionType(true, allowedTypes));         

console.log(validateUnionType([1, 2, 3], allowedTypes));    
console.log(validateUnionType({ key: "val" }, allowedTypes));
console.log(validateUnionType(() => {}, allowedTypes));       