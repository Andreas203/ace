const addToAvailableSmallestIndex = (list: number []) => {
    
    for (let i: number = 0; i < list.length; i++) {
        if(list[i] == 2){
            break;
        }
        list[i] += 1
        return i
    }
    return -1
}

const mode = (arr: any) => {
    const mode: any = {};
    let max: any = 0, count: any = 0;
  
    for(let i = 0; i < arr.length; i++) {
      const item: any = arr[i];
      
      if(mode[item]) {
        mode[item]++;
      } else {
        mode[item] = 1;
      }
      
      if(count < mode[item]) {
        max = item;
        count = mode[item];
      }
    }
     
    return max;
  };


export {mode}