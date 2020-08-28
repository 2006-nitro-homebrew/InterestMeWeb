function wordhash(arr,weight,map){
    for(let i = 0; i < arr.length; i++){
        let w = arr[i].toLowerCase()
        let val = map.get(w)
        if (!val){
            map.set(w,weight)
        }
        else{
            map.set(w,val+weight)
        }
    }
}

module.exports = (wordhash)